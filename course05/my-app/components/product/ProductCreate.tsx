import { useState } from 'react';
import styles from '/styles/Home.module.css';
import {Product} from '../../interfaces/entities';
type Props = {
  addProduct(product:Product):void;
}
const ProductCreate:React.FC<Props> = (props) => {
  const [product, setProduct]=useState<Product>({desc:"",price:0,stock:0});
  
  const handleChange= (event: React.ChangeEvent<HTMLInputElement>)=> {
    setProduct({...product, [event.target.name]:event.target.value});
  }
  console.log("product:", product);

  const handleSubmit=()=>{
    props.addProduct(product);
  }
  return (
    <div className={styles.container}>
      產品描述:<input type="text" name="desc" value={product.desc} onChange={handleChange} /><br/>
      產品價格:<input type="number" name="price" value={product.price} onChange={handleChange}/><br/>
      產品庫存:<input type="number" name="stock" value={product.stock} onChange={handleChange}/><br/>
      <button onClick={handleSubmit}>送出</button>
    </div>
  )
}
export default ProductCreate