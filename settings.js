import { Config, normalizeConfig, SETTINGS_NAMESPACE, SettingsConfig } from './config.js'
import { isPanelConfigured, validatePanelConnection } from './bt-client.js'
import { createPanelEmbedProxy, preparePanelEmbed } from './embed.js'
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'

export const name = 'bt-panel-theme-settings'
export const inject = ['webServer']
export { Config }

const remoteInitializers = []

function publicSettings(value) {
  return {
    panelUrl: value.panelUrl,
    apiKeySet: Boolean(value.apiKey),
    verifySsl: value.verifySsl,
    timeoutMs: value.timeoutMs,
  }
}

export class BtPanelThemeConfigService extends TypertRemoteService {
  constructor(ctx, scope, embedProxy) {
    super(ctx, 'btPanelThemeConfig')
    this.scope = scope
    this.embedProxy = embedProxy
    for (const initialize of remoteInitializers) initialize.call(this)
  }

  async get() {
    return publicSettings(this.scope.get())
  }

  async save(request) {
    const current = this.scope.get()
    const patch = {
      panelUrl: String(request.panelUrl ?? '').trim().replace(/\/+$/, ''),
      verifySsl: request.verifySsl !== false,
      timeoutMs: Number(request.timeoutMs),
    }
    if (typeof request.apiKey === 'string' && request.apiKey.trim()) patch.apiKey = request.apiKey.trim()
    const candidate = { ...current, ...patch }
    await validatePanelConnection(candidate)
    await this.scope.update(patch)
    return publicSettings(this.scope.get())
  }

  async prepareEmbed(request) {
    const current = this.scope.get()
    if (!isPanelConfigured(current)) return { configured: false }
    return preparePanelEmbed(current, request.origin, this.embedProxy)
  }

}

function markRemote(method) {
  Remote(method)(BtPanelThemeConfigService.prototype[method], {
    kind: 'method',
    name: method,
    static: false,
    private: false,
    addInitializer(initializer) {
      remoteInitializers.push(initializer)
    },
  })
}

markRemote('get')
markRemote('save')
markRemote('prepareEmbed')

export function apply(ctx, config) {
  const entry = normalizeConfig(config)
  ctx.inject(['settings'], (settingsCtx) => {
    const scope = settingsCtx.settings.register(SETTINGS_NAMESPACE, SettingsConfig, { base: entry })
    const embedProxy = createPanelEmbedProxy({
      webServer: settingsCtx.webServer,
      getConfig: () => scope.get(),
      logger: settingsCtx.logger,
    })
    settingsCtx.effect(() => () => embedProxy.close(), 'bt-panel-theme: embedded panel proxy')
    new BtPanelThemeConfigService(settingsCtx, scope, embedProxy)
  })
}
