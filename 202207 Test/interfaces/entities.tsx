export type Product = {
  id:number,
  name:string,
  description:string,
  order:number,
  price:number,
  orgnztnId:number,
  orgnztnName?:string
}

export type Organization = {
  id:number,
  createDate:string,
  name:string,
  description:string,
  phone:string,
  email:string,
  address:string,
}