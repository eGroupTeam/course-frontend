import { Middleware } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./privateLayout";
import { RootState } from "./root";

export const authMiddleware: Middleware<Record<string, unknown>, RootState> =
  () => (next) => (action: PayloadAction<unknown>) => {
    if (logout.match(action)) {
      return undefined;
    }
    return next(action);
  };
