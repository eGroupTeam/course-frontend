# course-frontend
## 第三章 React基礎1: 元件基本生命週期
### 元件
Next.js跟react不一樣的是系統預設直接讀取在pages裡的index.tsx(typescript)，而且，所有pages的檔案都可以直接讀取。

我們先產生一個新的頁面hello.tsx，再回頭看一下index.tsx。

React的元件有兩種形式: Class Component、Functional Component。過去是以Class Component的方式開發，在react 16.8之後，新增了React Hooks，讓Functional Component可以跟Class Component一樣，可以使用state變數。因為Functional Component使用state變數的方式相對精簡，使得Functional Component的開發方式逐漸成為主要的選項。所以，我們只介紹Functional Component。

在react裡，我們盡量把程式切割為不同的元件，利用元件的切割，讓程式碼可以重複使用，也避免讓元件過於複雜、難以理解。

要怎麼產生一個元件呢? 首先，先定義一個function，這個function。


    function HelloPage() {
      return (
        <div>
            <h1>Hello World!</h1>
        </div>
      )
    }

    export default HelloPage


如果沒有最後的export default HelloPage，就會有以下的錯誤訊息:

'hello.tsx' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.ts(1208)

簡單的說這個程式就不是個元件。

利用yarn dev啟動這個專案後，在網頁輸入

    localhost:3000/hello

網頁就會去執行這個function，function就會回傳內容，內容跟HTML很類似，但是，事實上內容是JSX (Javascript Extension)，也就是以HTML方式撰寫的javascript。

雖然可以使用function的方式寫，但是，在javascript中，利用function定義有個缺點就是function可以重複定義，所以，一般都改用function expression。不過，typescript不允許function重複定義，所以，其實，差別就不大，只是，大家已經習慣利用。

    const HelloPage = function () {

從ES6開始，定義函數有個新的語法，因為定義時利用「=>」，一般就稱這樣的定義方式為arrow function(箭頭函數)，箭頭函數與傳統的函數有些不同，在此先不去仔細說明，但是，現在的開發者都會使用箭頭函數。

    const HelloPage = () => {

### JSX簡單介紹
前面提到return的內容其實不是HTML，我們先介紹其中一個差異，在標準的HTML中，套用CSS的樣式是使用class，但是，在JSX中，必須使用className。

我們先來套用樣板提供的style，首先，要先利用import，取得style。

    import styles from '../styles/Home.module.css'

然後，我們把style套用上去，記得，要寫className而不是過去html使用的class。如果寫class就會看到:

Unknown property 'class' found, use 'className'


    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Hello World!</h1>
      </main>
    </div>

### react hooks: useState()
前面提到React Hooks，這裡先介紹一個最基本的Hook: useState()。介紹之前，先讓大家看沒有使用useState()的狀況。

我們先加一個按鈕，按下按鈕之後，呼叫getTime函數去更新現在時間，並將變數內容顯示在網頁裡，首先，我們要注意的是在html裡，處理click是利用onclick，在JSX裡，要使用onClick，另外，因為是將這個函數交給onClick，所以，要用函數名稱，不用加()。

    <div>{time}</div>
    <button onClick={getTime}>點一下</button>

我們加上以下的程式

    let time:string = new Date().toLocaleTimeString();
    const getTime = () =>  {
      time = new Date().toLocaleTimeString();
      console.log("time:",time);
    }

我們可以從console.log裡看到變數內容改變了，可是，為什麼網頁裡的時間並沒有改變? 原因是，網頁在產生/渲染(render)之後，就不會因為變數異動而重新產生(rerender)。那怎麼辦呢? 那如果只要變數改變就重新產生頁面的話，可能會讓頁面有很多不必要的rerender。react為解決這問題，就採用了state變數，唯有state變數被更動時，才會進行rerender。在functional component裡，就利用useState()來產生state變數。

    const HelloPage = () => {
      const [time, setTime] = useState(new Date().toLocaleTimeString());


注意: useState()一定要放在元件裡面，如果放在外面就會收到:

React Hook "useState" cannot be called at the top level. React Hooks must be called in a React function component or a custom React Hook function.

useState()會回傳一個陣列，陣列的第一個元素是個變數，可以透過這變數去取得內容，第二個元素是個函數，可以透過這函數去更動內容，基本上useState()會在內容更動時，啟動rerender。改完之後，就會發現，每次點選按鈕，時間就會改變了!

### react hooks: useEffect()
接下來，我們要來介紹一下元件的生命週期，一個元件一開始會依序執行function裡的內容，除了useState()只會被執行一次之外，其他的程式就像一般的function一樣都會被一一執行，最後會回傳return的內容到頁面。

如果我們並沒有在useState()設定預設值:

    const [time, setTime] = useState();

就會看到:

Converts a time to a string by using the current or specified locale.

我們可以利用generics來設定useState的資料型態

    const [time, setTime] = useState<string>();

這樣，我們就看到time一開始是沒有任何內容的。

另外，當我們會透過網路服務去取得內容時，就沒辦法像剛剛那樣，先預設內容，而是必須去啟動一個函數去取得內容，這種時候就必須使用useEffect()。不過，那部分有點複雜，雖然取得時間可以利用預設值就可以處理，不需要使用useEffect()，但是，我們還是先用最簡單的取得時間來說明。

首先要import

    import { useState, useEffect } from 'react';

當我們使用useEffect時，第一個參數是要執行的函數，第二個參數是所謂的相依陣列(dependency array)，當相依陣列是空陣列時，就只執行一次，由於getTime()會用到time，ESLint會提醒我們要加入time或者移除相依陣列

React Hook useEffect has a missing dependency: 'time'. Either include it or remove the dependency array

為了要展示效果，我們先將警告關掉:

    useEffect(getTime,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []);

執行之後，會看到time的內容是空的，然後，才會去執行getTime，因為，getTime更新了state變數，就會讓畫面rerender。在畫面上就可以看到時間了。

整理一下，useEffect()的第二個參數有三種情況:1.空白陣列: 只執行一次，2.陣列中有state變數: 當state變數被更動時，會執行，3.沒有第二個參數: 所有state變數被更動時，會執行。

### JSX 補充
JSX不能有多個Tag，所以不能寫成

    return (
      <h1>hello</h1>
      <h2>Ben</h2>
    )

會得到:

JSX expressions must have one parent element

可以在JSX裡利用{}寫javascript的表達式，但不能寫敘述。什麼是表達式? javascript的表達式可以是運算式，也可以是函數。

    100
    num
    num + 1
    time.getFullYear()
    isTaken? "有人坐了" : "沒人坐"

不能在JSX裡寫if、while、for、console.log()等敘述。

如果要列出陣列內容，可以使用.map()。

    {names.map((name, index) => (<li key={name}>{index}/{name}</li>))}

### 作業: 新增一個按鈕，每按一次按鈕，數字就加1 (只需要用到useState())
