# Authentication

This package requires the following environment variables to be set:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`

Below is a step-by-step of how to get the values to correctly fill those variables:

> Note: the names you enter below don't really matter, it's an app that only you will have access to so you can just put whatever you feel comfortable with.
> Google also likes to change these screens often, so things might not be 100% up to date (you can open a pull request, if thats the case :) )

1. Visit https://console.developers.google.com/apis/credentials
1. Create a new project:

   > <img width="772" alt="Google APIs: Create project" src="https://user-images.githubusercontent.com/1402241/77865620-9a8a3680-722f-11ea-99cb-b09e5c0c11ec.png">

1. Enter a name and click `Create`. This can take some seconds, and Google will notify you when this step is done.
1. Visit https://console.cloud.google.com/apis/credentials/consent
1. Select **External** as the user type. Then click **Create**.

   > <img width="804" alt="OAuth Consent Screen" src="https://user-images.githubusercontent.com/1402241/133878019-f159f035-2b76-4686-a461-0e0005355da6.png">

1. Fill the Application name and the required email fields, and click **Save**

   > <img width="475" alt="Consent screen configuration" src="https://user-images.githubusercontent.com/1402241/77865809-82ff7d80-7230-11ea-8a96-e381d55524c5.png">

1. On the next page, the "Scopes" step, leave everything as default and click "Save & Continue".

   > <img width="400" alt="configure consent screen" src="https://user-images.githubusercontent.com/630449/109427533-0b8e1d00-79b0-11eb-98f6-e63410459892.png">

1. On the 3rd screen, click on "Add Users" and add your own email address.

   > <img width="632" alt="Test users selection" src="https://user-images.githubusercontent.com/1402241/106213510-7c180300-6192-11eb-97b4-b4ae92424bf1.png">

1. On the next page, click "Back to Dashboard".

1. Visit https://console.developers.google.com/apis/library/chromewebstore.googleapis.com
1. Enable the API, clicking on the button `Enable`:

   <img width="400" alt="chrome-apis-enable-webstore" src="https://user-images.githubusercontent.com/630449/109427423-97ec1000-79af-11eb-9451-2f53f48fbbe2.png">

1. Visit https://console.developers.google.com/apis/credentials
1. Click **Create credentials** > **OAuth client ID**:

   > <img width="771" alt="Create credentials" src="https://user-images.githubusercontent.com/1402241/77865679-e89f3a00-722f-11ea-942d-5245091f22b8.png">

   Note: If you just created a project, it might take a few minutes for "OAuth Client ID" to appear in the dropdown list. You'll need to refresh to page to see it appear.

1. On the next page, choose Application type "Desktop app" and add a name. Click "Create".

   > <img width="400" alt="client type id" src="https://user-images.githubusercontent.com/630449/109427629-7c353980-79b0-11eb-9864-357baddd3efe.png">

1. A new modal opens, with two fields, the first containing a `Client ID`, and the second containing a `Client Secret`. **Save those values,** as we are going to need them later.

   > <img width="400" alt="configure consent screen" src="https://user-images.githubusercontent.com/630449/109427660-a1c24300-79b0-11eb-9857-70328ee8f116.png">

1. Visit https://console.cloud.google.com/apis/credentials/consent
1. Click **PUBLISH APP** and confirm

   > <img width="771" alt="Publish app" src="https://user-images.githubusercontent.com/27696701/114265946-2da2a280-9a26-11eb-9567-c4e00f572500.png">

1. In the following URL, replace `<YOUR_CLIENT_ID>` with the value of your `Client ID`, and open it:

   ```sa
   https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fchromewebstore&redirect_uri=http%3A%2F%2Flocalhost%3A8818&access_type=offline&client_id=<YOUR_CLIENT_ID>
   ```

1. Follow the steps shown on the screen. If you happen to see a screen saying something like `This app isn't verified`, just click on `Advanced`, and then `Go to <App name> (unsafe)`. It only says that because the app you just created is not verified by Google, but this was created on your account and will only be used by you, so you don't really need to worry about it.

1. You will reach this error page, with a URL that looks like:

   ```
   http://localhost:8818/?code=4/0AX4XfWjwRDOZc_1nsxnupN8Xthe7dlfL0gB3pE-MMalTab0vWZBDj9ywDMacIT15U-Q&scope=https://www.googleapis.com/auth/chromewebstore
   ```

   > <img width="478" alt="A page that says 'This site can’t be reached'" src="https://user-images.githubusercontent.com/1402241/163123857-d2741237-80ea-482e-b468-ef9df75330f8.png">

1. On the URL, copy the `approval code` which is between `code=` and `&scope`, it should look like this:

   ```
   4/0AX4XfWjwRDOZc_1nsxnupN8Xt-dont-use-this-code-IT15U-Q
   ```

1. On the same page you can run this in the browser console, it's a wizard to create your `refresh_token`:
   > Do not forget to fill the three variables below on the code

```js
var clientId = 'YOUR CLIENT ID HERE' // <<<<<<<<<<<<<<<<<<<<<<
var clientSecret = 'YOUR CLIENT SECRET HERE' // <<<<<<<<<<<<<<<<<<<<<<
var authCode = 'YOUR AUTH CODE HERE' // <<<<<<<<<<<<<<<<<<<<<<

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Fill those variables above

;(async () => {
  const response = await fetch('https://accounts.google.com/o/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams([
      ['client_id', decodeURIComponent(clientId.trim())],
      ['client_secret', decodeURIComponent(clientSecret.trim())],
      ['code', decodeURIComponent(authCode.trim())],
      ['grant_type', 'authorization_code'],
      ['redirect_uri', 'http://localhost:8818'],
    ]),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const json = await response.json()
  console.log(json)
  if (!json.error) {
    if (
      typeof copy === 'function' &&
      !navigator.userAgent.includes('Firefox')
    ) {
      copy(json.refresh_token)
      alert(
        'The refresh_token has been copied into your clipboard. You’re done!',
      )
    } else {
      console.log('Copy your token:')
      console.log(json.refresh_token)
      alert('Copy your refresh_token from the console output. You’re done!')
    }
  }
})()
```

1. You should have now a `Client ID`, a `Client Secret`, and a `Refresh Token`. Use them to set the following environment values:

   - `GOOGLE_CLIENT_ID`: set the value to `Client ID`.
   - `GOOGLE_CLIENT_SECRET`: set the value to `Client Secret`
   - `GOOGLE_REFRESH_TOKEN`: set the value to `Refresh Token`

Now you should have all three environment variables correctly set. You can use the same values for all your extensions, but remember not share them publicly, as they will allow anyone to publish your extensions!

> This document was based on the [chrome-webstore-upload documentation](https://github.com/fregante/chrome-webstore-upload/blob/main/How%20to%20generate%20Google%20API%20keys.md). If there's something out of date, try checking their file, it might be more up-to-date.
