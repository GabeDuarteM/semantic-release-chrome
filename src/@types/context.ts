interface Context {
  options?: {}
  nextRelease: { version: string }
  logger: Logger
}

export interface Logger {
  log: (...args: any[]) => void
  error: (...args: any[]) => void
}

export default Context
