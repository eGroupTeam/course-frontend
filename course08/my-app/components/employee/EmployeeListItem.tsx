//import {ProductType} from '../../interfaces/entities';

import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";

type Props = {
    index:number,
    name:string,
    department:string,
    wage:number,
    deleteEmployee(index:number):void;
}

const EmployeeListItem:React.FC<Props> = (props) => {
  const deleteEmployee = ()=>{
    props.deleteEmployee(props.index)
  }
  return (
    <TableRow>
      <TableCell >{props.name}</TableCell>
      <TableCell>{props.department}</TableCell>
      <TableCell>{props.wage}</TableCell>
      <TableCell><Button variant="contained" onClick={deleteEmployee}>刪除</Button></TableCell>
    </TableRow>
  )
}
export default EmployeeListItem 