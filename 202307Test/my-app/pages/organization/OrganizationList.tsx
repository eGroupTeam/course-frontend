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
import Menu from '@/components/ui/Menu';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import axios from 'axios';

const OrganizationList = () => {

  // const [organizations, setOrganizations]=useState<Organization[]>([
  //   {desc:"iPad", price:20000},
  //   {desc:"iPhone X", price:30000}
  // ])
  const [organizations, setOrganizations]=useState<Organization[]>([])
  const [organization, setOrganization]=useState<Organization>({organizationId:0, createDate:"", organizationName:"", organizationIntro:"", organizationTel:"", organizationMail:"", organizationAddr:""})//organization to be updated


  
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
    setOrganization({organizationId:0, createDate:"", organizationName:"", organizationIntro:"", organizationTel:"", organizationMail:"", organizationAddr:""});
    setOpen(true);
  }

  useEffect(() => {
    async function fetchData () {

      const result = await axios.get("http://localhost:8080/organization");
      //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/organization");
      setOrganizations(result.data);
  
    }
    fetchData();
  },[open, deleted]);

  const renderOrganization = (organization:Organization, index:number)=>{
    return <OrganizationListItem key={organization.organizationName} organization={organization} setCurrentOrganization={setCurrentOrganization} deleteOrganization={deleteOrganization}/>
  }

  // const addOrganization = (organization:Organization)=>{
  //   setOrganizations(currentOrganizations=>[...currentOrganizations, organization]);
  //   console.log("hello");
  // }

  // const deleteOrganization = (index:number)=>{
  //   const temp = [...organizations];
  //   temp.splice(index,1);
  //   setOrganizations([...temp]);
  //   setDeleted(!deleted);
  // }

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
      <Menu/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {organizations.map(renderOrganization)}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={action}>到測試頁</Button>
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

//return <OrganizationListItem key={organization.name} index={organization.id} name={organization.name} price={organization.price} deleteOrganization={deleteOrganization}/>
// <OrganizationCreate addOrganization={addOrganization} open ={open} close={handleClose}/>