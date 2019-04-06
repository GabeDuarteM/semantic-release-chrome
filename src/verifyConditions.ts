import SemanticReleaseError from '@semantic-release/error'
import AggregateError from 'aggregate-error'

const configMessage = 'Check the README.md for config info.'

const createErrorPATH = (param: string, code: string) =>
  new SemanticReleaseError(
    `No ${param} specified inside PATH. ${configMessage}`,
    code,
  )

const verifyConditions = () => {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
  } = process.env
  const errors: Error[] = []

  if (!GOOGLE_CLIENT_ID) {
    errors.push(createErrorPATH('GOOGLE_CLIENT_ID', 'EGOOGLECLIENTID'))
  }

  if (!GOOGLE_CLIENT_SECRET) {
    errors.push(createErrorPATH('GOOGLE_CLIENT_SECRET', 'EGOOGLECLIENTSECRET'))
  }

  if (!GOOGLE_REFRESH_TOKEN) {
    errors.push(createErrorPATH('GOOGLE_REFRESH_TOKEN', 'EGOOGLEREFRESHTOKEN'))
  }

  if (errors.length > 0) {
    throw new AggregateError(errors)
  }
}

export default verifyConditions
