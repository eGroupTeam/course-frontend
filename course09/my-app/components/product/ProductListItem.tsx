//import {ProductType} from '../../interfaces/entities';

import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";

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
    <TableRow>
      <TableCell >{props.desc}</TableCell>
      <TableCell>{props.price}</TableCell>
      <TableCell><Button variant="contained" onClick={deleteProduct}>刪除</Button></TableCell>
    </TableRow>
  )
}
export default ProductListItem