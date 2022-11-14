//import {ProductType} from '../../interfaces/entities';

import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

type Props = {
  name:string,
  address:string,
  weight:number,
  index:number,
  deleteCustomer():void;
}

const CustomerListItem:React.FC<Props> = (props) => {
  const deleteCustomer = async()=>{
    await axios.delete("http://localhost:8080/customer/"+props.index);
    props.deleteCustomer();
  }
  return (
    <TableRow>
      <TableCell >{props.name}</TableCell>
      <TableCell >{props.address}</TableCell>
      <TableCell>{props.weight}</TableCell>
      <TableCell><Button variant="contained" onClick={deleteCustomer}>刪除</Button></TableCell>
    </TableRow>
  )
}
export default CustomerListItem