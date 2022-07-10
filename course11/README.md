# course-frontend

## 第十一章 存取 API

### postman mock server

開發前端的人常有一個問題，開發後端的人可以利用 postman 先測試自己的 API 是否有問題，其實，開發前端的人也可以利用 postman 測試嗎，所使用的功能是 mock server，透過 mock server 去設定假的 API。

- [Setting up mock servers](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/)
- [如何用 Postman Mock Server 快速建立 API Server](https://www.letswrite.tw/postman-mock-server/)
- [[面試][後端]在正式 API 完成前，如何讓要串接的工程師不要空等？](https://ithelp.ithome.com.tw/articles/10267680) / [讓你的 Postman 更專業 — Mock Server & Environments & Publish API doc](https://medium.com/dean-lin/%E8%AE%93%E4%BD%A0%E7%9A%84-postman-%E6%9B%B4%E5%B0%88%E6%A5%AD-mock-server-environments-publish-api-doc-afc5c04742e0) (同作者/內容也相同)

首先，先[下載](https://www.postman.com/downloads/)[postman](https://www.postman.com/)，並且註冊帳號。

#### 建立 Mock Server

接下來，點選「Mock Servers」分頁，當我們沒有任何 Mock Servers 時，可以點選「Create Mock Server」。

Postman 可以讓我們透過現有的 API 去產生 Mock Server，不過，當我們沒有現有的 API 的時候，就是選擇「Create a new collection」，接下來，在「Request URL」裡填寫 product，點選「Next」。

輸入 Mock Server 的名字(如:egroup mock server)，並勾選「Sace Mock server URL as an environment variable」的選項。並點選「Create mock server」。

接下來便可以在「Mock Servers」分頁中看到剛剛建立的 Mock Server，點進去後能看到這個 Mock Sever 的網址。

#### 設計 response

在「Collections」的分頁就可以看到我們剛剛建立的 Mock Server (egroup mock server)，以及剛剛產生的 request (product)。
在 request 下面有一個「Default」，這裡就是用來填寫假資料的 example，在下方點選「Body」(不是上面的空白處)，點選「Pretty」，格式選擇「JSON」，在下面我們用 JSON 格式寫個簡單的 response 範例後按「Save」。

    [
      {"desc":"iPad", "price":20000},
      {"desc":"iPhone X", "price":30000}
    ]

這樣，我們就產生一個 response 了! 很簡單吧! 回到 request，點選「Send」就可以收到剛剛寫的內容了!

### 在 react 裡呼叫 API

在 javascript 中，可以利用 axios 的 get 去呼叫 API (詳參: [How To Use Axios With React: The Definitive Guide (2021)](https://www.freecodecamp.org/news/how-to-use-axios-with-react/))

使用 axios 前要先安裝 axios:

    yarn add axios

因為要等待 API 資料回傳，很多範例都使用.then()，不過，現在都會使用 async/await。所以，在 axios.get()前，加了 await，在 await 後的指令就會等待資料回傳後才會繼續執行。(詳參: [鐵人賽：JavaScript Await 與 Async](https://www.casper.tw/javascript/2017/12/30/javascript-async-await/))

    import axios from 'axios';

      useEffect(() => {
        async function fetchData () {
          const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
          console.log(result);
        }
        fetchData();
      },[]);

如果要取得自己的 mock server 的 response，要將 url 改成你們自己的 url
接下來，將內容放進 products:

    useEffect(() => {
      async function fetchData () {
        const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
        console.log(result.data);
        setProducts(result.data);
      }
      fetchData();
    },[]);

改一下 mock server 裡的資料，就可以確認資料確實是從 mock server 取得。

注意，目前只是讀一次，並不會讀取新資料，未來在前後端串連之後，這邊的程式要修改。

mock server 可以新增 get、post、put、delete 等服務，可以在 mock server 上看 Mock Server Call Log，可以看到是否有效的送出資料。

我們可以修改 ProductCreate.tsx，對 mock server 送出 post request。

    await axios.post("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product",product);

但是，畢竟是 mock server，跟真實的服務還是有差距。是無法在新增資料後可以從 mock server 上看到剛剛新增或修改的資料。

### 作業:在 mock server 裡讓產品增加一個欄位:庫存量 (stock)，並修改程式，試試看是否能順利取得。
