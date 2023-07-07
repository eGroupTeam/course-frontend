import OrganizationCreate from "../../../conponents/organization/OrganizationCreate";
import OrganizationListItem from "../../../conponents/organization/OrganizationListItem";
import style from "../../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Organization } from "../../../interfaces/entities";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Dialog,
  DialogTitle,
  Fab,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import MenuBar from "../../../conponents/ui/MenuBar";
import axios from "axios";

const Organization = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [dateError, setDateError] = useState(false);

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
      await axios.put(
        `http://localhost:8080/organizations/${organizations.id}`,
        organizations
      );

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

  const handeSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.value === "") {
        const response = await axios.get("http://localhost:8080/organizations");
        const result = response.data;
        setOrganizations(result);
      } else {
        const response = await axios.get(
          `http://localhost:8080/organizations/${event.target.value}`
        );
        const result = response.data;

        setOrganizations([result]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateError = () => {
    setDateError(true);
    setTimeout(() => {
        setDateError(false);
      }, 3000);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {dateError && (
        <Stack
          sx={{ width: "20%" }}
          spacing={2}
          style={{
            position: "absolute",
            top: "1rem",
            zIndex: "10000000",
            opacity: dateError ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        >
          <Alert severity="error">日期格式錯誤</Alert>
        </Stack>
      )}
      <MenuBar />
      <TextField
        id="outlined-basic"
        label="用id查找"
        variant="outlined"
        name="organizationId"
        onChange={handeSearchChange}
        style={{ marginTop: "2rem", width: "15rem" }}
        size="small"
      />
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
            {organizations.length !== 0 ? (
              organizations.map((organization, index) => (
                <OrganizationListItem
                  key={organization.description}
                  index={index}
                  {...organization}
                  deleteOrganization={deleteOrganization}
                  updateOrganization={updateOrganization}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={8}
                  style={{
                    fontSize: "1.5rem",
                    color: "rgb(108, 108, 108)",
                    fontWeight: "900",
                    textDecoration: "none",
                  }}
                >
                  目前無資料
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增</DialogTitle>
        <OrganizationCreate
          addOrganization={addOrganization}
          onClose={handleClose}
          onDateError={handleDateError}
        />
      </Dialog>
    </div>
  );
};

export default Organization;
