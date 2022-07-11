import Menu from '@/components/ui/Menu';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styles from '/styles/Home.module.css';

import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';
import { useContext } from 'react';

/*import { useAppSelector } from '@/components/auth/hooks'
import {AUTH_STATUS} from '@/components/auth/authSlice';
*/

const Test = () => {
  const router = useRouter();
  const id = router.query.id;
  const action = () =>{
    router.back();
  }
  const login = () =>{
    router.push("/auth/Login");
    sessionStorage.removeItem("name");
  }
  const authContext = useContext(AuthContext);
  //const status = useAppSelector((state) => state.status.value)
  if(!sessionStorage.getItem("name")){
    return(
      <div className={styles.container}>
        <Menu/>
        {id}<br/>
        {authContext.status === AUTH_STATUS.LOGIN? "已登入": "未登入"}<br/>
        <Button onClick={login}>回登入頁</Button>
        <Button onClick={action}>回上頁</Button>
      </div>
      )

  }
  else{
    return(
      <div className={styles.container}>
        <Menu/>
        {id}<br/>
        使用者：
        {sessionStorage.getItem("name")}
        <br />
        {authContext.status === AUTH_STATUS.LOGIN? "已登入": "未登入"}<br/>
        <Button onClick={login}>回登入頁</Button>
        <Button onClick={action}>回上頁</Button>
      </div>
      )
  }
}

/*
    context作法：  {authContext.status === AUTH_STATUS.LOGIN? "已登入": "未登入"}<br/>
    redux作法：  {status === AUTH_STATUS.LOGIN ?"已登入": "未登入"}<br/>
*/

export default Test;