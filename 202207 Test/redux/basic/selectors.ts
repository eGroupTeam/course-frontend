import { RootState } from "redux/root";

/**
 * API States
 */
export const getCounts = (state: RootState) => state.basic.counts;
