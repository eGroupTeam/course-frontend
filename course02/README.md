# course-frontend

## 第二章 程式語言基礎

注意，未來如果 clone 老師的範例，因為老師並沒有上傳 node_modules 上去，各位要先執行 yarn install，才能執行 yarn dev。yarn dev 不是 yarn 的內建指令，而是去執行 package.json 裡 script 底下 dev 對應的 script。

Typescript 基本上可以算是 javascript 的加強版，簡單的說，就是把資料型態加進 javascript。javascript 跟 php 及 python 一樣資料型態很彈性，然而，當程式越寫越大之後，彈性的資料型態就成為很頭痛的問題，所以，typescript 就是要解決這樣的問題。但是，因為 Typescript 最後會編譯為 javascript，所以，事實上資料型態的檢查是在編譯時進行，並非在程式執行時檢查。

### 基本資料型態(type)

type: string, number, boolean
Typescript 有 implict type 及 explicit type 兩種方式來定義變數資料型態。

    let heading: string="ben";//explicit type
    let heading2="I am ben";//implicit type

### 陣列

Typescript 的陣列裡，所有的元素的資料型態要一致。

    const names: string[] = ["Mary","Tom"];

### 物件

Typescript 的物件裡，要定義屬性的資料型態，可以定義某個屬性是 optional。

    const product: { type: string, price: number, desc?:string } = {
      //desc是optional
      type: "iPhone",
      price: 12000
    }

### 物件陣列

Typescript 的物件陣列裡，所有的元素屬於同樣的物件。

    const products: { type: string, price: number, desc?:string }[] =
    [
    {
        type: "iPhone",
        price: 12000
    },
    {
        type: "iPad",
        price: 15000,
        desc: "Apple iPad plus"
    }
    ];

### type

Typescript 可以自訂資料型態

    type Product={ type: string, price: number, desc?:string };

### interface

和 type 差不多，只是只能用在物件

    interface Book { type: string, price: number, desc?:string };

### 函數 (function)

可以指定回傳值及參數的資料型態

    function getInterest(balance:number):number{
      return balance * .006;
    }

如果沒有指定資料型態，那就是跟 javascript 的用法很像

    function testAny(option:number){
      if (option===0){
        return "test";
      }
      else {
        return 0;
      }
    }

### union type

    string | number

### enum

    enum AccountType {
      regular, saving
    }

### generic (通用型別)

    function testGenerics<T>(parameter1:T, parameter2:T){
      if (typeof parameter==="number"){
        return parameter+1;
      }
      if (typeof parameter==="string"){
        return "p:"+parameter;
      }

    }
