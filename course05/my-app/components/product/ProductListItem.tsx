//import {ProductType} from '../../interfaces/entities';

type Props = {
  desc:string,
  price:string,
  stock:string,
  index:number,
  deleteProduct(index:number):void;
}

const ProductListItem:React.FC<Props> = (props) => {
  const deleteProduct = ()=>{
    props.deleteProduct(props.index)
  }
  return (
    <tr>
      <td>{props.desc}</td>
      <td>{props.price}</td>
      <td>{props.stock}</td>
      <td><button onClick={deleteProduct}>修改</button></td>
      <td><button onClick={deleteProduct}>刪除</button></td>
    </tr>
  )
}
export default ProductListItem