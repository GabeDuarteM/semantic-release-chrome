# semantic-release-chrome

[![travis](https://img.shields.io/travis/GabrielDuarteM/semantic-release-chrome/master.svg)](https://travis-ci.org/GabrielDuarteM/semantic-release-chrome)
[![npm version](https://img.shields.io/npm/v/semantic-release-chrome.svg)](https://www.npmjs.com/package/semantic-release-chrome)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A [`semantic-release`](https://github.com/semantic-release/semantic-release) plugin for you to be able to easily publish Chrome Extensions using it's automated release.

## Plugins

## verifyConditions

Verify the presence of the authentication (set via environment variables).

### verifyConditions parameters

None.

## prepare

Write the correct version to the `manifest.json` and creates a zip file of the whole dist folder.

### prepare parameters

asset: **REQUIRED** parameter. The filename of the final zip file.

distFolder: The folder that will be zipped. Defaults to `dist`.

manifestPath: The path of the manifest inside the dist folder. Defaults to `<distFolder parameter>/manifest.json`.

## publish

Uploads the generated zip file to the webstore, and publish the item.

### publish parameters

extensionId: **REQUIRED** parameter. The extension id from the webstore. For example: If the url of your extension is [https://chrome.google.com/webstore/detail/webplayer-hotkeys-shortcu/ikmkicnmahfdilneilgibeppbnolgkaf](https://chrome.google.com/webstore/detail/webplayer-hotkeys-shortcu/ikmkicnmahfdilneilgibeppbnolgkaf), then the last portion, `ikmkicnmahfdilneilgibeppbnolgkaf`, will be the extension id. Unfortunately, due to google's restrictions, the plugin can only publish extensions that already exists on the store, so you will have to upload it manually the first time you release.

asset: **REQUIRED** parameter. The zip file that will be published to the chrome webstore.

target: can be `default` or `trustedTesters`. When released using the first, the extension will be publicly available to everyone. when `trustedTesters` is used, it will be released as a [private extension](https://support.google.com/chrome/a/answer/2663860). Defaults to `default`.

## Configuration

### Chrome webstore authentication

You will need a Google API `clientId`, a `clientSecret` and a `refreshToken`. Read [the guide.](Authentication.md).

The Chrome webstore authentication configuration is required and can be set via environment variables.

The following environment variables has to be made available in your CI environment: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`.

### Release configs

Use `semantic-release-chrome` as part of `verifyConditions`, `prepare` and `publish`.

A basic config file example is available below:

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

For more info about each config, see the parameters for each [plugin](#plugins).

It is recommended to upload this to your GitHub release page so your users can easily rollback to an earlier version if a version ever introduces a bad bug.
