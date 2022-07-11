# course-frontend

## 第十章 測試

### 使用 SideeX 進行測試

SideeX 是一個免費的測試工具，也可以有自己內部的測試伺服器，是個滿不錯的測試平台。

- [SideeX](https://sideex.io/)
  - [SideeX 教學文件](https://hackmd.io/@sideex/book-zh)
  - [下載](https://sideex.io/download/)

首先，到[下載](https://sideex.io/download/)頁面下載[SideeX Launcher](https://hackmd.io/@sideex/book-zh/%2F%40sideex%2Flauncher-zh) (1.1.2)

根據自己的作業系統下載對應的檔案，以 Windows 為例，下載 win_SideeX_Launcher_1.1.2.exe，下載後執行這個檔案就可以完成安裝。

#### 錄製並重播

- [錄製並重播您的第一個測試案例](https://hackmd.io/@sideex/book-zh/%2F%40sideex%2Fquickstart-zh)

先關掉 Chrome。
然後在 SideeX Launcher 按下「Start Testing」，選擇「Using Chrome」。(如果沒有關掉 Chrome，會請你關掉 Chrome)

第一次安裝會看到:
https://sideex.io/start-testing

先去「Extension Manager」，點擊「SideeX Recorder 3」，並且登入。
接下來就會看到 SideeX Recorder 的畫面了。

接下來，啟動我們的專案，確定專案已啟動後，打開我們的專案 (localhost:3000)
在 SideeX Recorder 點擊「Record」，回到 Chrome，進行操作，完成操作後，在 SideeX Recorder 點擊「Stop」，就完成錄製的動作了。

點選「Play this case」就會看到 Chrome 重新執行剛剛的動作了。

看一下錄製的內容，可以看得出來，有些內容因為我們沒有提供 name 或 id，所以，內容不容易看得懂。我們來加一下 id。

            <Button id="home" color={currentRoute==="/"?"secondary":"inherit"}><Link href="/">Home</Link></Button>
            <Button id ="product" color={currentRoute==="/product"?"secondary":"inherit"}><Link href="/product">Product</Link></Button>

另外，這邊也加一下 id。

      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon id = "addProductIcon"/>
      </Fab>

這樣，錄製的內容就比較能看得懂了!

#### 測試是否正確新增內容

我們錄製新的測試，除了輸入之外，我們看一下是否正確的新增一筆資料

利用 assertText，就可以測試內容是否出現在畫面上。

假設我們的程式有問題，測試應該就不會通過。

#### 檢視或取得網頁上的元素

在 Target 右邊可以取得、檢視網頁上的元素

#### 變數

Sideex 也可以設定變數，也可以利用 JSON 儲存的內容。

### Katalon Studio

SideeX 在某些方面還是跟 Katalon 比起來比較沒這麼完整。
Katalon Studio 也是基於 Selenium，所以，跟 Sideex 很像，只是，Katalon Studio 提供 verifyElementNotPresent，來確認刪除已成功

### 作業 使用 Sideex 產生測試，讓整個測試可以重複進行，也就是新增一筆資料，然後刪除資料，再新增兩筆資料，刪除兩筆資料。讓資料回歸到原本的狀態，方便下次的測試。
