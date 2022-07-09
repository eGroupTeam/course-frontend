import {Gender} from './utils'

export type Product = {
  desc:string, price:number
}

export interface Employee {
  id: number;
  name: string;
  gender:Gender;
  age:number;
}