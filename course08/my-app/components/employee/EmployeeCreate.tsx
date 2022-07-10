import styles from '/styles/Home.module.css';
import {Employee} from '@/interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler } from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import employee from 'pages/employee';

type Props = {
  addEmployee(employee:Employee):void;
  close():void;
  open:boolean;
}

const EmployeeCreate:React.FC<Props> = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Employee>();
  const onSubmit: SubmitHandler<Employee> = employee => {
    console.log("clicked");
    props.close();
    props.addEmployee(employee); 
    
  };
  const handleClose = () => {
    props.close();
  };
   
  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>新增員工資料</DialogTitle>
      <DialogContent>
        <TextField id="filled-basic" label="姓名" variant="outlined" {...register("name",{ required: true, minLength: 2 })}/><br/><br/>
        {errors.name && <span>必須輸入姓名！<br/><br/></span>}
        <TextField id="filled-basic" label="部門" variant="outlined" {...register("department",{required: true, minLength: 1})}/><br/><br/>
        {errors.department && <span>必須輸入所在部門！<br/><br/></span>}
        <TextField id="filled-basic" label="薪水" variant="outlined" type="number" {...register("pay",{min:1, max:100000})}/><br/>
        {errors.pay && <span>薪水須在 25250 至 1000000 之間<br/><br/></span>}
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
export default EmployeeCreate