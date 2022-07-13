import Menu from '@/components/ui/Menu';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styles from '/styles/Home.module.css';
/*
import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';
import { useContext } from 'react';
*/
import { useAppSelector } from '@/components/auth/hooks'
import {AUTH_STATUS} from '@/components/auth/authSlice';

const Test = () => {
  const router = useRouter();
  const id = router.query.id;
  const action = () =>{
    router.back();
  }
  const login = () =>{
    router.push("/auth/Login");
  }
  //const authContext = useContext(AuthContext);
  const status = useAppSelector((state) => state.status.value)
  return(
    <div className={styles.container}>
      <Menu/>
      {id}<br/>
      {status === AUTH_STATUS.LOGIN ?"已登入": "未登入"}<br/>
      <Button onClick={login}>回登入頁</Button>
      <Button onClick={action}>回上頁</Button>
    </div>
    )
}

/*
      {authContext.status === AUTH_STATUS.LOGIN? "已登入": "未登入"}<br/>
*/

export default Test;