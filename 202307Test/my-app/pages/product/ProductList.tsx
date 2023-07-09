import styles from '/styles/Home.module.css';
import ProductListItem from '@/components/product/ProductListItem';
import ProductCreateUpdate from '@/components/product/ProductCreateUpdate';
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
  //   {desc:"iPad", productPrice:20000},
  //   {desc:"iPhone X", productPrice:30000}
  // ])
  const [products, setProducts]=useState<Product[]>([])
  const [product, setProduct]=useState<Product>({productId:0, productName:"", productDesc:"", productSort:0, productPrice:0, organizationId:0})//product to be updated


  
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const setCurrentProduct = (product:Product) => {
    setProduct(product);
    setOpen(true);
  };

  const addProduct = () => {
    setProduct({productId:0, productName:"", productDesc:"", productSort:0, productPrice:0, organizationId:0});
    setOpen(true);
  }

  useEffect(() => {
    async function fetchData () {

      const result = await axios.get("http://localhost:8080/product");
      //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
      setProducts(result.data);
  
    }
    fetchData();
  },[open, deleted]);

  const renderProduct = (product:Product, index:number)=>{
    return <ProductListItem key={product.productName} product={product} setCurrentProduct = {setCurrentProduct} deleteProduct={deleteProduct}/>
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

  const deleteProduct = ()=>{
    setDeleted(!deleted);
  }

  const router = useRouter();
  const action = () =>{
    router.push(
      {pathname: '/product/test',
      query: { productId: 100 }}
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
      <Fab color="primary" aria-label="add" onClick={addProduct} 
        sx={{position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)}}>
        {/* <AddIcon productId = "addProductIcon"/> */}
      </Fab>
      
      <ProductCreateUpdate open ={open} close={handleClose} product={product}/>
      
    </div>
  )
}
export default ProductList

//return <ProductListItem key={product.productName} index={product.productId} productName={product.productName} productPrice={product.productPrice} deleteProduct={deleteProduct}/>
// <ProductCreate addProduct={addProduct} open ={open} close={handleClose}/>