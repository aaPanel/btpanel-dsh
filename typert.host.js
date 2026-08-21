function strictSchema(parse) {
  return Object.freeze({
    _zod: Object.freeze({}),
    parse,
  })
}

function objectValue(value, subject) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${subject} must be an object`)
  return value
}

function stringField(value, field) {
  if (typeof value[field] !== 'string') throw new TypeError(`${field} must be a string`)
  return value[field]
}

function booleanField(value, field) {
  if (typeof value[field] !== 'boolean') throw new TypeError(`${field} must be a boolean`)
  return value[field]
}

function integerField(value, field, min, max) {
  const result = value[field]
  if (!Number.isInteger(result) || result < min || result > max) throw new TypeError(`${field} must be an integer between ${min} and ${max}`)
  return result
}

function parseConfigView(input) {
  const value = objectValue(input, 'BT Panel config response')
  return {
    panelUrl: stringField(value, 'panelUrl'),
    apiKeySet: booleanField(value, 'apiKeySet'),
    verifySsl: booleanField(value, 'verifySsl'),
    timeoutMs: integerField(value, 'timeoutMs', 1000, 60000),
  }
}

function parseConfigSave(input) {
  const value = objectValue(input, 'BT Panel config request')
  const apiKey = value.apiKey
  if (apiKey !== undefined && typeof apiKey !== 'string') throw new TypeError('apiKey must be a string')
  return {
    panelUrl: stringField(value, 'panelUrl'),
    ...(apiKey === undefined ? {} : { apiKey }),
    verifySsl: booleanField(value, 'verifySsl'),
    timeoutMs: integerField(value, 'timeoutMs', 1000, 60000),
  }
}

function parseEmbedRequest(input) {
  const value = objectValue(input, 'BT Panel embed request')
  return { origin: stringField(value, 'origin') }
}

function parseEmbedResponse(input) {
  const value = objectValue(input, 'BT Panel embed response')
  const configured = booleanField(value, 'configured')
  if (!configured) return { configured: false }
  return {
    configured: true,
    panelUrl: stringField(value, 'panelUrl'),
    directPanelUrl: stringField(value, 'directPanelUrl'),
    origin: stringField(value, 'origin'),
  }
}

const configViewSchema = strictSchema(parseConfigView)
const configSaveSchema = strictSchema(parseConfigSave)
const embedRequestSchema = strictSchema(parseEmbedRequest)
const embedResponseSchema = strictSchema(parseEmbedResponse)

const getDescriptor = {
  id: 'dsh-bt-panel-theme#btPanelThemeConfig/get',
  service: 'btPanelThemeConfig',
  namespace: 'btPanelThemeConfig',
  method: 'get',
  invocation: { kind: 'direct' },
  parameters: [],
  result: {
    mode: 'strict',
    typeSymbol: 'dsh-bt-panel-theme/config#BtPanelThemeConfigView',
    schema: configViewSchema,
  },
  sourceLocation: { file: 'settings.js', line: 31, column: 3 },
}

const saveDescriptor = {
  id: 'dsh-bt-panel-theme#btPanelThemeConfig/save',
  service: 'btPanelThemeConfig',
  namespace: 'btPanelThemeConfig',
  method: 'save',
  invocation: { kind: 'direct' },
  parameters: [{
    name: 'request',
    wire: 'request',
    source: 'json',
    codec: {
      mode: 'strict',
      typeSymbol: 'dsh-bt-panel-theme/config#BtPanelThemeConfigSave',
      schema: configSaveSchema,
    },
  }],
  result: {
    mode: 'strict',
    typeSymbol: 'dsh-bt-panel-theme/config#BtPanelThemeConfigView',
    schema: configViewSchema,
  },
  sourceLocation: { file: 'settings.js', line: 35, column: 3 },
}

const prepareEmbedDescriptor = {
  id: 'dsh-bt-panel-theme#btPanelThemeConfig/prepareEmbed',
  service: 'btPanelThemeConfig',
  namespace: 'btPanelThemeConfig',
  method: 'prepareEmbed',
  invocation: { kind: 'direct' },
  parameters: [{
    name: 'request',
    wire: 'request',
    source: 'json',
    codec: {
      mode: 'strict',
      typeSymbol: 'dsh-bt-panel-theme/config#BtPanelThemeEmbedRequest',
      schema: embedRequestSchema,
    },
  }],
  result: {
    mode: 'strict',
    typeSymbol: 'dsh-bt-panel-theme/config#BtPanelThemeEmbedResponse',
    schema: embedResponseSchema,
  },
  sourceLocation: { file: 'settings.js', line: 46, column: 3 },
}

export const TYPERT = {
  package: 'dsh-bt-panel-theme',
  face: 'host',
  schemas: [],
  invocations: [getDescriptor, saveDescriptor, prepareEmbedDescriptor],
  model: {
    services: [{
      description: 'Remote-safe BT Panel embed configuration service.',
      summary: 'Configures and prepares the embedded BT Panel session.',
      tags: [],
      jsDoc: '',
      key: 'btPanelThemeConfig',
      exportName: 'BtPanelThemeConfigService',
      members: [
        { kind: 'method', name: 'get', signature: 'get(): Promise<BtPanelThemeConfigView>', summary: 'Read redacted configuration.', jsDoc: '' },
        { kind: 'method', name: 'save', signature: 'save(request: BtPanelThemeConfigSave): Promise<BtPanelThemeConfigView>', summary: 'Validate and persist configuration.', jsDoc: '' },
        { kind: 'method', name: 'prepareEmbed', signature: 'prepareEmbed(request: BtPanelThemeEmbedRequest): Promise<BtPanelThemeEmbedResponse>', summary: 'Prepare a same-origin embedded BT Panel session.', jsDoc: '' },
      ],
      types: [],
    }],
    events: [],
    objects: [],
  },
}
