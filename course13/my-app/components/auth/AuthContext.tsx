import { createContext } from "react";

export enum AUTH_STATUS {
  LOGOUT, LOGIN
}
export const AuthContext = createContext({
  status: AUTH_STATUS.LOGIN,
  setStatus:(newStatus:AUTH_STATUS)=>{}
})