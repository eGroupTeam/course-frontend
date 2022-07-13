//import {EmployeeType} from '../../interfaces/entities';

import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";

type Props = {
  name:string,
  department:string,
  salary:number,
  index:number,
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
      <TableCell>{props.salary}</TableCell>
      <TableCell><Button variant="contained" onClick={deleteEmployee}>刪除</Button></TableCell>
    </TableRow>
  )
}
export default EmployeeListItem