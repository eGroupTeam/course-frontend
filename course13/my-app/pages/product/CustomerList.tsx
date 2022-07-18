import styles from '/styles/Home.module.css';
import CustomerListItem from '@/components/customer/CustomerListItem';
import CustomerCreateUpdate from '@/components/customer/CustomerCreateUpdate';
import {Customer} from '@/interfaces/entities';
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

const CustomerList = () => {

  // const [customers, setCustomers]=useState<Customer[]>([
  //   {desc:"iPad", price:20000},
  //   {desc:"iPhone X", price:30000}
  // ])
  const [customers, setCustomers]=useState<Customer[]>([])
  const [customer, setCustomer]=useState<Customer>({id:0, name:"", address:"", weight:""})//customer to be updated


  
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const setCurrentCustomer = (customer:Customer) => {
    setCustomer(customer);
    setOpen(true);
  };

  const addCustomer = () => {
    setCustomer({id:0, name:"", address:"", weight:""});
    setOpen(true);
  }

  useEffect(() => {
    async function fetchData () {

      const result = await axios.get("http://localhost:8080/customer");
      //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/customer");
      setCustomers(result.data);
  
    }
    fetchData();
  },[open, deleted]);

  const renderCustomer = (customer:Customer, index:number)=>{
    return <CustomerListItem key={customer.name} customer={customer} setCurrentCustomer = {setCurrentCustomer} deleteCustomer={deleteCustomer}/>
  }

  // const addCustomer = (customer:Customer)=>{
  //   setCustomers(currentCustomers=>[...currentCustomers, customer]);
  //   console.log("hello");
  // }

  // const deleteCustomer = (index:number)=>{
  //   const temp = [...customers];
  //   temp.splice(index,1);
  //   setCustomers([...temp]);
  //   setDeleted(!deleted);
  // }

  const deleteCustomer = ()=>{
    setDeleted(!deleted);
  }

  const router = useRouter();
  const action = () =>{
    router.push(
      {pathname: '/customer/test',
      query: { id: 100 }}
      );
  }

  return (
    <div className={styles.container}>
      <Menu/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {customers.map(renderCustomer)}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={action}>到測試頁</Button>
      <Fab color="primary" aria-label="add" onClick={addCustomer} 
        sx={{position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)}}>
        <AddIcon id = "addCustomerIcon"/>
      </Fab>
      
      <CustomerCreateUpdate open ={open} close={handleClose} customer={customer}/>
      
    </div>
  )
}
export default CustomerList

//return <CustomerListItem key={customer.name} index={customer.id} name={customer.name} price={customer.price} deleteCustomer={deleteCustomer}/>
// <CustomerCreate addCustomer={addCustomer} open ={open} close={handleClose}/>