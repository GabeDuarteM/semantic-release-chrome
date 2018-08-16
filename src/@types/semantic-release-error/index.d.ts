declare module "@semantic-release/error" {
  export default class SemanticReleaseError extends Error {
    constructor(message: string, code: string, details?: string)
  }
}
