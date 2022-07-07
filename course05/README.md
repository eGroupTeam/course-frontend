# course-frontend
## 第五章 React基礎3: 互動/事件處理
### 事件處理 (新增資料)
在PHP(或傳統的web)裡，是透用Form以及http post，在submit後，送出Form裡的欄位內容給伺服器。在javascript裡，可以利用document.getElementById取得DOM的內容，再利用http post將資料送到伺服器。

在react裡，並不建議直接去取得DOM的內容，所以，寫法就跟javascript不一樣了。在react裡，則是在輸入時(onChange)就將內容放到state裡，並將value設為state。(詳參: [Handling Events](https://reactjs.org/docs/handling-events.html)、[Forms](https://reactjs.org/docs/forms.html)，但因為我們是使用typescript，所以，內容稍有不同)

** 為了符合命名習慣，我們更動了一下元件的名稱: 原本Product.tsx改為ProductListItem.tsx，原本在entities.tsx裡的ProductType改回Product

我們先新增一個ProductCreate.tsx的元件，一樣的，我們不希望直接去打開這個元件，所以，會放在components/product裡。

    import styles from '/styles/Home.module.css';
    const ProductCreate = () => {
      return (
        <div className={styles.container}>
          產品描述:<input type="text" name="desc" /><br/>
          產品價格:<input type="number" name="price" /><br/>
        </div>
      )
    }
    export default ProductCreate

我們把這個新的元件先放到ProductList.java

    <div className={styles.container}>
      <table border = {1}>
        <tbody>
          {products.map(createProduct)}
        </tbody>
      </table>
      <ProductCreate/>
    </div>

表單內容的處理一般來說是使用Controlled Components，也就是當我們輸入時，會馬上啟動對應的處理函數，也可以使用[Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)或其他的套件，如formik。我們先以Controlled Components來說明。

首先，我們先在網頁加上value及onChange。

          產品描述:<input type="text" name="desc" value={desc} onChange={handleChange}/><br/>

先設定對應的useState()

    const [desc, setDesc]=useState("");

當我們輸入時，就會取得input裡的內容，並將內容透過setDesc()寫進desc，這樣，我們就可以看到desc的內容了。
[React events and TypeScript: a complete guide](https://devtrium.com/posts/react-typescript-events)

    const handleChange= (event: React.ChangeEvent<HTMLInputElement>)=> {
      setDesc(event.target.value);
    }

接下來我們來處理另一個欄位，處理的方法可以增加另一個對應的useState()，但是，當頁面上有很多欄位時，這樣的寫法就要寫很多useState()，所以，我們利用object來儲存所有內容。

    const [product, setProduct]=useState<Product>({desc:"",price:0});

在取得輸入值的時候，我們利用event.target.name取得輸入欄位的name

    setProduct({...product, [event.target.name]:event.target.value});

因此，我們就可以讓兩個欄位使用同一個函數了:

    const handleChange= (event: React.ChangeEvent<HTMLInputElement>)=> {
      setProduct({...product, [event.target.name]:event.target.value});
    }

完整程式:

    import styles from '/styles/Home.module.css';
    import {ProductType} from '../../interfaces/entities';
    import { useState } from 'react';

    const ProductCreate = () => {
      const [product, setProduct]=useState<Product>({desc:"",price:0});
      const handleChange= (event: React.ChangeEvent<HTMLInputElement>)=> {
        setProduct({...product, [event.target.name]:event.target.value});
      }
      console.log("product:",product);
      return (
        <div className={styles.container}>
          產品描述:<input type="text" name="desc" value={product.desc} onChange={handleChange}/><br/>
          產品價格:<input type="number" name="price" value={product.price} onChange={handleChange}/><br/>
        </div>
      )
    }
    export default ProductCreate

### 回傳內容至ProductList
上次的範例說明了如何傳遞props到另一個元件，接下來，要怎麼把資料傳回來呢? 基本上的作法不是將資料傳回來，而是將改變資料的函數傳到元件。

首先，因為products的內容會變動，所以，我們要把products改為state變數:

    const [products, setProducts]=useState<Product[]>([
      {desc:"iPad", price:20000},
      {desc:"iPhone X", price:30000}
    ])

接下來，提供一個方法去新增內容到products裡，setState (setProducts)接受兩種參數，前面介紹的是第一種參數也就是給一個值，setState會更新state的內容，但是如果要利用原本的值，就會有問題。

[3 Mistakes Junior Developers Make With React Function Component State](https://betterprogramming.pub/3-mistakes-junior-developers-make-with-react-function-component-state-8a744ab99a0d) 
* Modifying State Directly
* Setting State That Relies on the Previous State Without Using a Function
* Forgetting That the Setter Method from useState Is Asynchronous

所以，必須用第二種參數，就是提供一個callback函數，當參數是callback函數時，setState會將原有的值以及props傳給callback函數。 

在下面範例裡，我們只使用原有的值，將這個值命名為currentProduct。在ProductList中，將ProductAdd傳回的product，利用setProducts利用spread將收到的內容加到陣列最後。

    const addProduct = (product:Product)=>{
      setProducts(currentProducts=>[...currentProducts, product]);
    }

接下來，我們就把這個函數傳給ProductCreate

    <div className={styles.container}>
      <table border = {1}>
        <tbody>
          {products.map(renderProduct)}
        </tbody>
      </table>
      <ProductCreate addProduct={addProduct}/>
    </div>

如果在ProductCreate直接加props

    const ProductCreate = (props) => {

因為我們使用typescript，所以會得到:
Parameter 'props' implicitly has an 'any' type

當然，我們可以將props定義為any，然而，我們不要這樣做。
除了上次使用的方法之外，這邊介紹另一種利用FC(Functional Component)接受props的方式。首先，先定義一個type:

    type Props = {
      addProduct(product:Product):void;
    }

然後，定義ProductCreate為一個FC (Functional Component)，並利用generic，定義這個FC所接受的props的型態為Props。這樣，就可以使用props了!

    const ProductCreate:React.FC<Props> = (props) => {

** 注意，現在似乎不鼓勵大家使用FC，不過，也有人說react 18之後，FC的問題已經不存在了~
[Why you probably shouldn’t use React.FC to type your React components](https://medium.com/raccoons-group/why-you-probably-shouldnt-use-react-fc-to-type-your-react-components-37ca1243dd13)
[[掘竅] 了解這些，更快掌握 TypeScript 在 React 中的使用（Using TypeScript in React）](https://pjchender.blogspot.com/2020/07/typescript-react-using-typescript-in.html)
[Upgrading to React 18 with TypeScript](https://blog.logrocket.com/upgrading-react-18-typescript/)

    <div className={styles.container}>
      產品描述:<input type="text" name="desc" value={product.desc} onChange={handleChange} /><br/>
      產品價格:<input type="number" name="price" value={product.price} onChange={handleChange}/><br/>
      <button onClick={handleSubmit}>送出</button>
    </div>

並增加handleSubmit()

    const handleSubmit=()=>{
      props.addProduct(product);
    }

### 事件處理 (刪除資料)
那要怎麼刪除資料?

首先，我們要在ProductListItem.tsx裡新增一個刪除的按鈕，並且從ProductList接收index及deleteProduct():

    type Props = {
      desc:string,
      price:number,
      index:number,
      deleteProduct(index:number):void;
    }

    const ProductListItem:React.FC<Props> = (props) => {
      const deleteProduct = ()=>{
        props.deleteProduct(props.index)
      }
      return (
        <tr>
          <td>{props.desc}</td>
          <td>{props.price}</td>
          <td><button onClick={deleteProduct}>刪除</button></td>
        </tr>
      )
    }
    export default ProductListItem

在ProductList裡，將陣列的index及deleteProduct()傳給ProductListItem
刪除陣列元素的方法請參考:
[9 Ways to Remove Elements From A JavaScript Array - Plus How to Safely Clear JavaScript Arrays](https://love2dev.com/blog/javascript-remove-from-array/)


renderProduct(將createProduct改名稱，避免與addProduct混淆)將deleteProduct傳給Product。我們利用map傳的第二個參數:index記住這個product在陣列裡的位置

      const renderProduct = (product:Product, index:number)=>{
        return <ProductListItem key={product.desc} index={index} desc={product.desc} price={product.price} deleteProduct={deleteProduct}/>
      }

deleteProduct的內容:

      const deleteProduct = (index:number)=>{
        const temp = [...products];
        temp.splice(index,1);
        setProducts([...temp]);
      }

記得要改為renderProduct

      return (
        <div className={styles.container}>
          <table border = {1}>
            <tbody>
              {products.map(renderProduct)}
            </tbody>
          </table>
          <ProductCreate addProduct={addProduct}/>
        </div>
      )
    }
    export default ProductList

大家可以試試看如何更新陣列內容，因為相對的複雜，而且基本上我們未來都會透過網路服務來新增、刪除、修改資料，所以，這裡我們就不介紹了。

### 作業 接下來試試看怎麼根據範例讓產品增加一個欄位:庫存量 (stock)，增加這個欄位要做哪些修改?



