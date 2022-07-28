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
    await axios.delete("http://localhost:8080/organization/"+props.organization.organizationId);
    props.deleteOrganization();
  }
  const updateOrganization = ()=>{
    props.setCurrentOrganization(props.organization);
  }
  return (
    <TableRow>
      <TableCell >{props.organization.organizationId}</TableCell>
      <TableCell >{props.organization.createDate}</TableCell>
      <TableCell>{props.organization.organizationName}</TableCell>
      <TableCell>{props.organization.organizationIntro}</TableCell>
      <TableCell>{props.organization.organizationTel}</TableCell>
      <TableCell>{props.organization.organizationMail}</TableCell>
      <TableCell>{props.organization.organizationAddr}</TableCell>
      <TableCell>
        <Button variant="contained" onClick={updateOrganization}>修改</Button>
        <Button variant="contained" onClick={deleteOrganization}>刪除</Button>
      </TableCell>
    </TableRow>
  )
}
export default OrganizationListItem