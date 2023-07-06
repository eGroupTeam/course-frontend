import {
  Button,
  Dialog,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import OrganizationUpdate from "./OrganizationUpdate";
import { Organization } from "../../interfaces/entities"; 

type Props = {
  id: number;
  name: string;
  description: string;
  date: string;
  tel: string;
  mail: string;
  address: string;
  index: number;
  deleteOrganization(index: number): void;
  updateOrganization(organization:Organization): void;
};

const OrganizationListItem: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const deleteOrganization = () => {
    props.deleteOrganization(props.id);
  };

  const updateOrganization = (organization:Organization) => {
    props.updateOrganization(organization);
  };

  const handlerClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.date}</TableCell>
      <TableCell>{props.tel}</TableCell>
      <TableCell>{props.mail}</TableCell>
      <TableCell>{props.address}</TableCell>
      <TableCell>
        <Button variant="contained" onClick={handlerClickOpen}>
          修改
        </Button>
        <Button variant="contained" onClick={deleteOrganization}>
          刪除
        </Button>
      </TableCell>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增</DialogTitle>
        <OrganizationUpdate
          updateOrganization={updateOrganization}
          onClose={handleClose}
          id={props.id}
          name={props.name}
          description={props.description}
          date={props.date}
          tel={props.tel}
          mail={props.mail}
          address={props.address}
        />
      </Dialog>
    </TableRow>
  );
};

export default OrganizationListItem;
