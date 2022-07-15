import styles from '/styles/Home.module.css';
import ProductListItem from '@/components/product/ProductListItem';
import ProductCreate from '@/components/product/ProductCreate';
import {Product} from '@/interfaces/entities';
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

const ProductList = () => {

  // const [products, setProducts]=useState<Product[]>([
  //   {desc:"iPad", price:20000},
  //   {desc:"iPhone X", price:30000}
  // ])
  const [products, setProducts]=useState<Product[]>([])


  
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData () {
      const result = await axios.get("http://localhost:8080/product");
      //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
      setProducts(result.data);
    }
    fetchData();
  },[open, deleted]);

  const renderProduct = (product:Product, index:number)=>{
    return <ProductListItem key={product.name} index={product.id} desc={product.name} price={product.price} deleteProduct={deleteProduct}/>
  }

  const addProduct = (product:Product)=>{
    setProducts(currentProducts=>[...currentProducts, product]);
    console.log("hello");
  }

  const deleteProduct = ()=>{
    setDeleted(!deleted);
  }

  const router = useRouter();
  const action = () =>{
    router.push(
      {pathname: '/product/test',
      query: { id: 100 }}
      );
  }

  return (
    <div className={styles.container}>
      <Menu/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {products.map(renderProduct)}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={action}>到測試頁</Button>
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon id = "addProductIcon"/>
      </Fab>
      
      <ProductCreate addProduct={addProduct} open ={open} close={handleClose}/>
      
    </div>
  )
}
export default ProductList