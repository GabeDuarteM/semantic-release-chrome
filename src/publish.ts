import SemanticReleaseError from '@semantic-release/error'
import { createReadStream } from 'fs-extra'
import { Context } from 'semantic-release'

import type PluginConfig from './@types/pluginConfig'
import getEsModule from './getEsModule'

const errorWhitelist = ['PUBLISHED_WITH_FRICTION_WARNING']

const publish = async (
  { extensionId, target, asset }: PluginConfig,
  { logger }: Context,
) => {
  const {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    GOOGLE_REFRESH_TOKEN: refreshToken,
  } = process.env

  if (!extensionId) {
    throw new SemanticReleaseError(
      "Option 'extensionId' was not included in the publish config. Check the README.md for config info.",
      'ENOEXTENSIONID',
    )
  }

  if (!asset) {
    throw new SemanticReleaseError(
      "Option 'asset' was not included in the publish config. Check the README.md for config info.",
      'ENOASSET',
    )
  }

  const chromeWebstoreUpload = (await getEsModule(
    'chrome-webstore-upload',
  )) as typeof import('chrome-webstore-upload')['default']

  const webStore = (await chromeWebstoreUpload({
    clientId,
    clientSecret,
    extensionId,
    refreshToken,
  })) as typeof import('chrome-webstore-upload')['default']

  logger.log('Creating zip file...')

  const zipFile = createReadStream(asset)
  const errorMessage = `

  [ERROR] Semantic Release Chrome

  Unfortunately we can't tell for sure what's the reason for that, but usually this happens when there's something wrong or missing with the configs.
  Make sure to check:

  * The extensionId is correctly set on the plugin config
  * The environment variables GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN are correctly set (Double check the authentication guide: https://github.com/GabrielDuarteM/semantic-release-chrome/blob/master/Authentication.md)
  * Go to https://chrome.google.com/webstore/devconsole, click on the extension you are publishing, and verify that there's no errors there (for example, on the "Why can't I submit" button modal, or on any of the other tabs there)

`
  let uploadRes

  logger.log('Uploading zip file to Google Web Store...')
  try {
    uploadRes = await webStore.uploadExisting(zipFile)
  } catch (err) {
    throw new SemanticReleaseError(
      `Error uploading extension to Google Web Store. ${errorMessage}  Error details:\n\n${err}`,
      err as string,
    )
  }

  const AggregateError = (await getEsModule(
    'aggregate-error',
  )) as typeof import('aggregate-error')['default']

  if (uploadRes?.uploadState === 'FAILURE') {
    const errors: SemanticReleaseError[] = []

    uploadRes.itemError.forEach((err: any) => {
      const semanticError = new SemanticReleaseError(
        err.error_detail,
        err.error_code,
      )

      errors.push(semanticError)
    })

    throw new AggregateError(errors)
  }

  logger.log(`Successfully uploaded extension to Google Web Store`)

  if (target !== 'draft') {
    logger.log('Publishing extension to Google Web Store...')

    let publishRes

    try {
      publishRes = await webStore.publish(target || 'default')
    } catch (err) {
      throw new SemanticReleaseError(
        err as string,
        `Error publishing extension to Google Web Store. ${errorMessage}  Error details:\n\n`,
      )
    }

    if (!publishRes?.status.includes('OK')) {
      const errors: SemanticReleaseError[] = []

      for (let i = 0; i < publishRes.status.length; i += 1) {
        const code = publishRes.status[i]
        const message = publishRes.statusDetail[i]

        if (errorWhitelist.includes(code)) {
          logger.log(`${code}: ${message}`)
        } else {
          const err = new SemanticReleaseError(message, code)

          errors.push(err)
        }
      }

      if (errors.length > 0) {
        throw new AggregateError(errors)
      }
    }

    logger.log(`Successfully published extension to Google Web Store`)
  } else {
    logger.log(`Target option is set to "draft", skipping publish step`)
  }

  return {
    name: 'Chrome Web Store',
    url: `https://chrome.google.com/webstore/detail/${extensionId}`,
  }
}

export default publish
