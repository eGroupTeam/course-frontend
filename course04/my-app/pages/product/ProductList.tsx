import styles from '/styles/Home.module.css';
import Product from '../../components/product/Product';
import {ProductType} from '../../interfaces/entities';

const products: ProductType[]= [
  {desc:"iPad", price:20000, stock:5123},
  {desc:"iPhone X", price:30000, stock:1123},
  {desc:"iPhone XS", price:35000, stock:1540},
  {desc:"iPhone 11", price:42000, stock:1130},
  {desc:"iPhone 13 Pro", price:63000, stock:1234}
];

const createProduct = (product:ProductType)=>{
  return <Product key={product.desc} {...product}/>
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