# React 基本概念
-  export default: 讓function模組化，想像成類似`main()`設定該模組的進入點?
-  箭頭函式`(...)=>{...}`相當於`function(...){...}`
   -  其實有微妙的差別，目前不清楚
   -  在使用常數定義函數`const Param = function Func(a,b){...}`時，名稱Func已形同虛設可省略，再置換成arrow function就長成: `const Param = (a,b) => {...}`
-  jsx將原生html中class改為`className`, onclick改為`onClick`等等，欄位命名有差須注意。
# useState
- `import {useState} from 'react';`
- `const [a, setA] = useState('初始值');`為一種**陣列解構賦值**(像python中`int x,y = [10, 20]`)，useState實質上回傳了一個長度為2的陣列，第二個元素為能夠設定第一個元素值的function。
  - 不想設定初始值，也可以只給型別 `const [a, setA] = useState<type>();`
- 簡單來說，在一個component function中使用useState宣告兩個參數`a, setA`後，呼叫`setA`(視作const不必加括號) 能重新設定`a`的值，並重新render使用參數`a`的區塊。
# useEffect
- `import {useEffect} from 'react';`
- `useEffect(function, [監控state變數陣列]);`
  - [ ]內任何變數更動時，執行一次function
  - 若[ ]為空，只在網頁載入時執行一次
  - 若不寫[ ] (只填function一個參數) 則任何state變數更動都會執行function。