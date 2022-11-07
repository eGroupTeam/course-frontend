import { useState } from 'react';
import styles from '/styles/Home.module.css';
import {Product} from '../../interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
type Props = {
  addProduct(product:Product):void;
  close():void;
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
      <DialogContent>
        <TextField id="filled-basic" label="產品描述" variant="outlined" name="desc" value={product.desc} onChange={handleChange}/><br/><br/>
        <TextField id="filled-basic" label="產品價格" variant="outlined" name="price" value={product.price} onChange={handleChange}/><br/><br/>
        <TextField id="filled-basic" label="產品庫存量" variant="outlined" name="price" value={product.stock} onChange={handleChange}/><br/><br/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>送出</Button><Button color="secondary" variant="contained" onClick={props.close}>取消</Button>
      </DialogActions>
    </div>
  )
}
export default ProductCreate