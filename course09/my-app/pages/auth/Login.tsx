import Button from '@mui/material/Button';
import {Login, Login as User} from '@/interfaces/entities';
import { useForm, SubmitHandler } from "react-hook-form";
import Menu from '@/components/ui/Menu';
import styles from '/styles/Home.module.css';
import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';


const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Login>();
  const onSubmit : SubmitHandler<Login> = login => {
    if (login.id === "ryancho" && login.password === "egroup"){
      authContext.setStatus(AUTH_STATUS.LOGIN);
      sessionStorage.setItem("username", login.id);
    }
    else {
      authContext.setStatus(AUTH_STATUS.LOGOUT);
    }
    router.push("/product/test");
  };
  return(
    <div className={styles.container}>
      <Menu/>
      <br/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="filled-basic" label="帳號" variant="outlined" {...register("id",{ required: true, minLength: 5 })}/><br/><br/>
        {errors.id && <span>帳號至少5個字<br/><br/></span>}
        <TextField id="filled-basic" label="密碼" variant="outlined" type="password" {...register("password",{ required: true, minLength: 5 })}/><br/><br/>
        {errors.password && <span>密碼至少5個字<br/><br/></span>}
        <Button type = "submit" variant="contained">送出</Button>
      </form>

    </div>
    )
}

export default LoginPage;