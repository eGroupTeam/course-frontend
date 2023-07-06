import OrganizationCreate from "../../../conponents/organization/OrganizationCreate";
import OrganizationListItem from "../../../conponents/organization/OrganizationListItem";
import style from "../../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Organization } from "../../../interfaces/entities";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogTitle,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MenuBar from "../../../conponents/ui/MenuBar";
import axios from "axios";

const Organization = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/organizations");
        const result = response.data;
        setOrganizations(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(organizations);
  }, []);

  const addOrganization = async (organizations: Organization) => {
    try {
      await axios.post("http://localhost:8080/organizations", organizations);
      
      const response = await axios.get("http://localhost:8080/organizations");
      const updatedOrganizations = response.data;
      setOrganizations(updatedOrganizations);
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrganization = async (organizations: Organization) => {
    try {
      await axios.put(`http://localhost:8080/organizations/${organizations.id}`, organizations);

      const response = await axios.get("http://localhost:8080/organizations");
      const updatedOrganizations = response.data;
      setOrganizations(updatedOrganizations);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrganization = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/organizations/${id}`);

      const response = await axios.get("http://localhost:8080/organizations");
      const updatedOrganizations = response.data;
      setOrganizations(updatedOrganizations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style.container}>
      <MenuBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>公司編號</TableCell>
              <TableCell align="right">公司名稱</TableCell>
              <TableCell align="right">公司簡介</TableCell>
              <TableCell align="right">創建日期</TableCell>
              <TableCell align="right">公司電話</TableCell>
              <TableCell align="right">公司信箱</TableCell>
              <TableCell align="right">公司地址</TableCell>
              <TableCell align="center">功能列</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((organization, index) => (
              <OrganizationListItem
                key={organization.description}
                index={index}
                {...organization}
                deleteOrganization={deleteOrganization}
                updateOrganization={updateOrganization}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增</DialogTitle>
        <OrganizationCreate addOrganization={addOrganization} onClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default Organization;
