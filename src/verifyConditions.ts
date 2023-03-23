import SemanticReleaseError from '@semantic-release/error'
import { Context } from 'semantic-release'
import PluginConfig from './@types/pluginConfig'
import getEsModule from './getEsModule'

const configMessage = 'Check the README.md for config info.'

const createErrorEnvFile = (param: string, code: string) =>
  new SemanticReleaseError(
    `Environment variable not found: ${param}. ${configMessage}`,
    code,
  )

const verifyConditions = async (
  { extensionId, target }: PluginConfig,
  { logger }: Context,
) => {
  if (target === 'local') {
    logger.log('Target option is set to "local". Skipping verification of Chrome store credentials.')
    return
  }

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } =
    process.env
  const errors: Error[] = []

  if (!GOOGLE_CLIENT_ID) {
    errors.push(createErrorEnvFile('GOOGLE_CLIENT_ID', 'EGOOGLECLIENTID'))
  }

  if (!GOOGLE_CLIENT_SECRET) {
    errors.push(
      createErrorEnvFile('GOOGLE_CLIENT_SECRET', 'EGOOGLECLIENTSECRET'),
    )
  }

  if (!GOOGLE_REFRESH_TOKEN) {
    errors.push(
      createErrorEnvFile('GOOGLE_REFRESH_TOKEN', 'EGOOGLEREFRESHTOKEN'),
    )
  }

  if (!extensionId) {
    errors.push(
      new SemanticReleaseError(
        "Option 'extensionId' was not included in the verifyConditions config. Check the README.md for config info.",
        'ENOEXTENSIONID',
      ),
    )
  }

  if (errors.length > 0) {
    const AggregateError = (await getEsModule(
      'aggregate-error',
    )) as typeof import('aggregate-error')['default']

    throw new AggregateError(errors)
  }

  const chromeWebstoreUpload = (await getEsModule(
    'chrome-webstore-upload',
  )) as typeof import('chrome-webstore-upload')['default']

  const webStore = await chromeWebstoreUpload({
    extensionId,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GOOGLE_REFRESH_TOKEN,
  })

  let mainErrorMsg: string | undefined

  try {
    logger.log('Verifying chrome webstore credentials...')
    await webStore.get()
    logger.log('Chrome webstore credentials seem to be valid.')
  } catch (e) {
    mainErrorMsg =
      '\n[semantic-release-chrome] Could not connect to Chrome Web Store with the provided credentials. Please check if they are correct.'
    throw new Error(mainErrorMsg)
  }
}

export default verifyConditions
