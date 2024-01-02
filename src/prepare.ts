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
  logger: Context['logger'],
) => {
  const manifest = readJsonSync(manifestPath)

  writeJsonSync(manifestPath, { ...manifest, version }, { spaces: 2 })

  logger.log('Wrote version %s to %s', version, manifestPath)
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

/**
 * Attempts to parse a semantic version number from a pre-release version string.
 * 
 * Context:
 * The semantic-release package will provide a version string such as '1.0.0-develop.1' when using the 
 * pre-release functionality. This function will parse out the semantic version number '1.0.0' from this
 * string, so that the version will adhere to the chrome web store's version format requirement.
 * 
 * @param prereleaseVersion pre-release version string from which to parse the semantic version number
 * @returns semantic version number parsed from prereleaseVersion input. throws error if unable to parse
 */
export const parsePrereleaseVersion = (prereleaseVersion: string) => {
  const versionMatch = prereleaseVersion?.match(/\d+\.\d+\.\d+/)
  if (!versionMatch) {
      throw new SemanticReleaseError(
        'Could not parse semantic version number from pre-release version',
      )
  }
  return versionMatch[0]
}

const prepare = (
  { manifestPath, distFolder, asset, allowPrerelease }: PluginConfig,
  { nextRelease, logger, lastRelease, branch, commits }: Context,
) => {
  if (!asset) {
    throw new SemanticReleaseError(
      "Option 'asset' was not included in the prepare config. Check the README.md for config info.",
      'ENOASSET',
    )
  }

  const nextReleaseVersion = nextRelease?.version
  if (!nextReleaseVersion) {
    throw new SemanticReleaseError(
      'Could not determine the version from semantic release.',
    )
  }
  const version = allowPrerelease ? parsePrereleaseVersion(nextReleaseVersion) : nextReleaseVersion

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
    logger,
  )
  zipFolder(compiledAssetString, normalizedDistFolder, logger)
}

export default prepare
