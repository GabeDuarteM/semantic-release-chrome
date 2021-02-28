# Authentication

This package requires the following environment variables to be set:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`

Below is a step-by-step of how to get the values to correctly fill those variables:

> Note: the names you enter below don't really matter, so you can just put whatever you feel comfortable with.

1. Visit the [Google API Console][api-console].
1. Create a new project:

   <img width="296" alt="chrome-apis-create-project" src="https://cloud.githubusercontent.com/assets/1402241/21517725/55e5c626-cc96-11e6-9b55-ec9c80e10ec4.png">

1. Enter a name and click `Create`. This can take some seconds, and Google will notify you when it's done.
1. Visit the [OAuth Consent Screen configuration page](https://console.developers.google.com/apis/credentials/consent).
1. Select "Internal" as the user type. Then click "Create".

   > <img width="400" alt="configure user type screen" src="https://user-images.githubusercontent.com/630449/109427335-30ce5b80-79af-11eb-934e-d2596e7df909.png">

   Enter an app name, user support email and developer contact information and click "Save and Continue".

   > <img width="400" alt="configure oauth screen" src="https://user-images.githubusercontent.com/630449/109427083-fdd79800-79ad-11eb-8315-69b27a58f38d.png">

   On the next page, the "Scopes" step, leave everything as default and click "Save & Continue".

   > <img width="400" alt="configure consent screen" src="https://user-images.githubusercontent.com/630449/109427533-0b8e1d00-79b0-11eb-98f6-e63410459892.png">

   On the next page, click "Back to Dashboard".

1. Visit the [Chrome Web Store API Console page][api-console].
1. Enable the API, clicking on the button `Enable`:

   <img width="400" alt="chrome-apis-enable-webstore" src="https://user-images.githubusercontent.com/630449/109427423-97ec1000-79af-11eb-9451-2f53f48fbbe2.png">

1. Click "Credentials" from the sidebar.

   <img width="400" alt="credentials link in the sidebar" src="https://user-images.githubusercontent.com/630449/109427493-e3062300-79af-11eb-8430-8e85771db1fb.png">

1. Click the "Create Credentials" dropdown and choose "Oauth Client ID".

   <img width="400" alt="create-credentials" src="https://user-images.githubusercontent.com/630449/109427565-3aa48e80-79b0-11eb-95fa-3059efbfbdc3.png">

   Note: If you just created a project, it might take a few minutes for "OAuth Client ID" to appear in the dropdown list. You'll need to refresh to page to see it appear.

1. On the next page, choose Application type "Desktop app" and add a name. Click "Create".

   > <img width="400" alt="client type id" src="https://user-images.githubusercontent.com/630449/109427629-7c353980-79b0-11eb-9864-357baddd3efe.png">

1. A new modal opens, with two fields, the first containing a `client ID`, and the second containing a `client secret`. Save those values, as we are going to need them later.

   > <img width="400" alt="configure consent screen" src="https://user-images.githubusercontent.com/630449/109427660-a1c24300-79b0-11eb-9857-70328ee8f116.png">

1. In the following URL, replace `<YOUR_CLIENT_ID>` with the value of your `client ID`, and open it:

   > https://accounts.google.com/o/oauth2/auth?client_id=<YOUR_CLIENT_ID>&response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&redirect_uri=urn:ietf:wg:oauth:2.0:oob

1. Follow the steps shown on the screen and, on the last page, you will see another code which is the `auth code`. Save this value, as we will also use it later. If you happen to see a screen saying something like `This app isn't verified`, just click on `Advanced`, and then `Go to <App name> (unsafe)`. It only says that because the app you just created is not verified by Google, but in our case, it doesn't make a difference.

   > <img width="400" alt="auth code" src="https://user-images.githubusercontent.com/630449/109427733-f960ae80-79b0-11eb-9e3a-9b2b3b102ad4.png">

1. Run this in your browser's console.
   It's just a wizard to create and copy a `curl` into your clipboard:

   ```js
   var clientId = 'YOUR CLIENT ID HERE'
   var clientSecret = 'YOUR CLIENT SECRET HERE'
   var authCode = 'YOUR AUTH CODE HERE'

   copy(
     `curl "https://accounts.google.com/o/oauth2/token" -d "client_id=${encodeURIComponent(
       clientId,
     )}&client_secret=${encodeURIComponent(
       clientSecret,
     )}&code=${encodeURIComponent(
       authCode,
     )}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob"`,
   )

   console.log('The curl has been copied. Paste it into your terminal.')
   ```

1. Paste the generated code in your terminal and run it. If your terminal doesn't natively support `curl`, try using the `git bash` terminal instead, or use [online curl](https://onlinecurl.com/). You can also [manually install curl](https://curl.haxx.se/dlwiz/), if none of options before worked.

1. The `curl` command will give you This will give you an object which looks like the following:

   <img width="400" alt="access token" src="https://cloud.githubusercontent.com/assets/1402241/21518331/9b7e3b42-cc9a-11e6-8d65-cde5ba5ea105.png">

   From this object, the only important information is the `refresh_token`, so it is important to save this value as, you guessed it, we are going to need it later.

1. You should have now a `client ID`, a `client secret`, and a `refresh_token`. Use them to set the following environment values:

   - `GOOGLE_CLIENT_ID`: set the value to `client ID`.
   - `GOOGLE_CLIENT_SECRET`: set the value to `client secret`
   - `GOOGLE_REFRESH_TOKEN`: set the value to `refresh_token`

Now you should have all three environment variables correctly set. You can use the same values for all your extensions, but remember not share them publicly, as they will allow anyone to publish your extensions!

[api-console]: https://console.developers.google.com/apis/api/chromewebstore.googleapis.com/overview
