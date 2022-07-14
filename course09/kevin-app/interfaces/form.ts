/**
 * Form input interfaces
 */

import { Gender } from "./utils";

export interface EmployeeFormInput {
    name: string;
    gender:Gender;
    age:number;
}

export interface UserLogin {
    id:string;
    password:string;
}