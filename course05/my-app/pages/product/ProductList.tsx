import styles from '/styles/Home.module.css';
import ProductListItem from '../../components/product/ProductListItem';
import ProductCreate from '../../components/product/ProductCreate';
import {Product} from '../../interfaces/entities';
import { useState } from 'react';

const ProductList = () => {
  const [products, setProducts]=useState<Product[]>([
    {desc:"iPad", price:20000},
    {desc:"iPhone X", price:30000}
  ])

  const renderProduct = (product:Product, index:number)=>{
    return <ProductListItem key={product.desc} index={index} desc={product.desc} price={product.price} deleteProduct={deleteProduct}/>
    //return <li key={product.desc}>{product.desc}/{product.price}</li>
  }

  const addProduct = (product:Product)=>{
    setProducts(currentProducts=>[...currentProducts, product]);
  }

  const deleteProduct = (index:number)=>{
    const temp = [...products];
    temp.splice(index,1);
    setProducts([...temp]);
  }

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