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
1. Visit the [Google API Console][api-console] again.
1. Enable the API, clicking on the button `Enable`:

   <img width="400" alt="chrome-apis-enable-webstore" src="https://cloud.githubusercontent.com/assets/1402241/21517842/2a9f36a4-cc97-11e6-8ffa-ad49ac2ca3ce.png">

1. On the page that opened, search for `Chrome Web Store API`, and enable it.

1. Open **Credentials** > **Create credentials** > **OAuth client ID**:

   <img width="400" alt="create-credentials" src="https://cloud.githubusercontent.com/assets/1402241/21517881/64f727f8-cc97-11e6-9c6b-b347b71352bf.png">

1. Click on **Configure consent screen**:

   > <img width="400" alt="configure consent screen" src="https://cloud.githubusercontent.com/assets/1402241/21517907/92640e0e-cc97-11e6-93f7-d077664eead9.png">

1. Enter a product name and save.
1. Select **Other** and click **Create**:

   > <img width="187" alt="client type id" src="https://cloud.githubusercontent.com/assets/1402241/21517952/d1f36fce-cc97-11e6-92c0-de4485d97736.png">

1. A new modal opens, with two fields, the first containing a `client ID`, and the second containing a `client secret`. Save those values, as we are going to need them later.

1. In the following URL, replace `<YOUR_CLIENT_ID>` with the value of your `client ID`, and open it:

   ```
   https://accounts.google.com/o/oauth2/auth?client_id=<YOUR_CLIENT_ID>&response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&redirect_uri=urn:ietf:wg:oauth:2.0:oob
   ```

1. Follow the steps shown on the screen and, on the last page, you will see another code which is the `auth code`. Save this value, as we will also use it later. If you happen to see a screen saying something like `This app isn't verified`, just click on `Advanced`, and then `Go to <App name> (unsafe)`. It only says that because the app you just created is not verified by Google, but in our case, it doesn't make a difference.

   > <img width="400" alt="auth code" src="https://cloud.githubusercontent.com/assets/1402241/21518094/c3033bb0-cc98-11e6-82bb-f6c69ca103fe.png">

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
