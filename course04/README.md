# course-frontend
## 第四章 React基礎2: props
### 元件的切割 (composition)
在前一章我們提到了我們會將程式碼切割為元件，這一章我們就來介紹如何切割元件。首先我們新增一個檔案夾，先預設index (/my-app/pages/product/index.tsx):

    export { default } from './ProductList'

接下來我們來寫一個簡單的元件 (/my-app/pages/product/ProductList.tsx):

    import styles from '/styles/Home.module.css';

    const ProductList = () => {
      return (
        <div className={styles.container}>
        <ul>
            <li>iPad / 20000</li> 
            <li>iPhone X / 30000</li>
        </ul>
        </div>
      )
    }
    export default ProductList

因為我們加了index.tsx，所以，可以直接執行:
http://localhost:3000/product
當然，也可以:
http://localhost:3000/product/ProductList

我們來把資料內容放到陣列裡:

    type Product = {desc:string, price:number}
    const products: Product[]= [
      {desc:"iPad", price:20000},
      {desc:"iPhone X", price:30000}
    ];

透過一個函數來加上「li」，如果沒有key就看到:
Warning: Each child in a list should have a unique "key" prop.

    const createLi = (product:Product)=>{
      return <li key={product.desc}>{product.desc}/{product.price}</li>
    }

把「li」的部分換成:

      <ul>
      {products.map(createLi)}
      </ul>

如果我們要把內容改成表格，並且加上一些按鈕，就會內容會變得很複雜。這時候，我們就可以將每一個product的內容切割成一個Product元件。因為我們不想讓使用者直接打開這個元件，我們就在my-app下，另外產生一個components的檔案夾，並在components裡新增一個product的檔案夾，並產生一個Product.tsx。

    const Product = () => {
      return (
        <tr>
          <td>desc</td><td>price</td>
        </tr>
      )
    }
    export default Product

my-app/pages/product/ProductList.tsx的內容改為:

    <div className={styles.container}>
      <table border = {1}>
        <tbody><Product/></tbody>
      
      </table>
    </div>

在ProductList.java中別忘了:
import Product from '../../components/product/Product'

### props
我們要怎麼把資料傳給Product元件? 因為現在已經是個元件，而不是一般的函數，不能直接傳參數過去，所以，這就要用到react的props功能了，在react裡，就像一般的tag一樣，我們可以設定屬性(properties, props)

不過，我們要先處理一下type Product，首先，要改個名字，因為現在有一個元件也叫Product，資料型態也叫Product。因為這個type在ProductList及Product都會用到，我們就把這部分移出去，並且改名為ProductType，放在my-app/interfaces/entities.tsx裡:

    export type ProductType = {
      desc:string, price:number
    }

在Product.tsx裡:

    import {ProductType} from '../../interfaces/entities';
    const Product = (product:ProductType) => {
      return (
        <tr>
          <td>{product.desc}</td><td>{product.price}</td>
        </tr>
      )
    }
    export default Product

在ProductList.tsx裡，注意，因為我們在定義ProductType的時候，並沒有export為default，所以，ProductType要加「{}」，程式改成:

    import styles from '/styles/Home.module.css';
    import Product from '../../components/product/Product';
    import {ProductType} from '../../interfaces/entities';

    const products: ProductType[]= [
      {desc:"iPad", price:20000},
      {desc:"iPhone X", price:30000}
    ];

    const createProduct = (product:ProductType)=>{
      return <Product desc={product.desc} price={product.price}/>
      //return <li key={product.desc}>{product.desc}/{product.price}</li>
    }

    const ProductList = () => {
      return (
        <div className={styles.container}>
          <table border = {1}>
            <tbody>
              {products.map(createProduct)}
            </tbody>
          
          </table>
        </div>
      )
    }

    export default ProductList

createProduct的內容也可以改用spread語法，當欄位很多的時候，這樣的寫法就精簡多了，spread語法可參考:[進階物件語法](https://gem-allosaurus-fd8.notion.site/7b4ed3ab26424d5ea498fa59415e6b8b)

    const createLi = (product:ProductType)=>{
      return <Product key={product.desc} {...product}/>
    }

注意，要加上key，否則會有警告:
Warning: Each child in a list should have a unique "key" prop.

這樣寫雖然麻煩很多，但是，元件之間的資料傳遞就會少很多問題，使用javascript時，並不管這麼多，雖然方便，但是，常常就會遇到當元件之間傳遞元素改變資料型態或改名稱，另一邊就會收不到資料，也找不到問題所在，使用typescript之後，props的改變就會被好好的管理了，在多人同時開發的情況之下，就能大量的減少元件之間不一致的問題了!

### 作業 試試看多加一些產品，接下來試試看怎麼讓產品增加一個欄位:庫存量 (stock)，增加這個欄位要做哪些修改?
