window.__ModuleLoader__.load({
  id: 'dsh-bt-panel-theme',
  factory: (require) => {
    const module = { exports: {} }
    const exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const PLUGIN_ID = 'dsh-bt-panel-theme'
    const SETTINGS_NAMESPACE = 'bt-panel-theme'
    const STYLE_ID = `${PLUGIN_ID}/bt-panel.css`
    const BT_PANEL_PROXY_PREFIX = '/__dsh_bt_panel_proxy'
    const BT_PANEL_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFdUlEQVR4AexWXUxURxQ+Z+4Py0Y3ikJgTenuFv+oK2hMbAETjIIxfTBqotWtD42JKUQfNNIq+rBNC6gxPmhIjNH4IEhK0wdjGls1lbQuthGlQEKCqAv+ACpaGxB259470xlkCcourtCmfejknjszZ875zjdnTu4dAv9ymxQBZ8WilZ7qvJWT2cOkCAAwH3Ahk2AwYQIZR5c6OGNLLAJLMmvzp0yUQ/wE/EDSK5Z4nBXZxalfey/09714xIAvAMYXDBj0iasq94LnbF7xvJp8F/j9ceOOMXT5820w3Fxi7DyQneMs91akaQtvUBZqY8ysBOQ5iHhVQWWvQsheDnhV6hhnlYMWbXfPvnjDXZ1bllGV+4Hr9Ci8UWMYbq8QkMZU/6MmrTzrK2eZ93RIe9rOLDPAOP+cA9cBleMqqh+piVPd3aUtBQJDZwB6py9QYNemuhUkqwnicWnLOd9jIr/Gddruqc457anK/ZLotCb/NRKvEOj4tC5EbMZWztlKBnydCHBTIUqRSvS584wZWT2lTTtUOu0nCA8uFMdwkDFWBAyKRPorqPVioRVW64K+wA6XMyFLQzKbcCxSABoEyXUMeaFN41vrRAyBO/K8QkBqH+xqfUYMfUWSwZJ79rWsmR2eflLqbyU835Za5j0X0nqfmMy8IlK+CxD6OXIpuw3GroBOH7nO5py7121uY0wl6bO0k3d99Wvt2qxk6pixonXDtWcSa7SMEHBVZLvSD2TlyUXi0G1/6lpharn3WJv2tMVktM2SZw88HznWI5KdOmpZPcb6uZ3thXM1rmQJ/U4E+BU45FvcqrSQtnV00RZRC8dCtLtw2iAdqi3P2dw8T21uuowjZYQA1ZR+arFTaWXe6+ZgX1CAnAfOt3MAFYGcUJCsGTr7/S2rumnzURMIcyZ8V+yZc/kzkyis43bB0aCvfpVd427CyBqCeEL6inrYzpCdHzD6gu9W51wX9XRKNbUBGG5kuIeu3Td6NVX1Cac5iHgTkJRoQLzi7Od372su0mnSRWaFFmdULctMtmemMB5uZIwfY8yqBE4bXZnfp6SWL8oMDSqLExOcP9z1BYrcTn2+ypX3EbAEBSYCzCEEfbc21/VG4o4QkIr7XzQ2JBlWcndpy/Ie2nxE1+HxPbfhTPJnOELa0zvMMC6ZYG5UzIQkAFCFDD2CtKpSWxJndJNFrEsDxsOg/Djd+63Pye2JvcH2giPBzYHlshbubgo0DDkNv8hwP9K1+lupnKRp3m9ehFmnBVaFwz7dDsCngIhEHw5sB240CpsRAmJnqolWY+I7jmIQE7E2JRyi9gEwDlqD/Z3ujB9rhA5aN3w7hC3HERlDILLAOMsW8Wz08WBhyAw1Cb1DCDDTkrvX5fg10UHFJJFqqXZYBJv0lET5o7IxhMVSGU1iEpBAKHbDqTVTFGNKNOdxdchTSYIy86WNAHo5GPOOSWCM5T+k+J/AfzoDfxs5UYIxsaIu+P3xXyjirU0/j44ZlUC8oPHaiQzENB2HALKYXm+/EBMrKgFxBIwgOfP2ccZ6cPE5RcQzfvRHJRGVgITR6fRDwrFO+MvphAUJ1rGwdigWQEwCHf66kGKbsp4gTpAEB7kBCGtrO167ho0mE5OANHqw69qzBDpjtYLksJibQuJ6OICJQA7zsLZaBH8O47RxCUg/mYmu0uYSjWsfih1dFr/kqGcpbeWaqPiLmqIsDfoCJSJ4aEg/zuuNBCK+9/c3NoiLSgEBdRkCVoldjt7Zc3EnrFIUdVlQXMtuf/zLTYizxU0ggte1//f67n0tW7TEqe8pirJRJWQjUN0d/CSw5c6mn+sjdvH2b00gAizr4+GeptrbmwO1ItWjsxExGerf9PoLAAD//6CODJMAAAAGSURBVAMAPhs2X8QtdX0AAAAASUVORK5CYII='

    const tokens = {
      '--dsw-alias-bg-base': { light: '#fafbfc', dark: '#0f0f0f' },
      '--dsw-alias-bg-layer-1': { light: '#ffffff', dark: '#1b1b1b' },
      '--dsw-alias-bg-layer-2': { light: '#f7f8fa', dark: '#222222' },
      '--dsw-alias-bg-layer-3': { light: '#f1f3f5', dark: '#292929' },
      '--dsw-alias-bg-overlay': { light: '#ffffff', dark: '#191919' },
      '--dsw-alias-bg-module-platform': { light: '#f6f8f9', dark: '#121212' },
      '--dsw-alias-bg-multi-select': { light: '#eaf8ee', dark: '#173a20' },
      '--dsw-alias-bg-skeleton': { light: '#eef1f3', dark: '#282828' },
      '--dsw-alias-border-l1': { light: '#edf0f2', dark: '#292929' },
      '--dsw-alias-border-l2': { light: '#e1e5e9', dark: '#353535' },
      '--dsw-alias-border-l3': { light: '#cfd5db', dark: '#464646' },
      '--dsw-alias-border-l4': { light: '#aeb7c0', dark: '#5a5a5a' },
      '--dsw-alias-brand-primary': { light: '#20a53a', dark: '#24b847' },
      '--dsw-alias-brand-primary-invert': { light: '#ffffff', dark: '#ffffff' },
      '--dsw-alias-brand-text': { light: '#14872c', dark: '#35c95a' },
      '--dsw-alias-label-primary': { light: '#1f2329', dark: '#f1f1f1' },
      '--dsw-alias-label-primary-bluish': { light: '#24272e', dark: '#e7e7e7' },
      '--dsw-alias-label-secondary': { light: '#646a73', dark: '#b8b8b8' },
      '--dsw-alias-label-tertiary': { light: '#8a9099', dark: '#919191' },
      '--dsw-alias-label-caption': { light: '#737a87', dark: '#a0a0a0' },
      '--dsw-alias-label-dimmed': { light: '#b2b8c1', dark: '#666666' },
      '--dsw-alias-button-primary-fill': { light: '#20a53a', dark: '#20a53a' },
      '--dsw-alias-button-primary-hover': { light: '#178c2f', dark: '#28bd4b' },
      '--dsw-alias-button-primary-dimmed': { light: '#8dd69d', dark: '#175c28' },
      '--dsw-alias-button-info-fill': { light: '#f5f7f8', dark: '#252525' },
      '--dsw-alias-button-info-hover': { light: '#edf1f3', dark: '#303030' },
      '--dsw-alias-button-elevated-fill': { light: '#ffffff', dark: '#1c1c1c' },
      '--dsw-alias-button-floating-fill': { light: '#ffffff', dark: '#202020' },
      '--dsw-alias-button-floating-hover': { light: '#f5f7f8', dark: '#2c2c2c' },
      '--dsw-alias-button-tool-bar-fill': { light: '#f6f8f9', dark: '#242424' },
      '--dsw-alias-button-tool-bar-hover': { light: '#eef1f3', dark: '#303030' },
      '--dsw-alias-interactive-bg-hover': { light: '#f4f6f7', dark: '#242424' },
      '--dsw-alias-interactive-bg-hover-accent': { light: '#eaf8ee', dark: '#183d22' },
      '--dsw-alias-interactive-bg-hover-solid': { light: '#d7f1dd', dark: '#20512d' },
      '--dsw-alias-interactive-bg-active': { light: '#e3f6e8', dark: '#21482a' },
      '--dsw-alias-markdown-code-block': { light: '#f6f8f9', dark: '#181818' },
      '--dsw-alias-markdown-code-block-banner': { light: '#f0f3f5', dark: '#242424' },
      '--dsw-alias-markdown-inline-code': { light: '#edf8f0', dark: '#193820' },
      '--dsw-alias-markdown-tag': { light: '#edf8f0', dark: '#263c2b' },
      '--dsw-alias-markdown-citation': { light: '#168a31', dark: '#43d266' },
      '--dsw-alias-scrollbar-bg-l1': { light: '#d9dee3', dark: '#383838' },
      '--dsw-alias-scrollbar-bg-l2': { light: '#c5cbd1', dark: '#474747' },
      '--dsw-alias-scrollbar-hover-l1': { light: '#aeb6bd', dark: '#565656' },
      '--dsw-alias-scrollbar-hover-l2': { light: '#949da6', dark: '#686868' },
      '--dsw-alias-toast-bg': { light: '#ffffff', dark: '#202020' },
      '--dsw-alias-tooltip-bg': { light: '#263d50', dark: '#2b2b2b' },
      '--dsw-specific-bubble': { light: '#f5f7f8', dark: '#242424' },
      '--dsw-specific-bubble-highlight': { light: '#ebf8ee', dark: '#1d4026' },
      '--dsw-specific-input-major': { light: '#ffffff', dark: '#1d1d1d' },
      '--dsw-specific-menu': { light: '#ffffff', dark: '#202020' },
      '--dsw-specific-selector': { light: '#f3f5f6', dark: '#2a2a2a' },
      '--dsw-specific-tip': { light: '#eef9f1', dark: '#193820' },
      '--dsw-specific-sidebar-fill': { light: '#ffffff', dark: '#151515' },
      '--dsw-specific-sidebar-nav-item-active': { light: '#20a53a', dark: '#26352a' },
      '--dsw-specific-sidebar-nav-item-active-accent': { light: '#ffffff', dark: '#35c95a' },
      '--dsw-specific-sidebar-nav-item-hover': { light: '#f5f7f8', dark: '#242424' },
    }

    const css = `
body[data-bt-panel-theme='${PLUGIN_ID}'] { background: var(--dsw-alias-bg-base); }
body[data-bt-panel-theme='${PLUGIN_ID}'] ::selection { color: var(--dsw-alias-brand-primary-invert); background: var(--dsw-alias-brand-primary); }
body[data-bt-panel-theme='${PLUGIN_ID}'] button, body[data-bt-panel-theme='${PLUGIN_ID}'] input, body[data-bt-panel-theme='${PLUGIN_ID}'] textarea { transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease; }
body[data-bt-panel-theme='${PLUGIN_ID}'] :focus-visible { outline-color: var(--dsw-alias-brand-primary) !important; }
body[data-bt-panel-theme='${PLUGIN_ID}'] nav button[aria-current='true'], body[data-bt-panel-theme='${PLUGIN_ID}'] nav a[aria-current='page'] { color: var(--dsw-specific-sidebar-nav-item-active-accent) !important; }
body[data-bt-panel-theme='${PLUGIN_ID}'] nav button[aria-current='true'] *, body[data-bt-panel-theme='${PLUGIN_ID}'] nav a[aria-current='page'] * { color: inherit !important; }
body[data-bt-panel-theme='${PLUGIN_ID}'] nav button[aria-current='true'] svg, body[data-bt-panel-theme='${PLUGIN_ID}'] nav a[aria-current='page'] svg { color: var(--dsw-specific-sidebar-nav-item-active-accent) !important; }
.dsh-bt-nav { box-sizing: border-box; width: calc(100% - 20px); min-height: 38px; margin: 7px 10px 3px; padding: 0 12px; display: flex; align-items: center; gap: 8px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 18px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-button-tool-bar-fill); cursor: pointer; font: inherit; font-size: 13px; white-space: nowrap; }
.dsh-bt-nav:hover { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-text); background: var(--dsw-alias-interactive-bg-hover-accent); }
.dsh-bt-nav[aria-pressed='true'] { border-color: var(--dsw-specific-sidebar-nav-item-active); color: var(--dsw-specific-sidebar-nav-item-active-accent); background: var(--dsw-specific-sidebar-nav-item-active); }
.dsh-bt-nav__icon { width: 18px; height: 18px; display: grid; place-items: center; color: var(--dsw-alias-brand-primary); background: currentColor; -webkit-mask: url("${BT_PANEL_LOGO}") center / contain no-repeat; mask: url("${BT_PANEL_LOGO}") center / contain no-repeat; line-height: 1; }
.dsh-bt-nav__icon img { width: 18px; height: 18px; display: block; object-fit: contain; opacity: 0; }
.dsh-bt-nav[aria-pressed='true'] .dsh-bt-nav__icon { color: var(--dsw-specific-sidebar-nav-item-active-accent); }
[data-sidebar-collapsed] .dsh-bt-nav { width: 36px; min-height: 36px; margin: 7px auto 3px; padding: 0; justify-content: center; }
[data-sidebar-collapsed] .dsh-bt-nav__label { display: none; }
.dsh-bt-view-host { position: relative; width: 100%; min-width: 0; min-height: 0; flex: 1 1 0; align-self: stretch; overflow: hidden; background: var(--dsw-alias-bg-base); }
.dsh-bt-page { position: absolute; inset: 0; overflow: hidden; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); }
.dsh-bt-persistent-layer { position: fixed; z-index: 20; overflow: hidden; contain: layout paint; background: var(--dsw-alias-bg-base); }
.dsh-bt-persistent-layer[hidden] { display: none !important; }
.dsh-bt-embed-shell { width: 100%; height: 100%; min-width: 0; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); background: var(--dsw-alias-bg-base); }
.dsh-bt-embed-toolbar { min-width: 0; min-height: 52px; padding: 8px 14px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1); box-sizing: border-box; }
.dsh-bt-embed-toolbar[hidden] { display: none; }
.dsh-bt-embed-identity { min-width: 0; display: flex; align-items: center; gap: 10px; }
.dsh-bt-embed-logo { width: 28px; height: 28px; flex: 0 0 auto; object-fit: contain; }
.dsh-bt-embed-copy { min-width: 0; }
.dsh-bt-embed-title { color: var(--dsw-alias-label-primary); font-size: 13px; font-weight: 700; }
.dsh-bt-embed-address { max-width: min(50vw, 680px); margin-top: 2px; overflow: hidden; color: var(--dsw-alias-label-tertiary); font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
.dsh-bt-embed-actions { flex: 0 0 auto; display: flex; align-items: center; gap: 8px; }
.dsh-bt-embed-action { box-sizing: border-box; min-width: 68px; height: 32px; padding: 0 12px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--dsw-alias-border-l2); border-radius: 7px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-button-elevated-fill); cursor: pointer; font: inherit; font-size: 12px; text-decoration: none; }
.dsh-bt-embed-action:hover { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-text); background: var(--dsw-alias-interactive-bg-hover-accent); }
.dsh-bt-embed-action:disabled { border-color: var(--dsw-alias-border-l1); color: var(--dsw-alias-label-dimmed); background: var(--dsw-alias-button-elevated-fill); cursor: not-allowed; }
.dsh-bt-embed-viewport { position: relative; min-width: 0; min-height: 0; overflow: hidden; background: var(--dsw-alias-bg-base); }
.dsh-bt-embed-frame { width: 100%; height: 100%; display: block; border: 0; background: var(--dsw-alias-bg-base); }
.dsh-bt-embed-status { position: absolute; inset: 0; z-index: 1; padding: 28px; display: grid; place-content: center; justify-items: center; gap: 12px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-base); text-align: center; box-sizing: border-box; }
.dsh-bt-embed-status h2 { margin: 0; color: var(--dsw-alias-label-primary); font-size: 18px; }
.dsh-bt-embed-status p { max-width: 620px; margin: 0; color: var(--dsw-alias-label-tertiary); font-size: 13px; line-height: 1.65; }
.dsh-bt-embed-status__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.dsh-bt-settings-card { list-style: none; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); box-shadow: 0 2px 8px rgba(0, 0, 0, .06); }
.dsh-bt-settings-card__header { width: 100%; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border: 0; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); cursor: pointer; font: inherit; text-align: left; }
.dsh-bt-settings-card__header:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dsh-bt-settings-card__title { display: block; color: var(--dsw-alias-label-primary); font-size: 15px; font-weight: 650; }
.dsh-bt-settings-card__description { display: block; margin-top: 4px; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 1.5; }
.dsh-bt-settings-card__chevron { color: var(--dsw-alias-brand-text); font-size: 18px; transition: transform 160ms ease; }
.dsh-bt-settings-card__chevron[data-open='true'] { transform: rotate(180deg); }
.dsh-bt-settings-card__body { padding: 2px 20px 20px; border-top: 1px solid var(--dsw-alias-border-l1); }
.dsh-bt-settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 18px; }
.dsh-bt-settings-field { min-width: 0; padding: 13px 0; display: flex; flex-direction: column; gap: 6px; }
.dsh-bt-settings-field--wide { grid-column: 1 / -1; }
.dsh-bt-settings-field label, .dsh-bt-settings-field__label { color: var(--dsw-alias-label-primary); font-size: 13px; font-weight: 550; }
.dsh-bt-settings-field input[type='text'], .dsh-bt-settings-field input[type='password'], .dsh-bt-settings-field input[type='number'] { box-sizing: border-box; width: 100%; height: 36px; padding: 0 11px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); color-scheme: inherit; font: inherit; font-size: 13px; }
.dsh-bt-settings-field input::placeholder { color: var(--dsw-alias-label-dimmed); opacity: 1; }
.dsh-bt-settings-field input:focus { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent); outline: none; }
.dsh-bt-settings-field input:disabled { cursor: not-allowed; opacity: .62; }
.dsh-bt-settings-field small, .dsh-bt-settings-message { color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 1.5; }
.dsh-bt-settings-check { min-height: 36px; display: flex; align-items: center; gap: 9px; color: var(--dsw-alias-label-primary); font-size: 13px; }
.dsh-bt-settings-check input { width: 16px; height: 16px; accent-color: var(--dsw-alias-brand-primary); }
.dsh-bt-settings-message { min-height: 20px; margin: 2px 0 0; font-size: 12px; }
.dsh-bt-settings-message[data-error='true'] { color: #e05a5a; }
.dsh-bt-settings-actions { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding-top: 15px; border-top: 1px solid var(--dsw-alias-border-l1); }
.dsh-bt-settings-actions button { min-width: 78px; height: 34px; padding: 0 14px; border-radius: 8px; cursor: pointer; font: inherit; font-size: 13px; }
.dsh-bt-settings-actions button:disabled { cursor: not-allowed; opacity: .58; }
.dsh-bt-settings-discard { border: 1px solid var(--dsw-alias-border-l2); color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-button-elevated-fill); }
.dsh-bt-settings-save { border: 1px solid var(--dsw-alias-brand-primary); color: #fff !important; background: var(--dsw-alias-brand-primary); }
.dsh-bt-settings-save:hover:not(:disabled) { border-color: var(--dsw-alias-button-primary-hover); background: var(--dsw-alias-button-primary-hover); }
@media (max-width: 680px) { .dsh-bt-embed-toolbar { align-items: flex-start; } .dsh-bt-embed-address { max-width: 42vw; } .dsh-bt-embed-action { min-width: 58px; padding: 0 9px; } }
@media (max-width: 620px) { .dsh-bt-settings-grid { grid-template-columns: 1fr; } .dsh-bt-settings-field--wide { grid-column: auto; } }
`

    function installBtPanelEmbed(ctx, configRemote) {
      if (typeof document === 'undefined' || !document.body || typeof document.createElement !== 'function' || typeof document.querySelectorAll !== 'function') return undefined
      if (typeof require !== 'function' || !ctx?.slots?.inject || !ctx?.slots?.register) return undefined

      let React
      try {
        React = require('react')
      } catch {
        return undefined
      }

      const nav = document.createElement('button')
      nav.type = 'button'
      nav.className = 'dsh-bt-nav'
      nav.setAttribute('aria-label', '打开宝塔面板')
      nav.setAttribute('aria-pressed', 'false')
      nav.innerHTML = `<span class="dsh-bt-nav__icon"><img src="${BT_PANEL_LOGO}" alt=""></span><span class="dsh-bt-nav__label">宝塔面板</span>`

      const page = document.createElement('section')
      page.className = 'dsh-bt-page dsh-bt-embed-page'
      page.setAttribute('aria-hidden', 'true')
      page.innerHTML = `
        <div class="dsh-bt-embed-shell">
          <header class="dsh-bt-embed-toolbar" data-bt-embed-toolbar hidden>
            <div class="dsh-bt-embed-identity">
              <img class="dsh-bt-embed-logo" src="${BT_PANEL_LOGO}" alt="">
              <div class="dsh-bt-embed-copy">
                <div class="dsh-bt-embed-title">宝塔面板</div>
                <div class="dsh-bt-embed-address" data-bt-embed-address></div>
              </div>
            </div>
            <div class="dsh-bt-embed-actions">
              <button class="dsh-bt-embed-action" type="button" data-bt-embed-reload>刷新</button>
              <button class="dsh-bt-embed-action" type="button" data-bt-embed-open disabled>新窗口打开</button>
            </div>
          </header>
          <main class="dsh-bt-embed-viewport" data-bt-embed-viewport aria-live="polite"></main>
        </div>`

      const persistentLayer = document.createElement('div')
      persistentLayer.className = 'dsh-bt-persistent-layer'
      persistentLayer.dataset.plugin = PLUGIN_ID
      persistentLayer.hidden = true
      persistentLayer.setAttribute('aria-hidden', 'true')
      persistentLayer.appendChild(page)
      document.body.appendChild(persistentLayer)

      const toolbar = page.querySelector('[data-bt-embed-toolbar]')
      const address = page.querySelector('[data-bt-embed-address]')
      const openButton = page.querySelector('[data-bt-embed-open]')
      const viewport = page.querySelector('[data-bt-embed-viewport]')
      let pageOpen = false
      let pageSlotDispose
      let scheduled = false
      let requestRevision = 0
      let settingsTimer
      let currentPanelUrl = ''
      let currentFrameUrl = ''
      let proxySessionReady = false
      let currentFrame
      let pageHost
      let pageBoundsObserver
      let initialized = false
      const changedEditionLabels = new Map()

      const element = (tag, className, text) => {
        const node = document.createElement(tag)
        if (className) node.className = className
        if (text !== undefined) node.textContent = text
        return node
      }
      const actionButton = (label, dataName) => {
        const button = element('button', 'dsh-bt-embed-action', label)
        button.type = 'button'
        button.dataset[dataName] = 'true'
        return button
      }
      const stopFrame = () => {
        if (!currentFrame) return
        currentFrame.removeAttribute('src')
        currentFrame.remove()
        currentFrame = undefined
      }
      const isFrameOnProxy = () => {
        try {
          const parsed = new URL(currentFrame?.contentWindow?.location?.href)
          const isProxyPath = parsed.pathname === BT_PANEL_PROXY_PREFIX || parsed.pathname.startsWith(`${BT_PANEL_PROXY_PREFIX}/`)
          return parsed.origin === window.location.origin && isProxyPath
        } catch {
          return false
        }
      }
      const panelDirectLoginUrl = () => new URL(`${BT_PANEL_PROXY_PREFIX}/__direct_login__`, window.location.origin).href
      const openPanelWindow = () => {
        if (!proxySessionReady) return
        window.open(panelDirectLoginUrl(), '_blank', 'noopener,noreferrer')
      }
      const renderStatus = (title, message, actions = []) => {
        stopFrame()
        const status = element('div', 'dsh-bt-embed-status')
        status.append(element('h2', '', title), element('p', '', message))
        if (actions.length) {
          const actionRow = element('div', 'dsh-bt-embed-status__actions')
          actionRow.append(...actions)
          status.appendChild(actionRow)
        }
        viewport.replaceChildren(status)
      }
      const renderLoading = () => {
        currentPanelUrl = ''
        currentFrameUrl = ''
        proxySessionReady = false
        openButton.disabled = true
        toolbar.hidden = true
        renderStatus('正在加载宝塔面板', '正在读取已保存的宝塔面板配置…')
      }
      const renderUnconfigured = () => {
        currentPanelUrl = ''
        currentFrameUrl = ''
        proxySessionReady = false
        openButton.disabled = true
        toolbar.hidden = true
        renderStatus('尚未配置宝塔面板', '请先保存并验证宝塔面板地址和 API 密钥。', [actionButton('去配置', 'btConfigure')])
      }
      const renderError = (cause) => {
        const message = cause instanceof Error ? cause.message : String(cause)
        toolbar.hidden = !currentPanelUrl
        renderStatus('宝塔面板无法加载', message, [actionButton('重试', 'btRetry'), actionButton('检查配置', 'btConfigure')])
      }
      const normalizePanelUrl = (value) => {
        const parsed = new URL(String(value ?? '').trim())
        if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('宝塔面板地址必须使用 HTTP 或 HTTPS。')
        if (parsed.username || parsed.password) throw new Error('宝塔面板地址不能包含用户名或密码。')
        return parsed.toString()
      }
      const renderFrame = (value, directValue = value) => {
        const frameUrl = normalizePanelUrl(value)
        const panelUrl = normalizePanelUrl(directValue)
        currentFrameUrl = frameUrl
        currentPanelUrl = panelUrl
        proxySessionReady = false
        openButton.disabled = true
        address.textContent = panelUrl
        address.title = panelUrl
        toolbar.hidden = false

        stopFrame()
        const loading = element('div', 'dsh-bt-embed-status')
        loading.append(element('h2', '', '正在进入宝塔面板'), element('p', '', '将使用宝塔面板自身的登录状态，不会把 API 密钥写入页面地址。'))
        const frame = document.createElement('iframe')
        frame.className = 'dsh-bt-embed-frame'
        frame.title = '宝塔面板'
        frame.src = frameUrl
        frame.loading = 'eager'
        frame.referrerPolicy = 'strict-origin-when-cross-origin'
        frame.setAttribute('allow', 'clipboard-read; clipboard-write; fullscreen')
        frame.setAttribute('allowfullscreen', '')
        frame.addEventListener('load', () => {
          if (currentFrame === frame) {
            loading.remove()
            proxySessionReady = isFrameOnProxy()
            openButton.disabled = !proxySessionReady
          }
        }, { once: true })
        frame.addEventListener('error', () => {
          if (currentFrame === frame) renderError(new Error('浏览器未能加载宝塔面板，请检查地址、HTTPS 证书或面板的 iframe 安全策略。'))
        }, { once: true })
        currentFrame = frame
        viewport.replaceChildren(frame, loading)
      }
      const loadEmbeddedPanel = async () => {
        const revision = ++requestRevision
        renderLoading()
        try {
          if (!configRemote) throw new Error('Host 配置接口未加载。')
          const remote = await configRemote
          const response = await remote.prepareEmbed({ origin: window.location.origin })
          if (!response?.ok) throw new Error(response?.error?.message ?? response?.error?.code ?? '宝塔面板内嵌权限配置失败')
          if (revision !== requestRevision) return
          const embed = response.value
          if (!embed?.configured) renderUnconfigured()
          else renderFrame(embed.panelUrl, embed.directPanelUrl)
        } catch (cause) {
          if (revision === requestRevision) renderError(cause)
        }
      }

      const hidePersistentPage = () => {
        persistentLayer.hidden = true
        persistentLayer.setAttribute('aria-hidden', 'true')
        page.setAttribute('aria-hidden', 'true')
      }
      const updatePageBounds = () => {
        if (!pageOpen || !pageHost?.isConnected || typeof pageHost.getBoundingClientRect !== 'function') {
          hidePersistentPage()
          return
        }
        const bounds = pageHost.getBoundingClientRect()
        if (bounds.width <= 0 || bounds.height <= 0) {
          hidePersistentPage()
          return
        }
        const nextBounds = {
          left: `${bounds.left}px`,
          top: `${bounds.top}px`,
          width: `${bounds.width}px`,
          height: `${bounds.height}px`,
        }
        for (const [name, value] of Object.entries(nextBounds)) {
          if (persistentLayer.style[name] !== value) persistentLayer.style[name] = value
        }
        persistentLayer.hidden = false
        persistentLayer.setAttribute('aria-hidden', 'false')
        page.setAttribute('aria-hidden', 'false')
      }
      if (typeof ResizeObserver !== 'undefined') pageBoundsObserver = new ResizeObserver(() => updatePageBounds())
      const mountPage = (host) => {
        if (!host) return
        if (pageHost && pageHost !== host) pageBoundsObserver?.unobserve(pageHost)
        pageHost = host
        pageBoundsObserver?.observe(host)
        updatePageBounds()
        if (!initialized) {
          initialized = true
          void loadEmbeddedPanel()
        }
      }
      const unmountPage = (host) => {
        if (host && pageHost !== host) return
        if (pageHost) pageBoundsObserver?.unobserve(pageHost)
        pageHost = undefined
        hidePersistentPage()
      }
      const ensurePageHost = () => {
        if (!pageOpen) return
        mountPage(document.querySelector('[data-bt-embedded-panel-view]'))
      }

      function EmbeddedPanelView() {
        const hostRef = React.useRef(null)
        React.useLayoutEffect(() => {
          const host = hostRef.current
          if (!host) return undefined
          mountPage(host)
          return () => unmountPage(host)
        }, [])
        return React.createElement('div', {
          ref: hostRef,
          className: 'dsh-bt-view-host',
          'data-bt-embedded-panel-view': '',
          style: { position: 'relative', flex: '1 1 0', alignSelf: 'stretch', minHeight: 0, overflow: 'hidden' },
        })
      }
      const setOpen = (open) => {
        if (pageOpen === open) return
        pageOpen = open
        nav.setAttribute('aria-pressed', String(open))
        if (open) {
          pageSlotDispose = ctx.slots.inject('conversation', () => ctx.slots.register({
            name: 'conversation',
            priority: -100,
            registrant: PLUGIN_ID,
          }, EmbeddedPanelView))
          queueMicrotask(ensurePageHost)
        } else {
          unmountPage(pageHost)
          const dispose = pageSlotDispose
          pageSlotDispose = undefined
          dispose?.()
        }
      }
      const findNewSessionButton = () => [...document.querySelectorAll('button')].find((button) => /^(新会话|New Session)$/i.test(button.textContent.trim()))
      const ensureNav = () => {
        const newSession = findNewSessionButton()
        if (newSession && nav.previousElementSibling !== newSession) newSession.insertAdjacentElement('afterend', nav)
      }
      const openSettings = () => {
        setOpen(false)
        const settingsButton = [...document.querySelectorAll('button')].find((button) => /^(设置|Settings)$/i.test((button.getAttribute('aria-label') || button.textContent).trim()))
        settingsButton?.click()
        let attempts = 0
        const selectPlugin = () => {
          const plugin = [...document.querySelectorAll('[role="tab"], button')].find((node) => /^(插件|插件配置|Plugin|Plugin Configuration|Configurable)$/i.test(node.textContent.trim()))
          if (plugin) {
            plugin.click()
            settingsTimer = undefined
            return
          }
          attempts += 1
          if (attempts < 30) settingsTimer = setTimeout(selectPlugin, 50)
        }
        selectPlugin()
      }
      const replaceEditionText = (node) => {
        const value = node.data.trim()
        const replacement = value === '预览版' ? '宝塔版' : value === 'Preview' ? 'BT Edition' : undefined
        if (!replacement) return
        if (!changedEditionLabels.has(node)) changedEditionLabels.set(node, { original: node.data, replacement })
        node.data = node.data.replace(value, replacement)
      }
      const replaceEditionLabels = (root) => {
        if (root?.nodeType === 3) return replaceEditionText(root)
        if (typeof NodeFilter === 'undefined' || typeof document.createTreeWalker !== 'function') return
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) replaceEditionText(node)
      }
      const sync = () => {
        if (scheduled) return
        scheduled = true
        const run = () => { scheduled = false; ensureNav(); ensurePageHost() }
        if (typeof requestAnimationFrame === 'function') requestAnimationFrame(run)
        else queueMicrotask(run)
      }
      const onNavClick = () => setOpen(!pageOpen)
      const onPageClick = (event) => {
        const target = event.target?.closest?.('button')
        if (!target) return
        if (target.matches('[data-bt-embed-reload]')) {
          void loadEmbeddedPanel()
        } else if (target.matches('[data-bt-embed-open]')) {
          openPanelWindow()
        } else if (target.matches('[data-bt-retry]')) void loadEmbeddedPanel()
        else if (target.matches('[data-bt-configure]')) openSettings()
      }
      const onKeyDown = (event) => { if (event.key === 'Escape' && pageOpen) setOpen(false) }
      const onDocumentClick = (event) => {
        if (!pageOpen || nav.contains(event.target) || page.contains(event.target)) return
        const target = event.target?.closest?.('button, [role="treeitem"]')
        if (!target) return
        const isSession = target.matches('[role="treeitem"][aria-selected]')
        const isNewSession = target.matches('button') && /^(新会话|New Session)$/i.test(target.textContent.trim())
        if (isSession || isNewSession) setOpen(false)
      }

      nav.addEventListener('click', onNavClick)
      page.addEventListener('click', onPageClick)
      document.addEventListener('keydown', onKeyDown)
      document.addEventListener('click', onDocumentClick, true)
      window.addEventListener('resize', sync)
      window.addEventListener('scroll', sync, true)
      replaceEditionLabels(document.body)
      ensureNav()
      const observer = typeof MutationObserver === 'undefined' ? undefined : new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'characterData') replaceEditionText(mutation.target)
          for (const node of mutation.addedNodes ?? []) replaceEditionLabels(node)
        }
        sync()
      })
      observer?.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['style', 'data-sidebar-collapsed'] })
      return () => {
        observer?.disconnect()
        pageBoundsObserver?.disconnect()
        if (settingsTimer !== undefined) clearTimeout(settingsTimer)
        requestRevision += 1
        stopFrame()
        nav.removeEventListener('click', onNavClick)
        page.removeEventListener('click', onPageClick)
        document.removeEventListener('keydown', onKeyDown)
        document.removeEventListener('click', onDocumentClick, true)
        window.removeEventListener('resize', sync)
        window.removeEventListener('scroll', sync, true)
        const dispose = pageSlotDispose
        pageSlotDispose = undefined
        dispose?.()
        nav.remove()
        persistentLayer.remove()
        for (const [node, change] of changedEditionLabels) {
          if (node.data.includes(change.replacement)) node.data = change.original
        }
      }
    }

    function installConfigRemote(ctx) {
      if (!ctx?.remote?.$mount) return undefined
      const parseView = (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError('BT Panel config response must be an object')
        const timeoutMs = Number(value.timeoutMs)
        if (!Number.isInteger(timeoutMs) || timeoutMs < 1000 || timeoutMs > 60000) throw new TypeError('Invalid timeoutMs')
        return {
          panelUrl: String(value.panelUrl ?? ''),
          apiKeySet: value.apiKeySet === true,
          verifySsl: value.verifySsl !== false,
          timeoutMs,
        }
      }
      const parseSave = (value) => {
        const view = parseView({ ...value, apiKeySet: false })
        return {
          panelUrl: view.panelUrl,
          ...(typeof value.apiKey === 'string' && value.apiKey ? { apiKey: value.apiKey } : {}),
          verifySsl: view.verifySsl,
          timeoutMs: view.timeoutMs,
        }
      }
      const parseEmbedRequest = (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value) || typeof value.origin !== 'string') throw new TypeError('Invalid BT Panel embed request')
        return { origin: value.origin }
      }
      const parseEmbedResponse = (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value) || typeof value.configured !== 'boolean') throw new TypeError('Invalid BT Panel embed response')
        if (!value.configured) return { configured: false }
        if (typeof value.panelUrl !== 'string' || typeof value.directPanelUrl !== 'string' || typeof value.origin !== 'string') throw new TypeError('Invalid BT Panel embed response')
        return {
          configured: true,
          panelUrl: value.panelUrl,
          directPanelUrl: value.directPanelUrl,
          origin: value.origin,
        }
      }
      const codec = (typeSymbol, parse) => ({ mode: 'strict', typeSymbol, schema: { parse } })
      const viewCodec = codec('dsh-bt-panel-theme/config#BtPanelThemeConfigView', parseView)
      const saveCodec = codec('dsh-bt-panel-theme/config#BtPanelThemeConfigSave', parseSave)
      const embedRequestCodec = codec('dsh-bt-panel-theme/config#BtPanelThemeEmbedRequest', parseEmbedRequest)
      const embedResponseCodec = codec('dsh-bt-panel-theme/config#BtPanelThemeEmbedResponse', parseEmbedResponse)
      const contribution = {
        package: PLUGIN_ID,
        descriptors: [
          {
            id: `${PLUGIN_ID}#btPanelThemeConfig/get`,
            service: 'btPanelThemeConfig',
            namespace: 'btPanelThemeConfig',
            method: 'get',
            invocation: { kind: 'direct' },
            parameters: [],
            result: viewCodec,
            sourceLocation: { file: 'client.js', line: 1, column: 1 },
          },
          {
            id: `${PLUGIN_ID}#btPanelThemeConfig/save`,
            service: 'btPanelThemeConfig',
            namespace: 'btPanelThemeConfig',
            method: 'save',
            invocation: { kind: 'direct' },
            parameters: [{ name: 'request', wire: 'request', source: 'json', codec: saveCodec }],
            result: viewCodec,
            sourceLocation: { file: 'client.js', line: 1, column: 1 },
          },
          {
            id: `${PLUGIN_ID}#btPanelThemeConfig/prepareEmbed`,
            service: 'btPanelThemeConfig',
            namespace: 'btPanelThemeConfig',
            method: 'prepareEmbed',
            invocation: { kind: 'direct' },
            parameters: [{ name: 'request', wire: 'request', source: 'json', codec: embedRequestCodec }],
            result: embedResponseCodec,
            sourceLocation: { file: 'client.js', line: 1, column: 1 },
          },
        ],
      }
      return ctx.remote.$mount(contribution).then(() => {
        const namespace = ctx.get('remote.btPanelThemeConfig')
        if (!namespace) throw new Error('BT Panel Host Remote namespace did not start')
        return namespace
      })
    }

    function installSettingsCard(ctx, configRemote) {
      if (typeof require !== 'function' || !ctx?.slots?.inject || !ctx?.slots?.register || !ctx?.settingsScope?.bind) return

      let React
      try {
        React = require('react')
      } catch {
        return
      }
      const h = React.createElement
      const defaults = {
        panelUrl: '',
        verifySsl: true,
        timeoutMs: 10000,
      }
      const decode = (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
        return {
          panelUrl: typeof value.panelUrl === 'string' ? value.panelUrl : defaults.panelUrl,
          verifySsl: value.verifySsl !== false,
          timeoutMs: Number.isFinite(Number(value.timeoutMs)) ? Number(value.timeoutMs) : defaults.timeoutMs,
        }
      }
      const normalizeDraft = (value) => {
        const current = decode(value) ?? defaults
        return {
          panelUrl: current.panelUrl,
          verifySsl: current.verifySsl,
          timeoutMs: String(current.timeoutMs),
        }
      }
      const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE, decode })
      const subscribe = (listener) => scope.subscribe(listener)
      const getSnapshot = () => scope.getSnapshot()

      function SettingsCard() {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
        const [open, setOpen] = React.useState(true)
        const [draft, setDraft] = React.useState(() => normalizeDraft(snapshot.value))
        const [apiKey, setApiKey] = React.useState('')
        const [dirty, setDirty] = React.useState(false)
        const [saving, setSaving] = React.useState(false)
        const [message, setMessage] = React.useState('')
        const [error, setError] = React.useState(false)

        React.useEffect(() => {
          if (snapshot.status !== 'ready' || dirty) return
          setDraft(normalizeDraft(snapshot.value))
        }, [snapshot.status, snapshot.revision, dirty])

        if (snapshot.status === 'unavailable') return null
        const writable = snapshot.status === 'ready' && snapshot.writable !== false
        const disabled = !writable || saving
        const edit = (field, value) => {
          setDraft((current) => ({ ...current, [field]: value }))
          setDirty(true)
          setMessage('')
          setError(false)
        }
        const discard = () => {
          setDraft(normalizeDraft(snapshot.value))
          setApiKey('')
          setDirty(false)
          setMessage('')
          setError(false)
        }
        const parseNumber = (field, label, min, max) => {
          const value = Number(draft[field])
          if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${label}必须介于 ${min} 与 ${max} 之间。`)
          return Math.round(value)
        }
        const save = async () => {
          if (!writable || saving) return
          setSaving(true)
          setMessage('')
          setError(false)
          try {
            const panelUrl = draft.panelUrl.trim().replace(/\/+$/, '')
            if (panelUrl) {
              const parsed = new URL(panelUrl)
              if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('宝塔面板地址仅支持 HTTP 或 HTTPS。')
            }
            const next = {
              panelUrl,
              verifySsl: draft.verifySsl,
              timeoutMs: parseNumber('timeoutMs', '请求超时', 1000, 60000),
            }
            if (!configRemote) throw new Error('Host 配置接口未加载。')
            const remote = await configRemote
            const response = await remote.save({
              ...next,
              ...(apiKey.trim() ? { apiKey: apiKey.trim() } : {}),
            })
            if (!response?.ok) throw new Error(response?.error?.message ?? response?.error?.code ?? '远程保存失败')
            await scope.load()
            setApiKey('')
            setDirty(false)
            setMessage('宝塔面板 API 验证通过，配置已保存。')
          } catch (cause) {
            setError(true)
            setMessage(cause instanceof Error ? cause.message : String(cause))
          } finally {
            setSaving(false)
          }
        }
        const textField = ({ field, label, hint, type = 'text', wide = false, min, max, step }) => h('div', {
          className: `dsh-bt-settings-field${wide ? ' dsh-bt-settings-field--wide' : ''}`,
        }, h('label', { htmlFor: `dsh-bt-setting-${field}` }, label), h('input', {
          id: `dsh-bt-setting-${field}`,
          type,
          value: draft[field],
          disabled,
          ...(min === undefined ? {} : { min }),
          ...(max === undefined ? {} : { max }),
          ...(step === undefined ? {} : { step }),
          onChange: (event) => edit(field, event.target.value),
        }), h('small', null, hint))

        return h('li', { className: 'dsh-bt-settings-card' },
          h('button', {
            type: 'button',
            className: 'dsh-bt-settings-card__header',
            'aria-expanded': open,
            onClick: () => setOpen((value) => !value),
          }, h('span', null,
            h('span', { className: 'dsh-bt-settings-card__title' }, '宝塔面板'),
            h('span', { className: 'dsh-bt-settings-card__description' }, '配置面板 API 连接与请求安全策略。'),
          ), h('span', { className: 'dsh-bt-settings-card__chevron', 'data-open': String(open), 'aria-hidden': 'true' }, '⌄')),
          open ? h('div', { className: 'dsh-bt-settings-card__body' },
            h('div', { className: 'dsh-bt-settings-grid' },
              textField({ field: 'panelUrl', label: '宝塔面板地址', hint: '例如 https://panel.example.com:8888', wide: true }),
              h('div', { className: 'dsh-bt-settings-field dsh-bt-settings-field--wide' },
                h('label', { htmlFor: 'dsh-bt-setting-api-key' }, 'API 密钥'),
                h('input', {
                  id: 'dsh-bt-setting-api-key',
                  type: 'password',
                  value: apiKey,
                  autoComplete: 'new-password',
                  disabled,
                  placeholder: '输入新密钥',
                  onChange: (event) => { setApiKey(event.target.value); setDirty(true); setMessage(''); setError(false) },
                }),
                h('small', null, '已保存的密钥不会回显；留空并保存时保留现有密钥。'),
              ),
              h('div', { className: 'dsh-bt-settings-field' },
                h('span', { className: 'dsh-bt-settings-field__label' }, 'HTTPS 证书'),
                h('label', { className: 'dsh-bt-settings-check' }, h('input', {
                  type: 'checkbox',
                  checked: draft.verifySsl,
                  disabled,
                  onChange: (event) => edit('verifySsl', event.target.checked),
                }), '验证 SSL 证书'),
                h('small', null, '仅在内网自签名证书环境中考虑关闭。'),
              ),
              textField({ field: 'timeoutMs', label: '请求超时（毫秒）', hint: '1000–60000', type: 'number', min: 1000, max: 60000, step: 1000 }),
            ),
            h('p', { className: 'dsh-bt-settings-message', 'data-error': String(error), role: 'status' }, message || (snapshot.status === 'loading' ? '正在读取配置…' : !writable ? '当前设置提供方为只读。' : '')),
            h('div', { className: 'dsh-bt-settings-actions' },
              h('button', { type: 'button', className: 'dsh-bt-settings-discard', disabled: !dirty || saving, onClick: discard }, '放弃更改'),
              h('button', { type: 'button', className: 'dsh-bt-settings-save', disabled: !dirty || disabled, onClick: () => void save() }, saving ? '验证并保存中…' : '保存'),
            ),
          ) : null,
        )
      }

      ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
        name: 'settings.plugin.item',
        key: SETTINGS_NAMESPACE,
      }, SettingsCard))
    }

    function installSettingsDomFallback(ctx, configRemote) {
      if (typeof document === 'undefined' || !document.body || typeof document.createElement !== 'function' || typeof document.querySelectorAll !== 'function') return undefined
      if (!ctx?.settingsScope?.bind && !configRemote) return undefined

      const defaults = {
        panelUrl: '',
        verifySsl: true,
        timeoutMs: 10000,
      }
      const decode = (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
        return {
          panelUrl: typeof value.panelUrl === 'string' ? value.panelUrl : defaults.panelUrl,
          verifySsl: value.verifySsl !== false,
          timeoutMs: Number.isFinite(Number(value.timeoutMs)) ? Number(value.timeoutMs) : defaults.timeoutMs,
        }
      }
      const scope = ctx.settingsScope?.bind ? ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE, decode }) : undefined
      const card = document.createElement('div')
      card.className = 'dsh-bt-settings-card'
      card.dataset.btSettingsFallback = 'true'
      card.innerHTML = `
        <button type="button" class="dsh-bt-settings-card__header" aria-expanded="true" data-bt-settings-toggle>
          <span><span class="dsh-bt-settings-card__title">宝塔面板</span><span class="dsh-bt-settings-card__description">配置面板 API 连接与请求安全策略。</span></span>
          <span class="dsh-bt-settings-card__chevron" data-open="true" aria-hidden="true">⌄</span>
        </button>
        <div class="dsh-bt-settings-card__body" data-bt-settings-body>
          <div class="dsh-bt-settings-grid">
            <div class="dsh-bt-settings-field dsh-bt-settings-field--wide"><label for="dsh-bt-fallback-panel-url">宝塔面板地址</label><input id="dsh-bt-fallback-panel-url" name="panelUrl" type="text" placeholder="https://panel.example.com:8888"><small>例如 https://panel.example.com:8888</small></div>
            <div class="dsh-bt-settings-field dsh-bt-settings-field--wide"><label for="dsh-bt-fallback-api-key">API 密钥</label><input id="dsh-bt-fallback-api-key" name="apiKey" type="password" autocomplete="new-password" placeholder="输入新密钥"><small>已保存的密钥不会回显；留空保存时保留现有密钥。</small></div>
            <div class="dsh-bt-settings-field"><span class="dsh-bt-settings-field__label">HTTPS 证书</span><label class="dsh-bt-settings-check"><input name="verifySsl" type="checkbox" checked> 验证 SSL 证书</label><small>仅在内网自签名证书环境中考虑关闭。</small></div>
            <div class="dsh-bt-settings-field"><label for="dsh-bt-fallback-timeout">请求超时（毫秒）</label><input id="dsh-bt-fallback-timeout" name="timeoutMs" type="number" min="1000" max="60000" step="1000"><small>1000–60000</small></div>
          </div>
          <p class="dsh-bt-settings-message" data-error="false" role="status" data-bt-settings-message></p>
          <div class="dsh-bt-settings-actions"><button type="button" class="dsh-bt-settings-discard" data-bt-settings-discard>放弃更改</button><button type="button" class="dsh-bt-settings-save" data-bt-settings-save>保存</button></div>
        </div>`

      const fields = Object.fromEntries([...card.querySelectorAll('[name]')].map((input) => [input.name, input]))
      const message = card.querySelector('[data-bt-settings-message]')
      const saveButton = card.querySelector('[data-bt-settings-save]')
      const discardButton = card.querySelector('[data-bt-settings-discard]')
      const body = card.querySelector('[data-bt-settings-body]')
      const toggle = card.querySelector('[data-bt-settings-toggle]')
      const chevron = card.querySelector('.dsh-bt-settings-card__chevron')
      const hiddenEmptyNodes = new Map()
      let dirty = false
      let saving = false
      let remoteClient
      let remoteValue
      let remoteStatus = configRemote ? 'loading' : 'unavailable'
      let remoteError = ''

      const currentValues = () => {
        const snapshot = scope?.getSnapshot()
        if (snapshot?.status === 'ready') return decode(snapshot.value) ?? defaults
        return decode(remoteValue) ?? defaults
      }
      const fill = () => {
        const value = currentValues()
        fields.panelUrl.value = value.panelUrl
        fields.apiKey.value = ''
        fields.verifySsl.checked = value.verifySsl
        fields.timeoutMs.value = String(value.timeoutMs)
      }
      const render = () => {
        const snapshot = scope?.getSnapshot()
        const scopeWritable = snapshot?.status === 'ready' && snapshot.writable !== false
        const writable = remoteStatus === 'ready'
        for (const input of Object.values(fields)) input.disabled = !writable || saving
        saveButton.disabled = !dirty || !writable || saving
        discardButton.disabled = !dirty || saving
        if (!dirty && (scopeWritable || remoteStatus === 'ready')) fill()
        if (saving) {
          saveButton.textContent = '验证并保存中…'
          message.dataset.error = 'false'
          message.textContent = '正在验证宝塔面板地址、API 密钥与访问白名单…'
        } else {
          saveButton.textContent = '保存'
          if (remoteStatus === 'loading') {
            message.dataset.error = 'false'
            message.textContent = '正在连接 Host 配置接口…'
          } else if (remoteStatus === 'failed') {
            message.dataset.error = 'true'
            message.textContent = `Host 配置接口不可用：${remoteError || '未知错误'}`
          } else if (!writable) {
            message.dataset.error = 'true'
            message.textContent = '当前配置提供方不可写。'
          }
        }
      }
      const parseNumber = (name, label, min, max) => {
        const value = Number(fields[name].value)
        if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${label}必须介于 ${min} 与 ${max} 之间。`)
        return Math.round(value)
      }
      const save = async () => {
        const snapshot = scope?.getSnapshot()
        const scopeWritable = snapshot?.status === 'ready' && snapshot.writable !== false
        if (saving || remoteStatus !== 'ready') return
        saving = true
        message.dataset.error = 'false'
        render()
        try {
          const panelUrl = fields.panelUrl.value.trim().replace(/\/+$/, '')
          if (panelUrl) {
            const parsed = new URL(panelUrl)
            if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('宝塔面板地址仅支持 HTTP 或 HTTPS。')
          }
          const next = {
            panelUrl,
            verifySsl: fields.verifySsl.checked,
            timeoutMs: parseNumber('timeoutMs', '请求超时', 1000, 60000),
          }
          const remote = remoteClient ?? await configRemote
          const response = await remote.save({
            ...next,
            ...(fields.apiKey.value.trim() ? { apiKey: fields.apiKey.value.trim() } : {}),
          })
          if (!response?.ok) throw new Error(response?.error?.message ?? response?.error?.code ?? '远程保存失败')
          remoteValue = response.value
          if (scopeWritable) await scope.load()
          dirty = false
          fill()
          message.dataset.error = 'false'
          message.textContent = '宝塔面板 API 验证通过，配置已保存。'
        } catch (cause) {
          message.dataset.error = 'true'
          message.textContent = cause instanceof Error ? cause.message : String(cause)
        } finally {
          saving = false
          render()
        }
      }
      const onInput = (event) => {
        if (!event.target.matches('[name]')) return
        dirty = true
        message.dataset.error = 'false'
        message.textContent = ''
        render()
      }
      const onClick = (event) => {
        const target = event.target.closest('button')
        if (!target) return
        if (target.matches('[data-bt-settings-toggle]')) {
          const open = body.hidden
          body.hidden = !open
          toggle.setAttribute('aria-expanded', String(open))
          chevron.dataset.open = String(open)
        } else if (target.matches('[data-bt-settings-discard]')) {
          dirty = false
          fill()
          message.dataset.error = 'false'
          message.textContent = ''
          render()
        } else if (target.matches('[data-bt-settings-save]')) void save()
      }
      const restoreEmptyNodes = () => {
        for (const [node, display] of hiddenEmptyNodes) node.style.display = display
        hiddenEmptyNodes.clear()
      }
      const ensure = () => {
        const tab = [...document.querySelectorAll('[role="tab"]')].find((node) => /^(插件配置|Plugin Configuration|Configurable)$/i.test(node.textContent.trim()))
        const panelId = tab?.getAttribute('aria-controls')
        const panel = panelId ? document.getElementById(panelId) : undefined
        if (!panel) return
        const official = panel.querySelector('.dsh-bt-settings-card:not([data-bt-settings-fallback])')
        if (official) {
          card.remove()
          restoreEmptyNodes()
          return
        }
        if (card.parentElement !== panel) panel.appendChild(card)
        for (const node of [...panel.children]) {
          if (node === card || node.tagName !== 'P' || hiddenEmptyNodes.has(node)) continue
          hiddenEmptyNodes.set(node, node.style.display)
          node.style.display = 'none'
        }
      }

      card.addEventListener('input', onInput)
      card.addEventListener('change', onInput)
      card.addEventListener('click', onClick)
      const unsubscribe = scope?.subscribe(render) ?? (() => {})
      if (configRemote) {
        Promise.resolve(configRemote).then(async (remote) => {
          remoteClient = remote
          const response = await remote.get()
          if (!response?.ok) throw new Error(response?.error?.message ?? response?.error?.code ?? '远程读取失败')
          remoteValue = response.value
          remoteStatus = 'ready'
          remoteError = ''
          if (!dirty) fill()
          render()
        }).catch((cause) => {
          remoteStatus = 'failed'
          remoteError = cause instanceof Error ? cause.message : String(cause)
          render()
        })
      }
      const observer = typeof MutationObserver === 'undefined' ? undefined : new MutationObserver(ensure)
      observer?.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-selected', 'hidden'] })
      fill()
      render()
      ensure()
      return () => {
        observer?.disconnect()
        unsubscribe()
        card.removeEventListener('input', onInput)
        card.removeEventListener('change', onInput)
        card.removeEventListener('click', onClick)
        card.remove()
        restoreEmptyNodes()
      }
    }

    function apply(ctx) {
      ctx.effect(() => ctx.theme.overrideTokens(PLUGIN_ID, tokens), 'bt-panel-theme: token overrides')
      ctx.effect(() => {
        if (typeof document === 'undefined' || !document.head || !document.body || typeof document.createElement !== 'function') return undefined
        const style = document.createElement('style')
        style.dataset.plugin = PLUGIN_ID
        style.dataset.pluginCss = STYLE_ID
        style.textContent = css
        document.head.appendChild(style)
        document.body.setAttribute('data-bt-panel-theme', PLUGIN_ID)
        return () => {
          if (document.body.getAttribute('data-bt-panel-theme') === PLUGIN_ID) document.body.removeAttribute('data-bt-panel-theme')
          style.remove()
        }
      }, 'bt-panel-theme: visual styles')
      const configRemote = installConfigRemote(ctx)
      ctx.effect(() => installBtPanelEmbed(ctx, configRemote), 'bt-panel-theme: embedded panel page')
      installSettingsCard(ctx, configRemote)
      ctx.effect(() => installSettingsDomFallback(ctx, configRemote), 'bt-panel-theme: settings card fallback')
    }

    exports.apply = apply
    exports.inject = ['theme', 'slots', 'connection', 'remote', 'settingsScope']
    return module.exports
  },
})
