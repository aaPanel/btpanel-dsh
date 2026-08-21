import { createHash } from 'node:crypto'
import http from 'node:http'
import https from 'node:https'

const SYSTEM_STATUS_ENDPOINT = '/system?action=GetNetWork'
const TEMPORARY_LOGIN_ENDPOINTS = ['/config?action=get_tmp_token', '/api?action=get_tmp_token']
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024

function md5(value) {
  return createHash('md5').update(String(value)).digest('hex')
}

function clampTimeout(value) {
  const timeout = Number(value)
  if (!Number.isFinite(timeout)) return 10000
  return Math.min(60000, Math.max(1000, Math.round(timeout)))
}

export function getPanelSettings(config = {}) {
  const source = config.btPanel ?? config
  return {
    panelUrl: String(source.panelUrl ?? '').trim().replace(/\/+$/, ''),
    apiKey: String(source.apiKey ?? '').trim(),
    verifySsl: source.verifySsl !== false,
    timeoutMs: clampTimeout(source.timeoutMs),
  }
}

export function isPanelConfigured(config = {}) {
  const settings = getPanelSettings(config)
  return Boolean(settings.panelUrl && settings.apiKey)
}

export function signPanelRequest(apiKey, params = {}, timestamp = Math.floor(Date.now() / 1000)) {
  const parsedTime = Number(timestamp)
  const requestTime = Math.floor(Number.isFinite(parsedTime) ? parsedTime : Date.now() / 1000)
  return {
    ...params,
    request_time: requestTime,
    request_token: md5(`${requestTime}${md5(apiKey)}`),
  }
}

function validateSettings(config) {
  const settings = getPanelSettings(config)
  if (!settings.panelUrl) throw new Error('尚未配置宝塔面板地址。')
  if (!settings.apiKey) throw new Error('尚未配置宝塔面板 API 密钥。')

  let panelUrl
  try {
    panelUrl = new URL(settings.panelUrl)
  } catch {
    throw new Error('宝塔面板地址格式无效。')
  }
  if (!['http:', 'https:'].includes(panelUrl.protocol)) throw new Error('宝塔面板地址仅支持 HTTP 或 HTTPS。')
  if (panelUrl.username || panelUrl.password) throw new Error('宝塔面板地址不能包含用户名或密码。')
  return { ...settings, panelUrl }
}

export function requestPanel(config, endpoint, params = {}) {
  const settings = validateSettings(config)
  const url = new URL(endpoint, `${settings.panelUrl.href.replace(/\/+$/, '')}/`)
  const body = new URLSearchParams(signPanelRequest(settings.apiKey, params)).toString()
  const transport = url.protocol === 'https:' ? https : http

  return new Promise((resolve, reject) => {
    const request = transport.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
        Accept: 'application/json',
      },
      timeout: settings.timeoutMs,
      ...(url.protocol === 'https:' ? { rejectUnauthorized: settings.verifySsl } : {}),
    }, (response) => {
      const chunks = []
      let total = 0
      response.on('data', (chunk) => {
        total += chunk.length
        if (total > MAX_RESPONSE_BYTES) {
          request.destroy(new Error('宝塔 API 响应过大，已中止请求。'))
          return
        }
        chunks.push(chunk)
      })
      response.on('end', () => {
        const statusCode = response.statusCode ?? 0
        const responseText = Buffer.concat(chunks).toString('utf8')
        if (statusCode < 200 || statusCode >= 300) {
          reject(new Error(`宝塔 API 返回 HTTP ${statusCode}。`))
          return
        }
        try {
          const data = JSON.parse(responseText)
          if (data && typeof data === 'object' && data.status === false && typeof data.msg === 'string' && !('setup' in data)) {
            reject(new Error(`宝塔 API 请求失败：${data.msg}`))
            return
          }
          resolve(data)
        } catch {
          reject(new Error('宝塔 API 返回了无法解析的 JSON。'))
        }
      })
    })

    request.on('timeout', () => request.destroy(new Error(`宝塔 API 请求超时（${settings.timeoutMs}ms）。`)))
    request.on('error', (error) => reject(new Error(`无法连接宝塔面板：${error.message}`)))
    request.end(body)
  })
}

export async function validatePanelConnection(config) {
  const data = await requestPanel(config, SYSTEM_STATUS_ENDPOINT)
  if (!data || typeof data !== 'object' || Array.isArray(data) || !Array.isArray(data.cpu) || !data.mem || typeof data.mem !== 'object') {
    throw new Error('宝塔 API 验证失败：系统监控接口响应不完整。')
  }
}

export async function getPanelTemporaryLoginToken(config) {
  let lastError
  for (const endpoint of TEMPORARY_LOGIN_ENDPOINTS) {
    try {
      const data = await requestPanel(config, endpoint)
      const token = typeof data?.msg === 'string' ? data.msg.trim() : ''
      if (data?.status !== true || !/^[A-Za-z0-9_]{64}$/.test(token)) throw new Error('宝塔 API 未返回有效的临时登录密钥。')
      return token
    } catch (error) {
      lastError = error
    }
  }
  throw new Error(`无法通过宝塔 API 创建临时登录会话：${lastError instanceof Error ? lastError.message : String(lastError)}`)
}
