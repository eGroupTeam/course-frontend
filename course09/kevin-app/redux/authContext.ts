import { createContext } from "react";

export enum AUTH_STATUS {
    LOGIN, LOGOUT
}

export const AuthContext = createContext({
    authStatus: AUTH_STATUS.LOGOUT,
    ///setAuthStatus:(newStatus:AUTH_STATUS)=>{},
    // userName: "guest",
    // setUserName:(newstatus:string)=>{}
})