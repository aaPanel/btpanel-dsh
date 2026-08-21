import Schema from '@deepseek-ai/schemastery'

export const SETTINGS_NAMESPACE = 'bt-panel-theme'

function connectionFields() {
  return {
    panelUrl: Schema.string()
      .description('宝塔面板地址，例如 https://panel.example.com:8888。')
      .default(''),
    apiKey: Schema.string()
      .role('secret')
      .description('宝塔面板“API接口”中生成的 API 密钥；仅供服务端请求签名使用。')
      .default(''),
    verifySsl: Schema.boolean()
      .description('验证面板 HTTPS 证书。仅在使用自签名证书时关闭。')
      .default(true),
    timeoutMs: Schema.number()
      .min(1000)
      .max(60000)
      .step(1000)
      .description('宝塔 API 请求超时时间，单位毫秒。')
      .default(10000),
  }
}

export const SettingsConfig = Schema.object(connectionFields())

export const Config = Schema.object({
  ...connectionFields(),
  btPanel: Schema.object(connectionFields())
    .description('兼容 0.2.x 及更早版本的宝塔面板配置。'),
})

export function normalizeConfig(config = {}) {
  const legacy = config.btPanel && typeof config.btPanel === 'object' ? config.btPanel : undefined
  return {
    panelUrl: legacy?.panelUrl ?? config.panelUrl ?? '',
    apiKey: legacy?.apiKey ?? config.apiKey ?? '',
    verifySsl: legacy?.verifySsl ?? config.verifySsl ?? true,
    timeoutMs: legacy?.timeoutMs ?? config.timeoutMs ?? 10000,
  }
}
