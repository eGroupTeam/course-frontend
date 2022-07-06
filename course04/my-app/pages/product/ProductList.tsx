import styles from '/styles/Home.module.css';
import Product from '../../components/product/Product';
import {ProductType} from '../../interfaces/entities';

const products: ProductType[]= [
  {desc:"iPad", price:17900, stock:19},
  {desc:"iPhone X", price:24900, stock:43},
  {desc:"iPhone 11", price:29900, stock:23},
  {desc:"iPhone 12", price:31000, stock:45},
  {desc:"iPhone 13", price:35900, stock:189},
  {desc:"iPhone 14", price:41900, stock:118},
  {desc:"iPhone 15", price:45900, stock:460},
  
];

const createProduct = (product:ProductType)=>{
  return <Product key={product.desc} {...product}/>
}

const ProductList = () => {
  return (
    <div className={styles.main}>
      <table border = {1}>
        <tbody>
          {products.map(createProduct)}
        </tbody>
      
      </table>
    </div>
  )
}

export default ProductList