//import {ProductType} from '../../interfaces/entities';

import { Button, IconButton, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  desc:string,
  price:number,
  stock:number,
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
      <TableCell>{props.stock}</TableCell>
      <TableCell align="center">
  <IconButton color="error"  onClick={deleteProduct} component="span">
    <DeleteIcon />
  </IconButton>
</TableCell>
    </TableRow>
  )
}
export default ProductListItem