# course-frontend

## 第十五章 google 登入

### 設定

要使用 google 登入，首先，先建立專案，建立之後，要先設定 OAuth 同意畫面，設定為「外部使用者」，讓所有擁有 google 帳號的人都可以使用。接下來會填寫一些資料，只要留必要資料就可以了。

接下來，要建立憑證，選擇「OAuth 用戶端 ID」/「OAuth client ID」，應用程式類型，選擇「網頁」，並輸入應用程式名稱

接下來就會產生
id:
552309206082-24i112jigc6gv0ptaik2meqomm7fqk9t.apps.googleusercontent.com
secret:
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

這樣就取得了 id 及密碼

接下來，先安裝 next 的相關套件，這樣就可以控制 next 頁面的存取

yarn add next-auth

接下來，修改一下\_app.js，使用 next-auth 利用 context 所產生的 session。我們就可以利用這個來替代以前使用的 context 或 redux。

    import { SessionProvider } from "next-auth/react";

    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>

在 pages/api 底下，產生一個 auth 的檔案夾，並產生[...nextauth].tsx，所有針對/api/auth/\* (如:signIn, callback, signOut)的 request 都被這個程式處理，所以，不必再新增 signIn 的對應程式碼。

process.env.GOOGLE_ID 就是去讀取.env 裡定義的值，process.env.GOOGLE_SECRET 也是，因為這兩個值可能不存在，typescript 就會一直警告，所以，利用「??=」去設定萬一前面的值，不存在，就用空字串取代。

    import NextAuth, { NextAuthOptions } from "next-auth"
    import GoogleProvider from "next-auth/providers/google"

    export const authOptions: NextAuthOptions = {
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID??="",
          clientSecret: process.env.GOOGLE_SECRET??=""
        })
      ],
      theme: {
        colorScheme: "light",
      },
      callbacks: {
        async jwt({ token }) {
          token.userRole = "admin"
          return token
        },
      },
    }

接下來，在最上層的檔案夾(my-app)下產生一個.env.local 要把剛剛取得的 id 及 secret 放到裡面

GOOGLE_ID=XXX
GOOGLE_SECRET=XXX
NEXTAUTH_SECRET=XXX
NEXTAUTH_URL=http://localhost:3000

另外，到這個[secret key 產生網站](https://generate-secret.now.sh/32)去產生一個 secret key 指定給 NEXTAUTH_SECRET

不然就會一直有 NO_SECRET 的警告

      [next-auth][warn][NO_SECRET]

### 檢查是否已登入

如前面的說明，每一頁都可以取得 session，取得的方式就如同前面的 useContext()一樣，我們可以透過 NextAuth 提供的 useSession()取得登入的資料。

    import { useSession } from 'next-auth/react'

    const {data:session} = useSession();
    console.log("session",session);

### 登入

如果得到: redirect_uri_mismatch，那就是在設定憑證時，在「已授權的 JavaScript 來源」中沒有把放進去，問題來了，因為我們都是在 localhost 上執行，google 為了資訊安全，會擋掉 localhost。那怎麼辦呢?

這時候就要搬出一個神器: ngrok，免費版的 ngrok 雖然有很多限制，但是，對於開發測試而言，夠用了。

- [ngrok](https://ngrok.com/)
- [[Day-37] 使用 ngrok 讓外網連接你的 API](https://ithelp.ithome.com.tw/articles/10197345)

先下載 ngrok，並且登入帳號，取得 token，透過指令設定 token (XXX 就是 ngrok 提供的 token)

ngrok authtoken XXXX

然後，啟動 ngrok，要記得，我們是使用 port3000。

ngrok http 3000

先利用 ngrok 產生一個臨時的網址，回到[憑證管理](https://console.cloud.google.com/apis/credentials)

這時候去使用這個臨時的網址來打開我們的系統，注意，chrome 會一直告訴我們，這是個不安全的網頁，想想看，任何人都可以架一個網站，的確是不安全的。

要記得.env.local 裡的 NEXTAUTH_URL 也要修改，否則會有問題。

利用 google 登入後，就可以在 index.js 中看到 session 裡已取得登入者的 email、image 及 name 了!

-[NextAuth 官方文件](https://next-auth.js.org/getting-started/introduction)

- [NextAuth.js Example App](https://github.com/nextauthjs/next-auth-example)

- [How to create a Google App for Social Connect](https://www.cozmoslabs.com/docs/profile-builder-2/add-ons/social-connect/create-google-app-social-connect/)
- [建立憑證](https://console.cloud.google.com/apis/credentials)

- [Migrating a React app to the new Google Sign-In library](https://www.dolthub.com/blog/2022-05-04-google-signin-migration/)
- [Adventures in Google Login OIDC / OAuth2 with React and Spring](https://medium.com/@johndbro1/adventures-in-google-login-oidc-oauth2-with-react-and-spring-370c1fd706c2)
  -- [react-google-login 錯誤](https://ithelp.ithome.com.tw/questions/10208737)
  -- [Integrating Google Sign-In into your web app](https://developers.google.com/identity/sign-in/web/sign-in)

- [Spring Security 5 – OAuth2 Login](https://www.baeldung.com/spring-security-5-oauth2-login)

- [Migrating a React app to the new Google Sign-In library](https://www.dolthub.com/blog/2022-05-04-google-signin-migration/)
- [Adventures in Google Login OIDC / OAuth2 with React and Spring](https://medium.com/@johndbro1/adventures-in-google-login-oidc-oauth2-with-react-and-spring-370c1fd706c2)
  -- [react-google-login 錯誤](https://ithelp.ithome.com.tw/questions/10208737)
  -- [Integrating Google Sign-In into your web app](https://developers.google.com/identity/sign-in/web/sign-in)

- [Spring Security 5 – OAuth2 Login](https://www.baeldung.com/spring-security-5-oauth2-login)
