import { createContext } from "react";

export enum AUTH_STATUS {
  LOGIN,
  LOGOUT,
}

export const AuthContext = createContext({
  name: "",
  setName: (newName: string) => {},
  status: AUTH_STATUS.LOGOUT,
  setStatus: (newStatus: AUTH_STATUS) => {},
});
