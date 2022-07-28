export type Product = {
  productId:number, productName:string, productDesc:string, productSort:number, productPrice:number, organizationId:number
}
export type Login = {
  id:string, password:string
}

export type Organization = {
  organizationId:number, createDate:string, organizationName:string, organizationIntro:string, organizationTel:string, organizationMail:string, organizationAddr:string,
}