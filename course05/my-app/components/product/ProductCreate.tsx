import { useState } from 'react';
import styles from '/styles/Home.module.css';
import {Product} from '../../interfaces/entities';
type Props = {
  addProduct(product:Product):void;
}
const ProductCreate:React.FC<Props> = (props) => {
  const [product, setProduct]=useState<Product>({desc:"", price:"", stock:""});
  
  const handleChange= (event: React.ChangeEvent<HTMLInputElement>)=> {
    setProduct({...product, [event.target.name]:event.target.value});
  }
  console.log("product:", product);

  const handleSubmit=()=>{
    props.addProduct(product);
  }
  return (
    <div className={styles.container}>
      商品型號：<input type="text" name="desc" value={product.desc} onChange={handleChange} /><br/>
      商品價錢：<input type="text" name="price" value={product.price} onChange={handleChange}/><br/>
      商品庫存：<input type="text" name="stock" value={product.stock} onChange={handleChange}/><br/>
      <button onClick={handleSubmit}>新增商品</button>
    </div>
  )
}
export default ProductCreate