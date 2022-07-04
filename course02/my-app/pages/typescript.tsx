import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

//基本資料型態
let heading: string="ben";//explicit type
heading = "Wu";
let heading2="I am ben";//implicit type
//heading2 = 100.00; //Error: Type 'number' is not assignable to type 'string'

//陣列
const names: string[] = ["Mary","Tom"];
names.push("Ben");
//console.log(names);
//names.push(12);//Argument of type 'number' is not assignable to parameter of type 'string'.
//console.log(names);

//物件
/*
const product: { type: string, price: number, desc:string } = {
  //Property 'desc' is missing in type '{ type: string; price: number; }' but required in type '{ type: string; price: number; desc: string; }'
  type: "iPhone",
  price: 12000
}
*/

const product: { type: string, price: number, desc?:string } = {
  //desc是optional
  type: "iPhone",
  price: 12000
}


//物件陣列
//desc是optional
const products: { type: string, price: number, desc?:string }[] = 
[
  {
    type: "iPhone",
    price: 12000
  },
  {
    type: "iPad",
    price: 15000,
    desc: "Apple iPad plus"
  }
];

//自訂資料型態
type Product={ type: string, price: number, desc?:string };
const allProducts:Product [] = 
[
  {
    type: "iPhone",
    price: 12000
  },
  {
    type: "iPad",
    price: 15000,
    desc: "Apple iPad plus"
  }
];

//interface
interface Book { type: string, price: number, desc?:string };
const allBooks:Book [] = 
[
  {
    type: "iPhone",
    price: 12000
  },
  {
    type: "iPad",
    price: 15000,
    desc: "Apple iPad plus"
  }
];

function getInterest(balance:number):number{
  return balance * .006;
}



//傳入參數一定要有資料型態 回傳值可以不用

function testAny(option:number){
  if (option===0){
    return "test";
  }
  else {
    return 0;
  }

}

//type union && typeof
function add(first:string | number, second:string | number): number{
  
  if (typeof first === "string"){
    first = Number(first);
  }
  if (typeof second === "string"){
    second = Number(second);
  }

  return first + second;

}

enum AccountType {
  regular, saving
}
function checkAccountType(type: AccountType){
  switch(type){
    case AccountType.regular:
      return "Regular Account";
    case AccountType.saving:
      return "Saving Account";
    default:
      return "Regular Account";
  }
}



const TestPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>{heading}</h1>
      <h2>{heading2}</h2>
      {getInterest(10000)}<br/>
      {checkAccountType(AccountType.regular)}<br/>
      {add("1","2")}<br/>
      {add(1,2)}<br/>
      {add(1,"2")}<br/>
    </div>
  )
}

export default TestPage
