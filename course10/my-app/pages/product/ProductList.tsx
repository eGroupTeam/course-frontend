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
  const [products, setProducts]=useState<Product[]>([
    {desc:"iPad", price:20000},
    {desc:"iPhone X", price:30000}
  ])
  
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const renderProduct = (product:Product, index:number)=>{
    return <ProductListItem key={product.desc} index={index} desc={product.desc} price={product.price} deleteProduct={deleteProduct}/>
    //return <li key={product.desc}>{product.desc}/{product.price}</li>
  }

  const addProduct = (product:Product)=>{
    setProducts(currentProducts=>[...currentProducts, product]);
    console.log("hello");
  }

  const deleteProduct = (index:number)=>{
    const temp = [...products];
    temp.splice(index,1);
    setProducts([...temp]);
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
      <Button  onClick={action}>到測試頁</Button>
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon id="addProduct"/>
      </Fab>
      
      <ProductCreate addProduct={addProduct} open ={open} close={handleClose}/>
      
    </div>
  )
}
export default ProductList