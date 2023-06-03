# course-frontend

## 第一章 基本環境與開發規範

首先，先挑選並安裝你的整合開發環境(IDE)，可以使用 Visual Studio Code (VS Code)。

React 在開發期間是透過 node.js 來執行 react，所以，要先安裝 Node.js。

- [Node.js 下載](https://nodejs.org/zh-tw/download/)

如果使用 macOS，建議利用 Homebrew 安裝 Node.js。

Node.js 本身就有 Node Package Manager (npm)，另外，也有很多公司會使用 yarn，因為 yarn 在很多方面都比較安全。在 Node.js 16.0 以後，已經內建 Yarn，所以，不需要另外安裝 yarn。建議大家下載最新的 node.js(2022/6 最新版本為 16.15.1)。

要啟動 yarn，在 node.js 16.10 之後，可以直接利用
corepack enable 來啟動，要啟動 corepack，在 Windows 下，要先關閉 VS Code，要利用管理者身分啟動 VS code 才能啟動 corepack
否則，會看到:
Internal Error: EPERM: operation not permitted, open 'C:\Program Files\nodejs\pnpm'
Error: EPERM: operation not permitted, open 'C:\Program Files\nodejs\pnpm'

- [Installation](https://yarnpkg.com/getting-started/install)
- [yarn cli](https://yarnpkg.com/cli/install)

接下來，可以透過 yarn 讀取 next.js 提供的樣板產生一個空白的專案，並且將以 typescript 來開發我們的專案。

yarn create next-app --typescript

Next.js 是個基於 react 的框架，採用 react 的語法，但是有些設定是跟 react 不太一樣。Typescript 就是加了 Type 的 javascript。語法跟 Javascript 差不多，下個章節會介紹 typescript 的語法，不過，我們假設各位已經對 javascript 語法已經有些基本的了解，所以，只會介紹 typescript 與 javascript 不同之處。

請參考:

- [Getting Started](https://nextjs.org/docs/getting-started)

注意，未來如果 clone 老師的範例，因為老師並沒有上傳 node_modules 上去，各位要先執行 yarn install，這時候 yarn 會產生 node_modules，並根據 package.json 去下載用到的套件到 node_modules，下載後才能執行 yarn dev。yarn dev 不是 yarn 的內建指令，而是去執行 package.json 裡 script 底下 dev 對應的 script，啟動 node.js 來執行我們的 react 專案。

作業: 產生一個空的 next.js 專案，並確認可以執行。
young 測試 push to github
