import styles from '/styles/Home.module.css';
import CustomerListItem from '@/components/customer/CustomerListItem';
import CustomerCreate from '@/components/customer/CustomerCreate';
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

  // const [products, setProducts]=useState<Product[]>([
  //   {desc:"iPad", price:20000},
  //   {desc:"iPhone X", price:30000}
  // ])
  const [customers, setCustomers]=useState<Customer[]>([])


  
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData () {
      const result = await axios.get("http://localhost:8080/customer");
      //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
      setCustomers(result.data);
    }
    fetchData();
  },[open, deleted]);

  const renderCustomer = (customer:Customer, index:number)=>{
    return <CustomerListItem key={customer.name} index={customer.id} name={customer.name} address={customer.address} weight={customer.weight} deleteCustomer={deleteCustomer}/>
  }

  const addCustomer = (customer:Customer)=>{
    setCustomers(currentCustomers=>[...currentCustomers, customer]);
    console.log("hello");
  }

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
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon id = "addCustomerIcon"/>
      </Fab>
      
      <CustomerCreate addCustomer={addCustomer} open ={open} close={handleClose}/>
      
    </div>
  )
}
export default CustomerList