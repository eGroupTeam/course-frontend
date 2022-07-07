import styles from '/styles/Home.module.css';
import Product from '../../components/product/Product';
import {ProductType} from '../../interfaces/entities';

const products: ProductType[]= [
  {desc:"iPad", price:20000,stock:666},
  {desc:"iPhone X", price:30000,stock:333},
  {desc:"apple", price:20,stock:77},
  {desc:"happy", price:9999999,stock:0}
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