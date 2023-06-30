import MenuBar from "../../../components/ui/MenuBar";
import style from "../../styles/Home.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { AuthContext, AUTH_STATUS } from "components/auth/AuthContext";
import { useContext } from "react";

const Test = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  //   const id = router.query.id;
  // const {id} = router.query
  const login = () => {
    router.back();
  };
  const home = () => {
    router.push("/");
  };
  return (
    <div className={style.container}>
      <MenuBar />
      {authContext.status === AUTH_STATUS.LOGIN ? "已登入" : "未登入或帳號密碼錯誤"}
      <Button onClick={login}>回登入頁</Button>
      <Button onClick={home}>回首頁</Button>
    </div>
  );
};

export default Test;
