import { Button, IconButton, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  name:string,
  department:string,
  pay:number,
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
      <TableCell>{props.pay}</TableCell>
      <TableCell align="center">
        <IconButton color="error"  onClick={deleteEmployee} component="span">
            <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default EmployeeListItem