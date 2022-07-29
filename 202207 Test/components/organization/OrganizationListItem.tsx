//import {OrganizationType} from '../../interfaces/entities';

import { Organization } from "@/interfaces/entities";
import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

type Props = {
  // index: number;
  // desc:string,
  // name:string,
  // intro:string,
  // tel:string,
  // mail:string,
  // addr:string,
  organization:Organization;
  setCurrentOrganization(organization:Organization): void;
  deleteOrganization():void;
}

const OrganizationListItem:React.FC<Props> = (props) => {
  const deleteOrganization = async()=>{
    await axios.delete("http://localhost:8080/organization/"+props.organization.id);
    props.deleteOrganization();
  }
  const updateOrganization = ()=>{
    props.setCurrentOrganization(props.organization);
  }
  return (
    <TableRow>
      <TableCell >{props.organization.id}</TableCell>
      <TableCell >{props.organization.createDate}</TableCell>
      <TableCell>{props.organization.name}</TableCell>
      <TableCell>{props.organization.description}</TableCell>
      <TableCell>{props.organization.phone}</TableCell>
      <TableCell>{props.organization.email}</TableCell>
      <TableCell>{props.organization.address}</TableCell>
      <TableCell>
        <Button variant="contained" onClick={updateOrganization}>修改</Button>
        <Button variant="contained" onClick={deleteOrganization}>刪除</Button>
      </TableCell>
    </TableRow>
  )
}
export default OrganizationListItem