import {Product} from '../../interfaces/entities';
import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import axios from 'axios';

type Props = {
  product:Product,
  setCurrentProduct(product:Product):void;
  deleteProduct():void;
}

const ProductListItem:React.FC<Props> = (props) => {
  const deleteProduct = async()=>{
    await axios.delete("http://localhost:8080/product/"+props.product.id);
    props.deleteProduct();
  }
  const updateProduct = ()=>{
    props.setCurrentProduct(props.product);
  }
  
  return (
    <TableRow>
      <TableCell >{props.product.id}</TableCell>
      <TableCell >{props.product.name}</TableCell>
      <TableCell >{props.product.description}</TableCell>
      <TableCell>{props.product.price}</TableCell>
      <TableCell >{props.product.orgnztnName}</TableCell>
      <TableCell>
        <Button variant="contained" onClick={updateProduct}>修改</Button>
        <Button variant="contained" color="secondary" onClick={deleteProduct}>刪除</Button>
      </TableCell>
    </TableRow>
  )
}
export default ProductListItem