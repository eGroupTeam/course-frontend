import { IconButton, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Organization } from "@/interfaces/entities";
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
            <TableCell>{props.organization.date}</TableCell>
            <TableCell>{props.organization.intro}</TableCell>
            <TableCell>{props.organization.phone}</TableCell>
            <TableCell>{props.organization.email}</TableCell>
            <TableCell>{props.organization.address}</TableCell>
            <TableCell>
                <IconButton color="primary" onClick={updateOrganization} component="span">
                    <BorderColorIcon />
                </IconButton>
                <IconButton color="error" onClick={deleteOrganization} component="span">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
export default OrganizationListItem