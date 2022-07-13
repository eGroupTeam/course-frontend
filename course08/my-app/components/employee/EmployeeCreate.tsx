import styles from '/styles/Home.module.css';
import {Employee} from '@/interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler } from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

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
      <DialogTitle>新增員工</DialogTitle>
      <DialogContent>
        <TextField id="filled-basic" label="姓名" variant="outlined" {...register("name",{ required: true, minLength: 2 })}/><br/>
        {errors.desc && <span>姓名不得為空<br/></span>}
        <TextField id="filled-basic" label="部門" variant="outlined" {...register("department",{ required: true, minLength: 2 })}/><br/>
        {errors.price && <span>部門不得為空<br/></span>}
        <TextField id="filled-basic" label="薪水" variant="outlined" type="number" {...register("salary",{ min: 168, max: 99999 })}/><br/>
        {errors.price && <span>薪水最低168最高99999<br/></span>}
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
export default EmployeeCreate