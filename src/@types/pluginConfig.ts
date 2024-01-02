interface PluginConfig {
  manifestPath: string
  distFolder: string
  asset: string
  extensionId: string
  target: 'default' | 'trustedTesters' | 'draft' | 'local'
  allowPrerelease?: string
}

export default PluginConfig
