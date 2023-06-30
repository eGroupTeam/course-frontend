import { useContext } from "react";
import { AuthContext, AUTH_STATUS } from "components/auth/AuthContext";
import { useRouter } from "next/router";
import MenuBar from "components/ui/MenuBar";
import TextField from "@mui/material/TextField";
import style from "../../styles/Home.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Login } from "interfaces/entities";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const onSubmit: SubmitHandler<Login> = (login) => {
    if (login.id === "12345" && login.password === "12345") {
      authContext.setStatus(AUTH_STATUS.LOGIN);
      authContext.setName(login.id);
    } else {
      authContext.setStatus(AUTH_STATUS.LOGOUT);
    }
    router.push("/product/test");
  };

  return (
    <div className={style.container}>
      <MenuBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="filled-basic"
          label="帳號"
          variant="outlined"
          {...register("id", { required: true, minLength: 5 })}
        />
        <br />
        {errors.id && (
          <span>
            帳號至少五個字
            <br />
          </span>
        )}
        <TextField
          id="filled-basic"
          label="密碼"
          variant="outlined"
          type="password"
          {...register("password", { required: true, minLength: 5 })}
        />
        <br />
        {errors.password && (
          <span>
            密碼至少五個字
            <br />
          </span>
        )}
        <Button type="submit" variant="contained">
          送出
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
