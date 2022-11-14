import styles from '/styles/Home.module.css';
import {Customer} from '@/interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler } from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';

type Props = {
  addCustomer(customer:Customer):void;
  close():void;
  open:boolean;
}

const CustomerCreate:React.FC<Props> = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Customer>();
  const onSubmit: SubmitHandler<Customer> = async customer => {
    await axios.post("http://localhost:8080/customer",customer);
    //await axios.post("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product",product);
    //props.addProduct(product);
    props.close();
    
  };
  const handleClose = () => {
    props.close();
  };
   
  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>新增顧客</DialogTitle>
      <DialogContent>
      <TextField id="filled-basic" label="顧客名稱" variant="outlined" {...register("name",{ required: true, minLength: 2 })}/><br/>
        {errors.name && <span>名稱至少2個字<br/></span>}
        <TextField id="filled-basic" label="顧客地址" variant="outlined" type="string" {...register("address",{required: true, minLength: 2})}/><br/>
        {errors.address && <span>地址必填<br/></span>}
        <TextField id="filled-basic" label="顧客體重" variant="outlined" type="number" {...register("weight",{min:0, max:500})}/><br/>
        {errors.weight && <span>體重介於0到500<br/></span>}
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
export default CustomerCreate