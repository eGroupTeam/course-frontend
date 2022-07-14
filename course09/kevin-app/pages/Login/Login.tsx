import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from "react-hook-form";
import { UserLogin } from 'interfaces/form';
import styles from 'styles/Home.module.css';
import { AuthContext, AUTH_STATUS } from 'redux/authContext';
import { useContext } from 'react';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserLogin>();
    const router = useRouter();
    const auth = useContext(AuthContext);
    const onSubmit: SubmitHandler<UserLogin> = user => {
        if (user.id === "benwu" && user.password === "ilovenext") {
            auth.setAuthStatus(AUTH_STATUS.LOGIN);
            auth.setUserName("benwu");
            router.push("/");
        } else {
            console.log("login failed");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField id="filled-basic" label="帳號" variant="outlined" {...register("id", { required: true, minLength: 5 })} /><br />
                {errors.id && <span>帳號至少5個字<br /></span>}
                <TextField id="filled-basic" label="密碼" variant="outlined" type="password" {...register("password", { required: true, minLength: 5 })} /><br />
                {errors.password && <span>密碼至少5個字<br /></span>}
                <Button type="submit" variant="contained">送出</Button>
            </form>
        </div>);
}

export default Login;