import { Organization } from "@/interfaces/entities";
import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

type Props = {
    organization: Organization,
    setCurrentOrganization(organization: Organization): void;
    deleteOrganization(): void;
}

const OrganizationListItem: React.FC<Props> = (props) => {
    const deleteOrganization = async () => {
        await axios.delete("http://localhost:8080/organization/" + props.organization.id);
        props.deleteOrganization();
    }
    const updateOrganization = () => {
        props.setCurrentOrganization(props.organization);
    }


    return (
        <TableRow>
            <TableCell>{props.organization.id}</TableCell>
            <TableCell>{props.organization.name}</TableCell>
            <TableCell>{props.organization.set_time}</TableCell>
            <TableCell>{props.organization.desc}</TableCell>
            <TableCell>{props.organization.contactnum}</TableCell>
            <TableCell>{props.organization.mail}</TableCell>
            <TableCell>{props.organization.address}</TableCell>
            <TableCell>
                <Button variant="contained" onClick={updateOrganization}>修改</Button>
                <Button variant="contained" onClick={deleteOrganization}>刪除</Button>
            </TableCell>
        </TableRow>
    )
}
export default OrganizationListItem