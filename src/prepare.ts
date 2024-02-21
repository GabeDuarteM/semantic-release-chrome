import SemanticReleaseError from '@semantic-release/error'
import archiver from 'archiver'
import { readJsonSync, writeJsonSync } from 'fs-extra'
import template from 'lodash.template'

import { createWriteStream } from 'fs'
import { resolve } from 'path'

import type PluginConfig from './@types/pluginConfig'
import { Context } from 'semantic-release'

const prepareManifest = (
  manifestPath: string,
  version: string,
  versionName: string,
  logger: Context['logger'],
) => {
  const manifest = readJsonSync(manifestPath)

  writeJsonSync(
    manifestPath,
    { ...manifest, version, versionName },
    { spaces: 2 },
  )

  logger.log('Wrote version %s to %s', version, manifestPath)
  logger.log('Wrote version_name %s to %s', versionName, manifestPath)
}

const zipFolder = (
  asset: string,
  distFolder: string,
  logger: Context['logger'],
) => {
  const zipPath = resolve(asset)
  const output = createWriteStream(zipPath)
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  archive.pipe(output)

  archive.directory(distFolder, false)
  archive.finalize()

  logger.log('Wrote zipped file to %s', zipPath)
}

const findLastNumericPart = (preRelease?: string) => {
  const parts = preRelease?.split('.') || []
  return parts.reverse().find((part) => part.match(/^[0-9]+$/))
}

export const formatExtensionVersion = (version?: string) => {
  const semanticVersionRegExp =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  const versionMatch = version?.match(semanticVersionRegExp)

  if (!versionMatch) {
    throw new SemanticReleaseError(
      'Version does not fit semantic version format',
    )
  }

  const [, major, minor, patch, preRelease] = versionMatch

  return [major, minor, patch, findLastNumericPart(preRelease)]
    .filter(Boolean)
    .join('.')
}

const prepare = (
  { manifestPath, distFolder, asset }: PluginConfig,
  { nextRelease, logger, lastRelease, branch, commits }: Context,
) => {
  if (!asset) {
    throw new SemanticReleaseError(
      "Option 'asset' was not included in the prepare config. Check the README.md for config info.",
      'ENOASSET',
    )
  }

  const version = formatExtensionVersion(nextRelease?.version)
  const versionName = nextRelease?.version

  if (!version || !versionName) {
    throw new SemanticReleaseError(
      'Could not determine the version from semantic release.',
    )
  }

  const normalizedDistFolder = distFolder || 'dist'

  const compiledAssetString = template(asset)({
    branch,
    lastRelease,
    nextRelease,
    commits,
  })

  prepareManifest(
    manifestPath || `${normalizedDistFolder}/manifest.json`,
    version,
    versionName,
    logger,
  )
  zipFolder(compiledAssetString, normalizedDistFolder, logger)
}

export default prepare
