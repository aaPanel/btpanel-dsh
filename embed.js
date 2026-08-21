import { randomBytes } from 'node:crypto'
import http from 'node:http'
import https from 'node:https'
import { brotliDecompressSync, gunzipSync, inflateSync } from 'node:zlib'

import { getPanelSettings, getPanelTemporaryLoginToken, isPanelConfigured } from './bt-client.js'

export const EMBED_PROXY_PREFIX = '/__dsh_bt_panel_proxy'
const WEBSOCKET_PATH = `${EMBED_PROXY_PREFIX}/__ws__`
export const DIRECT_LOGIN_PATH = `${EMBED_PROXY_PREFIX}/__direct_login__`
const MAX_TRANSFORM_BYTES = 32 * 1024 * 1024
const DIRECT_HTML_PATHS = new Set(['/software'])
const FONT_COMPATIBILITY_CSS = `
:root{--dsh-bt-panel-font:"HarmonyOS Sans SC","PingFang SC","Microsoft YaHei","Segoe UI",Arial,sans-serif}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{font-family:var(--dsh-bt-panel-font)!important;font-size:14px!important;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
button,input,textarea,select,option,table,.el-table,.el-menu,.el-form,.el-tabs{font-family:var(--dsh-bt-panel-font)!important}
table,.el-table,.el-table__cell{font-size:14px!important}
`
const BLOCKED_RESPONSE_HEADERS = new Set([
  'alt-svc',
  'content-security-policy',
  'content-security-policy-report-only',
  'public-key-pins',
  'strict-transport-security',
  'x-frame-options',
])
const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

export function normalizeEmbedOrigin(value) {
  let url
  try {
    url = new URL(String(value ?? '').trim())
  } catch {
    throw new Error('Harness 页面来源格式无效。')
  }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Harness 页面来源必须使用 HTTP 或 HTTPS。')
  if (url.username || url.password) throw new Error('Harness 页面来源不能包含用户名或密码。')
  return url.origin
}

function cookieValue(header, name) {
  const prefix = `${name}=`
  for (const part of String(header ?? '').split(';')) {
    const value = part.trim()
    if (value.startsWith(prefix)) return value.slice(prefix.length)
  }
  return undefined
}

function withoutProxyCookie(header, cookieName) {
  return String(header ?? '')
    .split(';')
    .map((value) => value.trim())
    .filter((value) => value && !value.startsWith(`${cookieName}=`))
    .join('; ')
}

export function rewriteSetCookie(value, proxyOrigin = 'https://proxy.invalid') {
  let cookie = String(value)
    .replace(/;\s*Domain=[^;]*/ig, '')
    .replace(/;\s*Path=[^;]*/ig, `; Path=${EMBED_PROXY_PREFIX}/`)
  if (String(proxyOrigin).startsWith('http:')) {
    cookie = cookie
      .replace(/;\s*Secure\b/ig, '')
      .replace(/;\s*SameSite=None\b/ig, '; SameSite=Lax')
  }
  return cookie
}

function proxyOriginForRequest(request) {
  const forwardedProto = String(request.headers['x-forwarded-proto'] ?? '').split(',', 1)[0].trim().toLowerCase()
  const forwardedHost = String(request.headers['x-forwarded-host'] ?? '').split(',', 1)[0].trim()
  const protocol = forwardedProto === 'https' || (!forwardedProto && request.socket.encrypted) ? 'https' : 'http'
  const authority = forwardedHost || request.headers.host || '127.0.0.1'
  return `${protocol}://${authority}`
}

function entryTokenForRequest(requestUrl, entryPath) {
  const incoming = new URL(requestUrl ?? '/', 'http://proxy.invalid')
  if (incoming.pathname !== entryPath) return ''
  return incoming.searchParams.get('__dsh_entry') ?? ''
}

function isHtmlNavigation(request) {
  if (!['GET', 'HEAD'].includes(String(request.method ?? 'GET').toUpperCase())) return false
  const destination = String(request.headers['sec-fetch-dest'] ?? '').toLowerCase()
  if (destination === 'document' || destination === 'iframe') return true
  return String(request.headers.accept ?? '').toLowerCase().includes('text/html')
}

function targetUrlForRequest(settings, requestUrl, entry, htmlNavigation = false) {
  const panel = new URL(settings.panelUrl)
  const incoming = new URL(requestUrl ?? '/', 'http://proxy.invalid')
  if (entry) {
    return new URL(`/login?tmp_token=${encodeURIComponent(entry.panelLoginToken)}`, panel.origin)
  }
  let targetPath = incoming.pathname.slice(EMBED_PROXY_PREFIX.length)
  if (!targetPath.startsWith('/')) targetPath = `/${targetPath}`
  if (htmlNavigation && targetPath !== '/' && !DIRECT_HTML_PATHS.has(targetPath)) return new URL('/', panel.origin)
  return new URL(`${targetPath}${incoming.search}`, panel.origin)
}

function rewriteLocation(value, targetUrl) {
  try {
    const location = new URL(String(value), targetUrl)
    const loopback = ['127.0.0.1', 'localhost', '::1'].includes(location.hostname)
    if (location.origin !== targetUrl.origin && !loopback) return String(value)
    return `${EMBED_PROXY_PREFIX}${location.pathname}${location.search}${location.hash}`
  } catch {
    return String(value)
  }
}

function rewriteReferer(value, targetUrl, entryPath) {
  if (typeof value !== 'string' || !value) return value
  try {
    const referer = new URL(value)
    if (referer.pathname === entryPath) return `${targetUrl.origin}/`
    if (referer.pathname.startsWith(EMBED_PROXY_PREFIX)) {
      const pathname = referer.pathname.slice(EMBED_PROXY_PREFIX.length) || '/'
      return `${targetUrl.origin}${pathname}${referer.search}${referer.hash}`
    }
    return value
  } catch {
    return value
  }
}

function forwardedHeaders(request, targetUrl, proxyOrigin, entryPath, cookieName) {
  const headers = {}
  const connectionTokens = new Set(String(request.headers.connection ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean))
  for (const [name, value] of Object.entries(request.headers)) {
    const lower = name.toLowerCase()
    if (HOP_BY_HOP_HEADERS.has(lower) || connectionTokens.has(lower) || value === undefined) continue
    headers[name] = value
  }
  headers.host = targetUrl.host
  headers['accept-encoding'] = 'identity'
  if (typeof headers.origin === 'string') headers.origin = targetUrl.origin
  if (typeof headers.referer === 'string') {
    headers.referer = rewriteReferer(headers.referer, targetUrl, entryPath)
  }
  if (typeof headers.cookie === 'string') headers.cookie = withoutProxyCookie(headers.cookie, cookieName)
  headers['x-forwarded-host'] = new URL(proxyOrigin).host
  headers['x-forwarded-proto'] = proxyOrigin.startsWith('https:') ? 'https' : 'http'
  const remoteAddress = request.socket.remoteAddress
  if (remoteAddress) headers['x-forwarded-for'] = remoteAddress
  return headers
}

function appendSessionCookie(headers, cookie) {
  const current = headers['set-cookie']
  if (current === undefined) headers['set-cookie'] = [cookie]
  else if (Array.isArray(current)) headers['set-cookie'] = [...current, cookie]
  else headers['set-cookie'] = [String(current), cookie]
}

function responseHeaders(upstream, targetUrl, proxyOrigin, sessionCookie, transforming) {
  const headers = {}
  for (const [name, value] of Object.entries(upstream.headers)) {
    const lower = name.toLowerCase()
    if (BLOCKED_RESPONSE_HEADERS.has(lower) || HOP_BY_HOP_HEADERS.has(lower) || value === undefined) continue
    if (transforming && (lower === 'content-length' || lower === 'content-encoding' || lower === 'etag')) continue
    if (lower === 'set-cookie') {
      const values = Array.isArray(value) ? value : [value]
      headers[name] = values.map((cookie) => rewriteSetCookie(cookie, proxyOrigin))
      continue
    }
    if (lower === 'location') {
      headers[name] = rewriteLocation(value, targetUrl)
      continue
    }
    headers[name] = value
  }
  if (sessionCookie) appendSessionCookie(headers, sessionCookie)
  return headers
}

function transportFor(url) {
  return url.protocol === 'https:' ? https : http
}

function sendProxyError(response, error) {
  if (response.headersSent) {
    response.destroy(error instanceof Error ? error : undefined)
    return
  }
  const message = error instanceof Error ? error.message : String(error)
  response.writeHead(502, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' })
  response.end(`宝塔面板转发失败：${message}`)
}

function isTransformable(contentType) {
  return /(?:text\/html|text\/css|javascript|ecmascript|application\/json)/i.test(String(contentType ?? ''))
}

function decodeBody(buffer, encoding) {
  const value = String(encoding ?? '').trim().toLowerCase()
  if (!value || value === 'identity') return buffer
  if (value === 'gzip') return gunzipSync(buffer)
  if (value === 'deflate') return inflateSync(buffer)
  if (value === 'br') return brotliDecompressSync(buffer)
  throw new Error(`不支持的宝塔响应压缩格式：${value}`)
}

function readBody(stream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    stream.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_TRANSFORM_BYTES) {
        stream.destroy(new Error('宝塔页面资源超过转发转换上限。'))
        return
      }
      chunks.push(chunk)
    })
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

function browserBootstrap(targetOrigin) {
  const prefix = JSON.stringify(EMBED_PROXY_PREFIX)
  const target = JSON.stringify(targetOrigin)
  return `(function(){
var P=${prefix},T=${target},W=P+'/__ws__?target=';
try{var Q=new URLSearchParams(location.search);if(Q.has('__dsh_entry')){Q.delete('__dsh_entry');var S=Q.toString();history.replaceState(history.state,'',location.pathname+(S?'?'+S:'')+location.hash);}}catch(_){}
function special(v){return /^(?:data:|blob:|javascript:|mailto:|tel:|#)/i.test(String(v||''));}
function map(v){if(v==null||special(v))return v;try{var u=new URL(String(v),location.href);if(u.origin!==location.origin&&u.origin!==T)return v;if(u.pathname.indexOf(P)===0)return u.href;return location.origin+P+u.pathname+u.search+u.hash;}catch(_){return v;}}
function css(v){return String(v==null?'':v).replace(/url\\(\\s*(["']?)([^"')]+)\\1\\s*\\)/gi,function(_,q,u){var n=map(u);return 'url('+(q||'')+n+(q||'')+')';}).replace(/(@import\\s+)(["'])([^"']+)\\2/gi,function(_,h,q,u){return h+q+map(u)+q;});}
var UA={src:1,href:1,action:1,poster:1,'data-url':1},SA=Element.prototype.setAttribute;
Element.prototype.setAttribute=function(n,v){var k=String(n).toLowerCase();if(UA[k])arguments[1]=map(v);else if(k==='style')arguments[1]=css(v);return SA.apply(this,arguments);};
function hook(C,n){if(!C||!C.prototype)return;var d=Object.getOwnPropertyDescriptor(C.prototype,n);if(!d||!d.set||d.set.__dshBtProxy)return;var s=function(v){return d.set.call(this,map(v));};s.__dshBtProxy=true;try{Object.defineProperty(C.prototype,n,{get:d.get,set:s,enumerable:d.enumerable,configurable:d.configurable});}catch(_){}}
[[window.HTMLScriptElement,'src'],[window.HTMLLinkElement,'href'],[window.HTMLImageElement,'src'],[window.HTMLIFrameElement,'src'],[window.HTMLSourceElement,'src'],[window.HTMLMediaElement,'src'],[window.HTMLFormElement,'action'],[window.HTMLAnchorElement,'href']].forEach(function(x){hook(x[0],x[1]);});
document.addEventListener('error',function(e){var img=e.target;if(!img||String(img.tagName).toUpperCase()!=='IMG')return;var src=img.getAttribute&&img.getAttribute('src');if(!src||img.dataset&&img.dataset.dshBtIconFallback==='1')return;try{var path=new URL(src,location.href).pathname;if(path.indexOf('/soft_ico/')===-1)return;if(img.dataset)img.dataset.dshBtIconFallback='1';img.src=map('/static/images/soft_ico/icon_plug.svg');}catch(_){}},true);
var F=window.fetch;if(F)window.fetch=function(v,o){if(v instanceof Request)return F.call(this,new Request(map(v.url),v),o);return F.call(this,map(v),o);};
var XO=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){arguments[1]=map(u);return XO.apply(this,arguments);};
var WS=window.WebSocket;if(WS){function DshWS(u,p){var x=new URL(String(u),location.href),path=x.pathname.indexOf(P)===0?x.pathname.slice(P.length):x.pathname,scheme=location.protocol==='https:'?'wss:':'ws:',next=scheme+'//'+location.host+W+encodeURIComponent(path+x.search);return p===undefined?new WS(next):new WS(next,p);}DshWS.prototype=WS.prototype;Object.setPrototypeOf(DshWS,WS);window.WebSocket=DshWS;}
var ES=window.EventSource;if(ES){window.EventSource=function(u,o){return new ES(map(u),o);};window.EventSource.prototype=ES.prototype;}
function attr(el,n){var v=el.getAttribute&&el.getAttribute(n);if(v&&map(v)!==v)el.setAttribute(n,map(v));}
function scan(root){if(!root)return;if(root.nodeType===3){var pe=root.parentElement;if(pe&&String(pe.tagName).toUpperCase()==='STYLE'){var nt=css(root.data);if(nt!==root.data)root.data=nt;}return;}if(root.nodeType!==1)return;['src','href','action','poster','data-url'].forEach(function(n){attr(root,n);});if(String(root.tagName).toUpperCase()==='STYLE'){var st=root.textContent||'',mt=css(st);if(mt!==st)root.textContent=mt;}if(root.querySelectorAll){root.querySelectorAll('[src],[href],[action],[poster],[data-url]').forEach(function(el){['src','href','action','poster','data-url'].forEach(function(n){attr(el,n);});});root.querySelectorAll('style').forEach(scan);}}
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='characterData')scan(m.target);else{m.addedNodes.forEach(scan);if(m.type==='attributes')scan(m.target);}});}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['src','href','action','poster','data-url','style']});
var SSP=window.CSSStyleSheet&&window.CSSStyleSheet.prototype;if(SSP){var SIR=SSP.insertRule;if(SIR)SSP.insertRule=function(r,i){return SIR.call(this,css(r),i);};var SR=SSP.replace;if(SR)SSP.replace=function(v){return SR.call(this,css(v));};var SRS=SSP.replaceSync;if(SRS)SSP.replaceSync=function(v){return SRS.call(this,css(v));};}
var SDP=window.CSSStyleDeclaration&&window.CSSStyleDeclaration.prototype;if(SDP){var SPP=SDP.setProperty;if(SPP)SDP.setProperty=function(n,v,p){return SPP.call(this,n,css(v),p);};var SCD=Object.getOwnPropertyDescriptor(SDP,'cssText');if(SCD&&SCD.set){try{Object.defineProperty(SDP,'cssText',{get:SCD.get,set:function(v){return SCD.set.call(this,css(v));},enumerable:SCD.enumerable,configurable:SCD.configurable});}catch(_){}}}
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(a&&!special(a.getAttribute('href')))a.href=map(a.getAttribute('href'));},true);
document.addEventListener('submit',function(e){if(e.target&&e.target.action)e.target.action=map(e.target.action);},true);
var PS=history.pushState,RS=history.replaceState;history.pushState=function(s,t,u){return PS.call(this,s,t,u==null?u:map(u));};history.replaceState=function(s,t,u){return RS.call(this,s,t,u==null?u:map(u));};
scan(document.documentElement);
})();`
}

export function rewriteProxyText(source, contentType, targetOrigin, proxyOrigin, targetPath = '') {
  let text = String(source).split(targetOrigin).join(EMBED_PROXY_PREFIX)
  const proxySegment = EMBED_PROXY_PREFIX.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (/text\/html/i.test(contentType)) {
    text = text
      .replace(new RegExp(`(\\b(?:src|href|action|poster|data-url)\\s*=\\s*["'])/(?!/|${proxySegment}(?:/|["']))`, 'gi'), `$1${EMBED_PROXY_PREFIX}/`)
      .replace(new RegExp(`(url\\(\\s*["']?)/(?!/|${proxySegment}(?:/|["')]))`, 'gi'), `$1${EMBED_PROXY_PREFIX}/`)
      .replace(new RegExp(`(@import\\s+["'])/(?!/|${proxySegment}(?:/|["']))`, 'gi'), `$1${EMBED_PROXY_PREFIX}/`)
    const injection = `<base href="${EMBED_PROXY_PREFIX}/"><style data-dsh-bt-font-compat>${FONT_COMPATIBILITY_CSS}</style><script>${browserBootstrap(targetOrigin)}</script>`
    if (/<head(?:\s[^>]*)?>/i.test(text)) text = text.replace(/<head(\s[^>]*)?>/i, (match) => `${match}${injection}`)
    else text = `${injection}${text}`
  } else if (/text\/css/i.test(contentType)) {
    text = text
      .replace(new RegExp(`(url\\(\\s*["']?)/(?!/|${proxySegment}(?:/|["')]))`, 'gi'), `$1${EMBED_PROXY_PREFIX}/`)
      .replace(new RegExp(`(@import\\s+["'])/(?!/|${proxySegment}(?:/|["']))`, 'gi'), `$1${EMBED_PROXY_PREFIX}/`)
  } else if (/javascript|ecmascript/i.test(contentType)) {
    text = text
      .replace(new RegExp(`(\\bfrom\\s*["'])/(?!/|${proxySegment}(?:/|["']))`, 'g'), `$1${EMBED_PROXY_PREFIX}/`)
      .replace(new RegExp(`(\\bimport\\s*\\(\\s*["'])/(?!/|${proxySegment}(?:/|["']))`, 'g'), `$1${EMBED_PROXY_PREFIX}/`)
    if (String(targetPath).endsWith('/static/js/router2.js')) {
      const routerBase = JSON.stringify(`${EMBED_PROXY_PREFIX}/`)
      text = text.replace(
        /(\bhistory\s*:\s*)([A-Za-z_$][\w$]*)\(\)(\s*,\s*scrollBehavior\s*:)/,
        `$1$2(${routerBase})$3`,
      )
    }
  }
  return text
}

export class PanelEmbedProxy {
  constructor({ webServer, getConfig, logger } = {}) {
    if (!webServer?.register || !webServer?.registerUpgrade) throw new TypeError('PanelEmbedProxy requires webServer')
    if (typeof getConfig !== 'function') throw new TypeError('PanelEmbedProxy requires getConfig')
    this.webServer = webServer
    this.getConfig = getConfig
    this.logger = logger
    this.sessionCookieName = 'dsh_bt_proxy'
    this.sessionToken = randomBytes(24).toString('base64url')
    this.entryPath = `${EMBED_PROXY_PREFIX}/`
    this.pendingEntries = new Map()
    this.upstreams = new Set()
    this.disposeHttp = webServer.register({
      kind: 'prefix',
      path: EMBED_PROXY_PREFIX,
      handler: (request, response) => this.handleHttp(request, response),
    })
    this.disposeUpgrade = webServer.registerUpgrade({
      path: WEBSOCKET_PATH,
      handler: (request, socket, head) => this.handleUpgrade(request, socket, head),
    })
  }

  isAuthorized(request) {
    return cookieValue(request.headers.cookie, this.sessionCookieName) === this.sessionToken
  }

  takeEntry(requestUrl) {
    const now = Date.now()
    for (const [token, entry] of this.pendingEntries) {
      if (entry.expiresAt <= now) this.pendingEntries.delete(token)
    }
    const token = entryTokenForRequest(requestUrl, this.entryPath)
    if (!token) return undefined
    const entry = this.pendingEntries.get(token)
    if (!entry) return undefined
    this.pendingEntries.delete(token)
    return entry
  }

  sessionCookie() {
    return `${this.sessionCookieName}=${this.sessionToken}; Path=${EMBED_PROXY_PREFIX}/; HttpOnly; SameSite=Strict`
  }

  async handleHttp(request, response) {
    const incoming = new URL(request.url ?? '/', 'http://proxy.invalid')
    if (incoming.pathname === DIRECT_LOGIN_PATH) {
      if (!['GET', 'HEAD'].includes(String(request.method ?? 'GET').toUpperCase())) {
        response.writeHead(405, { allow: 'GET, HEAD', 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' })
        response.end('method not allowed')
        return
      }
      if (!this.isAuthorized(request)) {
        response.writeHead(403, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' })
        response.end('forbidden')
        return
      }
      const config = this.getConfig()
      if (!isPanelConfigured(config)) {
        response.writeHead(503, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' })
        response.end('宝塔面板尚未配置。')
        return
      }
      try {
        const settings = getPanelSettings(config)
        const panelLoginToken = await getPanelTemporaryLoginToken(config)
        const panel = new URL(settings.panelUrl)
        const loginUrl = new URL(`/login?tmp_token=${encodeURIComponent(panelLoginToken)}`, panel.origin)
        response.writeHead(302, {
          location: loginUrl.href,
          'cache-control': 'no-store',
          'referrer-policy': 'no-referrer',
          'x-content-type-options': 'nosniff',
        })
        response.end()
      } catch (error) {
        sendProxyError(response, error)
      }
      return
    }
    const entry = this.takeEntry(request.url)
    if (!entry && !this.isAuthorized(request)) {
      response.writeHead(403, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' })
      response.end('forbidden')
      return
    }
    const config = this.getConfig()
    if (!isPanelConfigured(config)) {
      response.writeHead(503, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' })
      response.end('宝塔面板尚未配置。')
      return
    }
    const settings = getPanelSettings(config)
    const targetUrl = targetUrlForRequest(settings, request.url, entry, isHtmlNavigation(request))
    const proxyOrigin = proxyOriginForRequest(request)
    const headers = forwardedHeaders(request, targetUrl, proxyOrigin, this.entryPath, this.sessionCookieName)
    const upstream = transportFor(targetUrl).request(targetUrl, {
      method: request.method,
      headers,
      timeout: settings.timeoutMs,
      ...(targetUrl.protocol === 'https:' ? { rejectUnauthorized: settings.verifySsl } : {}),
    }, async (upstreamResponse) => {
      try {
        const contentType = String(upstreamResponse.headers['content-type'] ?? '')
        const transforming = isTransformable(contentType)
        const outgoing = responseHeaders(upstreamResponse, targetUrl, proxyOrigin, entry ? this.sessionCookie() : undefined, transforming)
        if (!transforming) {
          response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.statusMessage, outgoing)
          upstreamResponse.pipe(response)
          return
        }
        const compressed = await readBody(upstreamResponse)
        const decoded = decodeBody(compressed, upstreamResponse.headers['content-encoding'])
        const transformed = rewriteProxyText(
          decoded.toString('utf8'),
          contentType,
          targetUrl.origin,
          proxyOrigin,
          targetUrl.pathname,
        )
        response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.statusMessage, outgoing)
        response.end(Buffer.from(transformed, 'utf8'))
      } catch (error) {
        sendProxyError(response, error)
      }
    })
    this.upstreams.add(upstream)
    upstream.once('close', () => this.upstreams.delete(upstream))
    upstream.on('timeout', () => upstream.destroy(new Error(`连接超时（${settings.timeoutMs}ms）`)))
    upstream.on('error', (error) => sendProxyError(response, error))
    request.on('aborted', () => upstream.destroy())
    request.pipe(upstream)
  }

  async handleUpgrade(request, socket, head) {
    if (!this.isAuthorized(request)) {
      socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n')
      return
    }
    const config = this.getConfig()
    if (!isPanelConfigured(config)) {
      socket.end('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\n\r\n')
      return
    }
    const settings = getPanelSettings(config)
    const incoming = new URL(request.url ?? WEBSOCKET_PATH, 'http://proxy.invalid')
    const requestedTarget = incoming.searchParams.get('target')
    if (!requestedTarget || !requestedTarget.startsWith('/') || requestedTarget.startsWith('//')) {
      socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n')
      return
    }
    const panel = new URL(settings.panelUrl)
    const targetUrl = new URL(requestedTarget, panel.origin)
    const proxyOrigin = proxyOriginForRequest(request)
    const headers = forwardedHeaders(request, targetUrl, proxyOrigin, this.entryPath, this.sessionCookieName)
    headers.connection = 'Upgrade'
    headers.upgrade = request.headers.upgrade ?? 'websocket'
    const upstreamRequest = transportFor(targetUrl).request(targetUrl, {
      method: request.method ?? 'GET',
      headers,
      timeout: settings.timeoutMs,
      ...(targetUrl.protocol === 'https:' ? { rejectUnauthorized: settings.verifySsl } : {}),
    })
    this.upstreams.add(upstreamRequest)
    upstreamRequest.once('close', () => this.upstreams.delete(upstreamRequest))
    upstreamRequest.on('upgrade', (upstreamResponse, upstreamSocket, upstreamHead) => {
      const lines = [`HTTP/1.1 ${upstreamResponse.statusCode ?? 101} ${upstreamResponse.statusMessage ?? 'Switching Protocols'}`]
      for (let index = 0; index < upstreamResponse.rawHeaders.length; index += 2) {
        const name = upstreamResponse.rawHeaders[index]
        const value = upstreamResponse.rawHeaders[index + 1]
        if (name && value && !BLOCKED_RESPONSE_HEADERS.has(name.toLowerCase())) lines.push(`${name}: ${value}`)
      }
      socket.write(`${lines.join('\r\n')}\r\n\r\n`)
      if (upstreamHead.length) socket.write(upstreamHead)
      if (head.length) upstreamSocket.write(head)
      upstreamSocket.on('error', () => socket.destroy())
      socket.on('error', () => upstreamSocket.destroy())
      upstreamSocket.pipe(socket).pipe(upstreamSocket)
    })
    upstreamRequest.on('response', (upstreamResponse) => {
      upstreamResponse.resume()
      socket.end(`HTTP/1.1 ${upstreamResponse.statusCode ?? 502} ${upstreamResponse.statusMessage ?? 'Bad Gateway'}\r\nConnection: close\r\n\r\n`)
    })
    upstreamRequest.on('timeout', () => upstreamRequest.destroy(new Error(`连接超时（${settings.timeoutMs}ms）`)))
    upstreamRequest.on('error', () => socket.destroy())
    upstreamRequest.end()
  }

  async embedUrl(originValue, config = this.getConfig()) {
    const panelLoginToken = await getPanelTemporaryLoginToken(config)
    const entryToken = randomBytes(18).toString('base64url')
    this.pendingEntries.set(entryToken, {
      panelLoginToken,
      expiresAt: Date.now() + 100_000,
    })
    return `${normalizeEmbedOrigin(originValue)}${this.entryPath}?__dsh_entry=${encodeURIComponent(entryToken)}`
  }

  close() {
    this.disposeUpgrade?.()
    this.disposeUpgrade = undefined
    this.disposeHttp?.()
    this.disposeHttp = undefined
    for (const upstream of this.upstreams) upstream.destroy?.()
    this.upstreams.clear()
    this.pendingEntries.clear()
  }
}

export function createPanelEmbedProxy(options) {
  return new PanelEmbedProxy(options)
}

export async function preparePanelEmbed(config, originValue, proxy) {
  if (!isPanelConfigured(config)) return { configured: false }
  if (!(proxy instanceof PanelEmbedProxy)) throw new Error('宝塔面板转发服务尚未启动。')
  const origin = normalizeEmbedOrigin(originValue)
  const settings = getPanelSettings(config)
  return {
    configured: true,
    panelUrl: await proxy.embedUrl(origin, config),
    directPanelUrl: settings.panelUrl,
    origin,
  }
}
