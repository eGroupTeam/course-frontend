import styles from '/styles/Home.module.css';
import ProductListItem from '@/components/product/ProductListItem';
import ProductCreateUpdate from '@/components/product/ProductCreateUpdate';
import { Product } from '@/interfaces/entities';
import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProductList = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState<Product>({ id:0, name:"", description:"", order:0, price:0, orgnztnId:0 })

  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const setCurrentProduct = (product: Product) => {
    setProduct(product);
    setOpen(true);
  };

  const addProduct = () => {
    setProduct({ id:0, name:"", description:"", order:0, price:0, orgnztnId:0 });
    setOpen(true);
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:8080/products");
      setProducts(result.data);
    }
    fetchData();
  }, [open, deleted]);

  const renderProduct = (product: Product, index: number) => {
    return <ProductListItem key={product.id} product={product} setCurrentProduct={setCurrentProduct} deleteProduct={deleteProduct} />
  }

  const deleteProduct = () => {
    setDeleted(!deleted);
  }

  const router = useRouter();
  const action = () => {
    router.push(
      {
        pathname: '/product/test',
        query: { productId: 100 }
      }
    );
  }

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {products.map(renderProduct)}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" onClick={addProduct}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)
        }}>
        <AddIcon/>
      </Fab>
      <ProductCreateUpdate open={open} close={handleClose} product={product} />
    </div>
  )
}
export default ProductList;