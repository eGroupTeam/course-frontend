import styles from '/styles/Home.module.css';
import {Customer} from '@/interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler} from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useMemo } from 'react';

type Props = {
  customer:Customer,
  close():void;
  open:boolean;
}

const CustomerCreateEdit:React.FC<Props> = (props) => {
  const { register, handleSubmit, watch, formState: { errors }, reset  } = useForm<Customer>(
    {defaultValues: useMemo(() => {
      return props.customer;
    }, [props])}
  );
  const onSubmit: SubmitHandler<Customer> = async customer => {
    console.log("id:",customer.id);
    if (customer.id===0){
      await axios.post("http://localhost:8080/customer",customer);
    }
    else {
      await axios.put("http://localhost:8080/customer/"+customer.id,customer);
    }
    //await axios.post("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/customer",customer);
    //props.addCustomer(customer);
    props.close();
    
  };
  const handleClose = () => {
    props.close();
  };
  console.log(props.customer);

  useEffect(() => {
    reset(props.customer);
  }, [props.customer, reset]);
   
  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.customer.id===0?"新增顧客":"修改顧客"}</DialogTitle>
      <DialogContent>
        <TextField id="filled-basic" label="顧客名稱" variant="outlined" {...register("name",{ required: true, minLength: 2, maxLength:5 })}/><br/>
        {errors.name && <span>名字介於2~5個字之間<br/></span>}
        <TextField id="filled-basic" label="顧客地址" variant="outlined" {...register("address",{required: true, minLength:3, maxLength:15})}/><br/>
        {errors.address && <span>地址介於3~15字之間<br/></span>}
        <TextField id="filled-basic" label="顧客重量" variant="outlined" type="number" {...register("weight",{min:25, max:140})}/><br/>
        {errors.weight && <span>體重介於25~140KG之間<br/></span>}
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
export default CustomerCreateEdit