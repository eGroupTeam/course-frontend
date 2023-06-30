import styles from '/styles/Home.module.css';
import ProductListItem from '../../components/product/ProductListItem';
import ProductCreate from '../../components/product/ProductCreate';
import {Product} from '../../interfaces/entities';
import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Menu from '../../components/product/Menu';

const ProductList = () => {
  const [products, setProducts]=useState<Product[]>([
    {desc:"iPad", price:20000, stock:3000},
    {desc:"iPhone X", price:30000, stock:175000}
  ])
  const [open, setOpen] = useState(false);

  const renderProduct = (product:Product, index:number)=>{
    return <ProductListItem key={product.desc} index={index} desc={product.desc} price={product.price} stock={product.stock} deleteProduct={deleteProduct}/>
    //return <li key={product.desc}>{product.desc}/{product.price}</li>
  }

  const addProduct = (product:Product)=>{
    setProducts(currentProducts=>[...currentProducts, product]);
    setOpen(false);
  }

  const deleteProduct = (index:number)=>{
    const temp = [...products];
    temp.splice(index,1);
    setProducts([...temp]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增產品</DialogTitle>
        <ProductCreate addProduct={addProduct} close={handleClose}/>
      </Dialog>
    </div>
  )
}
export default ProductList