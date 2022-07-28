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
      <DialogTitle>{props.organization.organizationId===0?"新增單位":"修改單位"}</DialogTitle>
      <DialogContent>
      <TextField id="filled-basic" label="單位名稱" variant="outlined" {...register("organizationName")}/><br/>
        <TextField id="filled-basic" label="建立日期" variant="outlined" {...register("createDate")}/><br/>
        <TextField id="filled-basic" label="單位介紹" variant="outlined" {...register("organizationIntro")}/><br/>
        <TextField id="filled-basic" label="單位電話" variant="outlined"  {...register("organizationTel")}/><br/>
        <TextField id="filled-basic" label="單位郵件" variant="outlined"  {...register("organizationMail")}/><br/>
        <TextField id="filled-basic" label="單位地址" variant="outlined" {...register("organizationAddr")}/><br/>
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