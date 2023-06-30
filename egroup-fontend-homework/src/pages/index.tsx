import MenuBar from "../../components/ui/MenuBar";
// import styles from '@/styles/Home.module.css'

//基本資料型態
let heading: string = "Hello World"; //expilict type
let heading2 = "I am Ray"; //implicit type

//陣列
const names: string[] = ["a", "b"]; //可以push其他資料型態 但她會抱錯
names.push("c");
console.log(names);

//物件
const product: { type: string; price: number; desc?: string } = {
  //?讓這個變數變為optional
  type: "iPhone",
  price: 20000,
};

//物件陣列
const produets: { type: string; price: number; desc?: string }[] = [
  {
    type: "iPhone",
    price: 20000,
  },
  {
    type: "iPhone",
    price: 20000,
    desc: "adkmal",
  },
];

//自訂資料型態
type Product = { type: string; price: number; desc?: string };
const allProducts: Product[] = [
  {
    type: "iPhone",
    price: 20000,
  },
  {
    type: "iPhone",
    price: 20000,
    desc: "adkmal",
  },
];

//函式(傳入參數一定要有資料型態 回傳值可以不用)
function getInterest(input: number): number {
  return input * 0.6;
}

//type union
function add(first: string | number, second: string | number): number {
  if (typeof first === "string") {
    first = Number(first);
  }
  if (typeof second === "string") {
    second = Number(second);
  }
  return first + second;
}

//enum
enum AccountType {
  regular,
  saving, //也可以用這些選項的index來檢測(或是直接設預設值) 在儲存方面其實也是用數字儲存
}
function checkAccountType(type: AccountType) {
  switch (type) {
    case AccountType.regular:
      return "Regular Account";
    case AccountType.saving:
      return "Saving Account";
    default:
      return "Regular Account";
  }
}

//泛型
function testGeneries<T>(parameter: T) {
  if (typeof parameter === "number") {
    return parameter + 1;
  }
  if (typeof parameter === "string") {
    return "p:" + parameter;
  }
}

export default function Home() {
  return (
    <div>
      <MenuBar />
      <h1>{heading}</h1>
      <h2>{heading2}</h2>
    </div>
  );
}
