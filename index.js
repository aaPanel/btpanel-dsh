export const name = 'bt-panel-embed'

// The root entry intentionally stays lightweight. It keeps the package enabled
// so Harness can discover the browser client; Host-side configuration and the
// same-origin embed proxy are provided by ./settings.
export function apply() {}
