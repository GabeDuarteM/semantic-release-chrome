<div align="center">
  <h1>semantic-release-chrome</h1>

  <p>Set of semantic-release plugins for publishing a Chrome extension release</p>
</div>

<hr />

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```bash
npm install --save-dev semantic-release-chrome
```

## Description

This package provides a set of [`semantic-release`][semantic-release] plugins for you to easily publish Chrome extensions automatically.
Besides creating a release on the Chrome webstore, it also writes the correct version to the `manifest.json` and creates a zip file containing everything inside the dist folder, so you can use the official `@semantic-release/github` plugin and upload the release to the GitHub releases page, so your users can easily rollback to an earlier version if a newer one introduces a bad bug.

## Usage

This package export the following plugins:

### `verifyConditions`

Verify the presence of the authentication parameters, which are set via environment variables (see [Chrome webstore authentication][chrome-authentication]).

### `prepare`

Writes the correct version to the `manifest.json` and creates a `zip` file with everything inside the `dist` folder.

This plugin requires some parameters to be set, so be sure to check below and fill them accordingly.

#### `prepare` parameters

- `asset`: **REQUIRED** parameter. The filename of the zip file.

- `distFolder`: The folder that will be zipped. Defaults to `dist`.

- `manifestPath`: The path of the `manifest.json` file inside the dist folder. Defaults to `<distFolder parameter>/manifest.json`.

### `publish`

Uploads the generated zip file to the webstore and publishes a new release.

#### `publish` parameters

- `extensionId`: **REQUIRED** parameter. The `extension id` from the webstore. For example: If the url of your extension is [https://chrome.google.com/webstore/detail/webplayer-hotkeys-shortcu/ikmkicnmahfdilneilgibeppbnolgkaf](https://chrome.google.com/webstore/detail/webplayer-hotkeys-shortcu/ikmkicnmahfdilneilgibeppbnolgkaf), then the last portion, `ikmkicnmahfdilneilgibeppbnolgkaf`, will be the `extension id`. You can also take this ID on the [developers dashboard](https://chrome.google.com/webstore/developer/dashboard), under the name `Item ID` located inside the `More info` dialog.

  Unfortunately, due to Google's restrictions, this plugin can only publish extensions that already exists on the store, so you will have to at least make a draft release for yourself, so the plugin can create a proper release for the first time. You can create a draft release with just a minimum `manifest.json` with version `0.0.1` compressed in a zip file.

  If you decide to make the draft, make sure to fill all the required fields on the drafts page, otherwise the publishing will fail with a `400` status code (Bad request).

- `asset`: **REQUIRED** parameter. The zip file that will be published to the chrome webstore.

- `target`: can be `default` or `trustedTesters`. When released using the first, the extension will be publicly available to everyone. When `trustedTesters` is used, it will be released as a [private extension](https://support.google.com/chrome/a/answer/2663860). Defaults to `default`.

### Chrome webstore authentication

You will need to get three parameters from the Google API: a `clientId`, a `clientSecret` and a `refreshToken`. For more information on how to get those parameters and how to set the environment variables which are required in order for this plugin to work properly, read [this guide](Authentication.md).

### Release configs

Use `semantic-release-chrome` as part of `verifyConditions`, `prepare` and `publish`.

A basic configuration file example is available below:

```json
{
  "verifyConditions": ["semantic-release-chrome", "@semantic-release/github"],
  "prepare": [
    {
      "path": "semantic-release-chrome",
      "asset": "my-extension.zip"
    }
  ],
  "publish": [
    {
      "path": "semantic-release-chrome",
      "asset": "my-extension.zip",
      "extensionId": "mppjhhbajcciljocgbadbhbgphjfdmhj"
    },
    {
      "path": "@semantic-release/github",
      "assets": [
        {
          "path": "my-extension.zip"
        }
      ]
    }
  ]
}
```

For more info about each config, see the parameters for each [plugin](#usage).

For more info on the configuration file, see the [configuration file][configuration-file] documentation on the [`semantic-release`][semantic-release] repository.

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/com/GabrielDuarteM/semantic-release-chrome/master.svg?style=flat-square
[build]: https://travis-ci.com/GabrielDuarteM/semantic-release-chrome
[coverage-badge]: https://img.shields.io/codecov/c/github/GabrielDuarteM/semantic-release-chrome.svg?style=flat-square
[build-badge]: https://github.com/GabrielDuarteM/semantic-release-chrome/workflows/Node%20CI/badge.svg
[build]: https://github.com/GabrielDuarteM/semantic-release-chrome/actions
[coverage]: https://codecov.io/github/GabrielDuarteM/semantic-release-chrome
[version-badge]: https://img.shields.io/npm/v/semantic-release-chrome.svg?style=flat-square
[package]: https://www.npmjs.com/package/semantic-release-chrome
[downloads-badge]: https://img.shields.io/npm/dm/semantic-release-chrome.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/semantic-release-chrome
[license-badge]: https://img.shields.io/github/license/GabrielDuarteM/semantic-release-chrome.svg?style=flat-square
[license]: https://github.com/GabrielDuarteM/semantic-release-chrome/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/GabrielDuarteM/semantic-release-chrome/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/GabrielDuarteM/semantic-release-chrome.svg?style=social
[github-watch]: https://github.com/GabrielDuarteM/semantic-release-chrome/watchers
[github-star-badge]: https://img.shields.io/github/stars/GabrielDuarteM/semantic-release-chrome.svg?style=social
[github-star]: https://github.com/GabrielDuarteM/semantic-release-chrome/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20semantic-release-chrome%20by%20%40GabrielDuarteM%20https%3A%2F%2Fgithub.com%2FGabrielDuarteM%2Fsemantic-release-chrome%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/GabrielDuarteM/semantic-release-chrome.svg?style=social
[semantic-release]: https://github.com/semantic-release/semantic-release
[chrome-authentication]: #chrome-webstore-authentication
[configuration-file]: https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration-file
