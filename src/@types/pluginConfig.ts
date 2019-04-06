interface PluginConfig {
  manifestPath: string
  distFolder: string
  asset: string
  extensionId: string
  target: 'default' | 'trustedTesters'
}

export default PluginConfig
