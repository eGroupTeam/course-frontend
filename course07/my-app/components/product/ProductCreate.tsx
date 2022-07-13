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
<<<<<<< HEAD
  const onSubmit: SubmitHandler<Product> = (product) => {
=======
  const onSubmit: SubmitHandler<Product> = product => {
>>>>>>> edccaa5700d5c3c12fef9bb47b181ab1d304f320
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
      <TextField id="filled-basic" label="產品描述" variant="outlined" {...register("desc",{ required: true, minLength: 5 })}/><br/>
        {errors.desc && <span>描述至少5個字<br/></span>}
        <TextField id="filled-basic" label="產品價格" variant="outlined" type="number" {...register("price",{min:0, max:100000})}/><br/>
        {errors.price && <span>價格在0到100000之間<br/></span>}
<<<<<<< HEAD
        <TextField id="filled-basic" label="產品庫存" variant="outlined" type="number" {...register("stock",{min:0})}/><br/>
        {errors.stock && <span>庫存須大於等於0個<br/></span>}
=======
>>>>>>> edccaa5700d5c3c12fef9bb47b181ab1d304f320
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