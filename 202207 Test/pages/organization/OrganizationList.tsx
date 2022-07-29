import styles from '/styles/Home.module.css';
import OrganizationListItem from '@/components/organization/OrganizationListItem';
import OrganizationCreateUpdate from '@/components/organization/OrganizationCreateUpdate';
import {Organization} from '@/interfaces/entities';
import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@/components/Layout';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import axios from 'axios';

const OrganizationList = () => {

  const [organizations, setOrganizations]=useState<Organization[]>([])
  const [organization, setOrganization]=useState<Organization>({id:0, createDate:"", name:"", description:"", phone:"", email:"", address:""})
  
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const setCurrentOrganization = (organization:Organization) => {
    setOrganization(organization);
    setOpen(true);
  };

  const addOrganization = () => {
    setOrganization(
      {
        id:0,
        createDate:"",
        name:"",
        description:"",
        phone:"",
        email:"",
        address:""
      });
    setOpen(true);
  }

  useEffect(() => {
    async function fetchData () {
      const result = await axios.get("http://localhost:8080/organizations");
      setOrganizations(result.data);
    }
    fetchData();
  },[open, deleted]);

  const renderOrganization = (organization:Organization, index:number)=>{
    return <OrganizationListItem key={organization.id} organization={organization} setCurrentOrganization={setCurrentOrganization} deleteOrganization={deleteOrganization}/>
  }


  const deleteOrganization = ()=>{
    setDeleted(!deleted);
  }

  const router = useRouter();
  const action = () =>{
    router.push(
      {pathname: '/organization/test',
      query: { id: 100 }}
      );
  }

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {organizations.map(renderOrganization)}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" onClick={addOrganization} 
        sx={{position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)}}>
        <AddIcon id = "addOrganizationIcon"/>
      </Fab>
      <OrganizationCreateUpdate open ={open} close={handleClose} organization={organization}/>
    </div>
  )
}
export default OrganizationList