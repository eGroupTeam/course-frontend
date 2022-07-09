import styles from '/styles/Home.module.css';
import {Product} from '../../interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler } from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

type Props = {
  addProduct(product:Product):void;
  close():void;
  open:boolean;
}

const ProductCreate:React.FC<Props> = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = product => {
    console.log("clicked");
    props.close();
    props.addProduct(product); 
    
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
      <br/>
      <TextField id="filled-basic" label="產品型號" variant="outlined" {...register("desc",{ required: true, minLength: 5 })}/><br/>
        {errors.desc && <span>* 描述至少 5 個字 *<br/></span>}
        <br/><br/>
        <TextField id="filled-basic" label="產品價格" variant="outlined" type="number" {...register("price",{min:0, max:100000})}/><br/>
        {errors.price && <span>* 價格在 0 到 100000 之間 *<br/></span>}
        <br/><br/>
        <TextField id="filled-basic" label="產品庫存" variant="outlined" type="number" {...register("stock",{min:0})}/><br/>
        {errors.stock && <span>* 庫存量要大於等於 0 *<br/></span>}
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={handleClose}>取消</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>送出</Button>
      </DialogActions>
      </Dialog>
      </form>
      
    </div>
  )
}
export default ProductCreate