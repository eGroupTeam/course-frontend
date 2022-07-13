import styles from '/styles/Home.module.css';
import {Product} from '@/interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler } from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';

type Props = {
  addProduct(product:Product):void;
  close():void;
  open:boolean;
}

const ProductCreate:React.FC<Props> = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async product => {
    await axios.post("https://2fa23097-8052-4057-9d5d-4f1120d11510.mock.pstmn.io/product",product);
    props.addProduct(product);
    props.close();
    
  };
  const handleClose = () => {
    props.close();
  };
   
  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>新增產品</DialogTitle>
      <DialogContent>
      <TextField id="filled-basic" label="產品描述" variant="outlined" {...register("desc",{ required: true, minLength: 5 })}/><br/>
        {errors.desc && <span>描述至少5個字<br/></span>}
        <TextField id="filled-basic" label="產品價格" variant="outlined" type="number" {...register("price",{min:0, max:100000})}/><br/>
        {errors.price && <span>價格在0到100000之間<br/></span>}
        <TextField id="filled-basic" label="產品價格" variant="outlined" type="number" {...register("stock",{min:0, max:100000})}/><br/>
        {errors.stock && <span>庫存在0到100000之間<br/></span>}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>送出</Button>
        <Button color="secondary" variant="contained" onClick={handleClose}>取消</Button>
      </DialogActions>
      </Dialog>
      </form>
      
    </div>
  )
}
export default ProductCreate