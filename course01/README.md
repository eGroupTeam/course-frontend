# course-frontend
## 第一章 基本環境與開發規範
首先，先挑選並安裝你的整合開發環境(IDE)，可以使用Visual Studio Code (VS Code)。

React在開發期間是透過node.js來執行react，所以，要先安裝Node.js。
[Node.js下載](https://nodejs.org/zh-tw/download/)
Node.js本身就有Node Package Manager (npm)，另外，也有很多公司會使用yarn，因為yarn在很多方面都比較安全。在Node.js 16.0以後，已經內建Yarn，所以，不需要另外安裝yarn。建議大家下載最新的node.js(2022/6最新版本為16.15.1)。

接下來，可以透過yarn讀取next.js提供的樣板產生一個空白的專案，並且將以typescript來開發我們的專案。

要啟動yarn，在node.js 16.10之後，可以直接利用
corepack enable
來啟動，要啟動corepack，在Windows下，要先關閉VS Code，要利用管理者身分啟動VS code才能啟動corepack
否則，會看到:
Internal Error: EPERM: operation not permitted, open 'C:\Program Files\nodejs\pnpm'
Error: EPERM: operation not permitted, open 'C:\Program Files\nodejs\pnpm'

[Installation](https://yarnpkg.com/getting-started/install)

接下來，可以透過yarn讀取next.js提供的樣板產生一個空白的專案，並且將以typescript來開發我們的專案。
yarn create next-app --typescript
請參考:
[Getting Started](https://nextjs.org/docs/getting-started)

作業: 產生一個空的next.js專案，並確認可以執行。