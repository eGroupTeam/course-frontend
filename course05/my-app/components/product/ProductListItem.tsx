//import {ProductType} from '../../interfaces/entities';

type Props = {
  desc:string,
  price:number,
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
      <td><button onClick={deleteProduct}>刪除</button></td>
    </tr>
  )
}
export default ProductListItem