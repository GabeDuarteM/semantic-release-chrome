declare module '@semantic-release/error' {
  class SemanticReleaseError extends Error {
    public code?: string
    public details?: string
    constructor(message?: string, code?: string, details?: string)
  }

  export = SemanticReleaseError
}
