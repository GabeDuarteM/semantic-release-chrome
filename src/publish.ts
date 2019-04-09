import SemanticReleaseError from '@semantic-release/error'
import AggregateError from 'aggregate-error'
import cwu from 'chrome-webstore-upload'
import { createReadStream } from 'fs-extra'

import Context from './@types/context'
import PluginConfig from './@types/pluginConfig'

const publish = async ({ extensionId, target, asset }: PluginConfig, { nextRelease: { channel } }: Context) => {
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

  if (typeof extensionId !== 'string') {
    if (!extensionId[channel]) {
      throw new SemanticReleaseError(
        "Option 'extensionId' was an object, but the current channel was not included in the publish config. Check the README.md for config info.",
        'ENOEXTENSIONID'
      )
    }
    extensionId = extensionId[channel]
  }

  const webStore = await cwu({
    clientId,
    clientSecret,
    extensionId,
    refreshToken,
  })

  const token = await webStore.fetchToken()

  const zipFile = createReadStream(asset)
  const uploadRes = await webStore.uploadExisting(zipFile, token)

  if (uploadRes.uploadState === 'FAILURE') {
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

  const publishRes = await webStore.publish(target || 'default', token)

  if (!publishRes.status.includes('OK')) {
    const errors: SemanticReleaseError[] = []
    for (let i = 0; i < publishRes.status.length; i += 1) {
      const message = publishRes.statusList[i]
      const code = publishRes.status[i]
      const err = new SemanticReleaseError(message, code)
      errors.push(err)
    }
    throw new AggregateError(errors)
  }

  return {
    name: 'Chrome Web Store',
    url: `https://chrome.google.com/webstore/detail/${extensionId}`,
  }
}

export default publish
