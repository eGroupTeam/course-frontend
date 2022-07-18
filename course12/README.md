# course-frontend

## 第十二章 前後端整合 1

第十一章已經介紹如何存取 API，並且在 ProductList 及 ProductCreate 裡讀取 mock server 裡的 API。

### 讀取

我們這一章要來介紹如何讀取 spring 的 REST API。
目前我們前端需要取得產品的列表，不過，後端目前沒有對應的 API。我們先在 spring 寫一個 product 的 REST API。

把 url 改一下

    useEffect(() => {
      async function fetchData () {
        const result = await axios.get("http://localhost:8080/product");
        //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
        setProducts(result.data);
      }
      fetchData();
    },[open, deleted]);

結果，卻是看不到內容，在 terminal 裡看不到錯誤，在 spring 也看不到錯誤。利用 postman 測試，也是正常的。發生了甚麼事?

原因是這是執行時的問題，所以，要在瀏覽器的「開發人員工具」裡去找錯誤訊息。打開「開發人員工具」會看到

Access to XMLHttpRequest at 'http://localhost:8080/product' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

執行時，會看不到結果，是因為 cross-origin requests (CORS)被擋了，因為 spring 是跑在 8080 port 而 react 跑在 3000 port，spring 因為資訊安全的關係，拒絕了 react 的要求。一般解決的方法有兩種，第一種是在 react 端設定 proxy，讓 react 假裝是在 8080 上執行，另一種做法，是在 spring 上進行 CORS 的設定。

處理好之後，發現頁面上看不到產品的描述，原因是 rest 傳回來的欄位是 id, name, price。也就是傳過來的是 name，而不是 desc。所以，兩邊要先講好欄位的命名，否則，就會遇到這個問題。我們修改一下相關的檔案。

ProductList:

    const renderProduct = (product:Product, index:number)=>{
      return <ProductListItem key={product.name} index={index} desc={product.name} price={product.price} deleteProduct={deleteProduct}/>
    }

會看到:
Property 'name' does not exist on type 'Product'

所以，也要更改/interfaces/entities.tsx

    export type Product = {
      name:string, price:number
    }
    export type Login = {
      id:string, password:string
    }

ProductCreate.tsx

      <TextField id="filled-basic" label="產品名稱" variant="outlined" {...register("name",{ required: true, minLength: 5 })}/><br/>
        {errors.name && <span>名稱至少5個字<br/></span>}

### 新增

首先，先確定後端的 API (post)可以正常運作。接下來，我們來修改 ProductAdd。

改一下 post 的 url:

    const onSubmit: SubmitHandler<Product> = async product => {
      await axios.post("http://localhost:8080/product",product);
      //await axios.post("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product",product);
      //props.addProduct(product);
      props.close();

    };

應該就可以看到新增的內容了!

### 刪除

首先，先確定後端的 API (delete)可以正常運作。接下來，修改刪除的前端。在 ProductListItem.tsx 裡:

    import axios from 'axios';

    const deleteProduct = async()=>{
      await axios.delete("http://localhost:8080/product/"+props.index);
      //props.deleteProduct(props.index)
    }

結果，卻是刪錯了資料 (或者會在開發人員工具中看到 error 500)，原因是，我們原本是刪除陣列，資料刪除之後，元素的 id 會跟著變動，但是，資料庫不一樣，因為我們透過 auto increment 產生 id，所以，id 不一定是連續的，所以，要注意這個差異!!

那要怎麼修改? 首先，我們讀到的資料內容其實包含了 id，所以，我們將讀到的 id，傳給 ProductListItem。

    const renderProduct = (product:Product, index:number)=>{
      return <ProductListItem key={product.name} index={product.id} name={product.name} price={product.price} deleteProduct={deleteProduct}/>
    }

會得到一個錯誤訊息:
Property 'id' does not exist on type 'Product'

interfaces/entities.tsx 裡的 Product 要修改:

    export type Product = {
      id: number, name:string, price:number
    }

有些產品不能刪除，是因為我們已經有訂單了，因為我們將 FK 的刪除及修改行為設定為 restrict。(這個問題暫時先不處理)

另外，雖然不需要刪除陣列裡的內容，但是，還是要靠 setDeleted 去讓 useEffect()重新讀資料，也要去掉不需要的參數。

ProductList.tsx:

    const deleteProduct = ()=>{
      setDeleted(!deleted);
    }

ProductListItem.tsx:

    type Props = {
      desc:string,
      price:number,
      index:number,
      deleteProduct():void;
    }

    const deleteProduct = async()=>{
      await axios.delete("http://localhost:8080/product/"+props.index);
      props.deleteProduct();
    }

### 作業 我們根據 product 來完成 customer 讀取、新增、刪除
