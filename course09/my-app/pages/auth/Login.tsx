import Button from '@mui/material/Button';
import {Login as User} from '@/interfaces/entities';
import { useForm, SubmitHandler } from "react-hook-form";
import Menu from '@/components/ui/Menu';
import styles from '/styles/Home.module.css';
/*
import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';
import { useContext } from 'react';
*/
import { useAppDispatch } from '@/components/auth/hooks'
import { logout, login } from '@/components/auth/authSlice'

import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';


const LoginPage = () => {
  //const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<User>();
  const onSubmit: SubmitHandler<User> = user => {
    if (user.id === "benwu" && user.password === "ilovenext"){
      //authContext.setStatus(AUTH_STATUS.LOGIN);
      dispatch(login());
    }
    else {
      //authContext.setStatus(AUTH_STATUS.LOGOUT);
      dispatch(logout());
    }
    router.push("/product/test");
  };
  return(
    <div className={styles.container}>
      <Menu/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="filled-basic" label="帳號" variant="outlined" {...register("id",{ required: true, minLength: 5 })}/><br/>
        {errors.id && <span>帳號至少5個字<br/></span>}
        <TextField id="filled-basic" label="密碼" variant="outlined" type="password" {...register("password",{ required: true, minLength: 5 })}/><br/>
        {errors.password && <span>密碼至少5個字<br/></span>}
        <Button type = "submit" variant="contained">送出</Button>
      </form>
    </div>
    )
}

export default LoginPage;