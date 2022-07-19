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
import { useSession } from 'next-auth/react'

const ProductList = () => {

  // const [products, setProducts]=useState<Product[]>([
  //   {desc:"iPad", price:20000},
  //   {desc:"iPhone X", price:30000}
  // ])
  const [products, setProducts]=useState<Product[]>([])
  const [product, setProduct]=useState<Product>({id:0, name:"", price:0})//product to be updated


  
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
    setProduct({id:0, name:"", price:0});
    setOpen(true);
  }

  //const {data:session} = useSession();
  //const { data } = useSession();
  //const { accessToken } = data;
  const { data: token, status } = useSession()
  useEffect(() => {
    async function fetchData () {
      //there is no bearer token to send  
      if(token){
        //console.log("token in fetch data:",token);
        console.log("id token:",token.idToken);
        const config = {
          headers: { Authorization: `Bearer ${token.idToken}` }
        };
        const spring_uri=process.env.SPRING_URL??"https://09de-140-136-129-62.ngrok.io";
        console.log("spring_uri:",spring_uri);
        const result = await axios.get(spring_uri+"/product",config);
        setProducts(result.data);
      }
      else{
        console.log("ERROR: not logged in!");
      }

      //const result = await axios.get("https://afa01a7e-4812-4f9e-8023-57f519907050.mock.pstmn.io/product");
      
  
    }
    fetchData();
  },[open, deleted,token]);

  const renderProduct = (product:Product, index:number)=>{
    return <ProductListItem key={product.name} product={product} setCurrentProduct = {setCurrentProduct} deleteProduct={deleteProduct}/>
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
      <Fab color="primary" aria-label="add" onClick={addProduct} 
        sx={{position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)}}>
        <AddIcon id = "addProductIcon"/>
      </Fab>
      
      <ProductCreateUpdate open ={open} close={handleClose} product={product}/>
      
    </div>
  )
}
export default ProductList

//return <ProductListItem key={product.name} index={product.id} name={product.name} price={product.price} deleteProduct={deleteProduct}/>
// <ProductCreate addProduct={addProduct} open ={open} close={handleClose}/>