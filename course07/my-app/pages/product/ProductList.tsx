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
import AddIcon from '@mui/icons-material/Add';
import Menu from '../../components/product/Menu';
import Dialog from '@mui/material/Dialog';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DialogTitle from '@mui/material/DialogTitle';

const ProductList = () => {
  const [products, setProducts]=useState<Product[]>([
    {desc:"iPad", price:20000, stock:2000},
    {desc:"iPhone X", price:30000, stock:3212}
  ])
  
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const renderProduct = (product:Product, index:number)=>{
    return <ProductListItem key={product.desc} index={index} desc={product.desc} price={product.price} stock={product.stock} deleteProduct={deleteProduct}/>
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div className={styles.container}>
      <Menu/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>商品型號</StyledTableCell>
            <StyledTableCell>商品售價</StyledTableCell>
            <StyledTableCell>商品庫存</StyledTableCell>
            <StyledTableCell align="center">相關操作</StyledTableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {products.map(renderProduct)}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" variant="extended" onClick={() => setOpen(true)}>
        <AddIcon sx={{ mr: 1 }} />
          新增產品
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增產品</DialogTitle>
        <ProductCreate addProduct={addProduct} open ={open} close={handleClose}/>
      </Dialog>
      
    </div>
  )
}
export default ProductList