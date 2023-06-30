import { useState } from "react";
import { Product } from "../../interfaces/entities";
import style from "../../src/styles/Home.module.css";
import { Button, DialogActions, DialogContent, TextField } from "@mui/material";

type Props = {
    addProduct(product:Product):void;
    onClose():void;
}

const ProductCreate:React.FC<Props> = (props) => {
    //因為要一個一個改變太麻煩 所以這邊改成儲存一個物件
    const [product, setProduct] = useState<Product>({id: 0,description:"",price :0, stock:0});
    const handeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({...product, [event.target.name]:event.target.value});
    }
    const handleSubmit = () => {
        props.addProduct(product);
        setProduct({id:0, description:"",price :0, stock:0});
        props.onClose();
    }
  return (
    <div className={style.container}>
      <DialogContent>
          <TextField id="outlined-basic" label="產品描述" variant="outlined" name="description" value={product.description} onChange={handeChange}/><br/><br/>
          <TextField id="outlined-basic" label="產品價格" variant="outlined" name="price" value={product.price} onChange={handeChange}/><br/><br/>
          <TextField id="outlined-basic" label="產品庫存" variant="outlined" name="stock" value={product.stock} onChange={handeChange}/><br/>
      </DialogContent>
     <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>送出</Button>
          <Button color="secondary" variant="contained" onClick={props.onClose}>取消</Button>
     </DialogActions>
    </div>
  );
};

export default ProductCreate;
