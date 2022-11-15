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

  // const [products, setProducts]=useState<Product[]>([
  //   {desc:"iPad", price:20000},
  //   {desc:"iPhone X", price:30000}
  // ])
  const [customers, setCustomers]=useState<Customer[]>([])
  const [customer, setCustomer]=useState<Customer>({id:0, name:"", address:"", weight:0})//product to be updated


  
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
    setCustomer({id:0, name:"", address:"", weight:0});
    setOpen(true);
  }

  useEffect(() => {
    async function fetchData () {

      const result = await axios.get("http://localhost:8080/customer");
      //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
      setCustomers(result.data);
  
    }
    fetchData();
  },[open, deleted]);

  const renderCustomer = (customer:Customer, index:number)=>{
    return <CustomerListItem key={customer.name} customer={customer} setCurrentCustomer = {setCurrentCustomer} deleteCustomer={deleteCustomer}/>
  }

  // const addProduct = (product:Product)=>{
  //   setProducts(currentProducts=>[...currentProducts, product]);
  //   console.log("hello");
  // }

  // const deleteProduct = (index:number)=>{
  //   const temp = [...products];
  //   temp.splice(index,1);
  //   setProducts([...temp]);
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

//return <ProductListItem key={product.name} index={product.id} name={product.name} price={product.price} deleteProduct={deleteProduct}/>
// <ProductCreate addProduct={addProduct} open ={open} close={handleClose}/>