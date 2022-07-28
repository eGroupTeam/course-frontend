import styles from '/styles/Home.module.css';
import {Organization} from '@/interfaces/entities';
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
  organization:Organization,
  close():void;
  open:boolean;
}

const OrganizationCreateEdit:React.FC<Props> = (props) => {
  const { register, handleSubmit, watch, formState: { errors }, reset  } = useForm<Organization>(
    {defaultValues: useMemo(() => {
      return props.organization;
    }, [props])}
  );
  const onSubmit: SubmitHandler<Organization> = async organization => {
    console.log("organizationId:",organization.organizationId);
    if (organization.organizationId===0){
      await axios.post("http://localhost:8080/organization",organization);
    }
    else {
      await axios.put("http://localhost:8080/organization/"+organization.organizationId,organization);
    }
  
    props.close();
    
  };
  const handleClose = () => {
    props.close();
  };
  console.log(props.organization);

  useEffect(() => {
    reset(props.organization);
  }, [props.organization, reset]);
   
  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.organization.organizationId===0?"新增組織":"修改"}</DialogTitle>
      <DialogContent>
      <TextField id="filled-basic" label="組織名稱" variant="outlined" {...register("name",{ required: true, minLength:1})}/><br/>
        {errors.name && <span>名稱至少5個字<br/></span>}
        <TextField id="filled-basic" label="建立日期" variant="outlined" {...register("date")}/><br/>
        {errors.date && <span>請輸入日期<br/></span>}
        <TextField id="filled-basic" label="組織介紹" variant="outlined" {...register("introduction",{minLength:1})}/><br/>
        {errors.introduction && <span>介紹文字需大於0<br/></span>}
        <TextField id="filled-basic" label="組織電話" variant="outlined"  {...register("phone",{min:0, max:100000})}/><br/>
        {errors.phone && <span>電話需大於一個數字<br/></span>}
        <TextField id="filled-basic" label="組織郵件" variant="outlined"  {...register("email",{min:0, max:100000})}/><br/>
        {errors.email && <span>請輸入郵件<br/></span>}
        <TextField id="filled-basic" label="組織地址" variant="outlined" {...register("address",{min:0, max:100000})}/><br/>
        {errors.address && <span>地址需大於0<br/></span>}
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
export default OrganizationCreateEdit