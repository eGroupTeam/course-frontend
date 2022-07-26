import { combineReducers } from "redux";
import { dialogs } from "@eGroupTeam/redux-modules/dialogs";
import { snackbars } from "@eGroupTeam/redux-modules/snackbars";

import basic from "./basic";

export const rootReducer = combineReducers({
  dialogs,
  snackbars,
  basic,
});

export type RootState = ReturnType<typeof rootReducer>;
