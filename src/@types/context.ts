interface IContext {
  options?: {}
  nextRelease: { version: string }
  logger: ILogger
}

export interface ILogger {
  log: (...args: any[]) => void
  error: (...args: any[]) => void
}

export default IContext
