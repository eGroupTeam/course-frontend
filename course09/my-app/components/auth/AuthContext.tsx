import { createContext } from "react";

export enum AUTH_STATUS {
  LOGOUT, LOGIN
}
export const AuthContext = createContext({
  status: AUTH_STATUS,
  status2:String,
  setStatus2:(newStatus:String)=>{},
  setStatus:(newStatus:AUTH_STATUS)=>{}
})