type LoggerFunction = (...message: any[]) => void

export interface Logger {
  await: LoggerFunction
  complete: LoggerFunction
  debug: LoggerFunction
  error: LoggerFunction
  fatal: LoggerFunction
  fav: LoggerFunction
  info: LoggerFunction
  log: LoggerFunction
  note: LoggerFunction
  pause: LoggerFunction
  pending: LoggerFunction
  star: LoggerFunction
  start: LoggerFunction
  success: LoggerFunction
  wait: LoggerFunction
  warn: LoggerFunction
  watch: LoggerFunction
}

declare module 'semantic-release' {
  interface Context {
    branch: {
      channel: string | undefined
      tags: unknown[]
      type: string
      name: string
      range: string
      accept: string[]
      main: boolean
    }
  }
}
