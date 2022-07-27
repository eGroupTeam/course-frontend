import styles from '/styles/Home.module.css';
import ProductListItem from '@/components/product/ProductListItem';
import ProductCreate from '@/components/product/ProductCreateUpdate';
import { Product } from '@/interfaces/entities';
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
import { styled, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';
import ProductCreateEdit from '@/components/product/ProductCreateUpdate';

const ProductList = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState<Product>({ id: 0, name: "", desc: "", order: 0, price: 0, dep: 0 })//product to be updated



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
    setProduct({ id: 0, name: "", desc: "", order: 0, price: 0, dep: 0 });
    setOpen(true);
  }

  useEffect(() => {
    async function fetchData() {

      const result = await axios.get("http://localhost:8080/product");
      setProducts(result.data);

    }
    fetchData();
  }, [open, deleted]);

  const renderProduct = (product: Product, index: number) => {
    return <ProductListItem key={product.name} product={product} setCurrentProduct={setCurrentProduct} deleteProduct={deleteProduct} />
  }

  const deleteProduct = () => {
    setDeleted(!deleted);
  }

  const router = useRouter();
  const action = () => {
    router.push(
      {
        pathname: '/product/test',
        query: { id: 100 }
      }
    );
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className={styles.container}>
      <Menu />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>產品名稱</StyledTableCell>
              <StyledTableCell>產品介紹</StyledTableCell>
              <StyledTableCell>排序</StyledTableCell>
              <StyledTableCell>價格</StyledTableCell>
              <StyledTableCell>所屬部門</StyledTableCell>
              <StyledTableCell>操作</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(renderProduct)}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" onClick={addProduct}>
        <AddIcon id="addProduct" />
      </Fab>

      <ProductCreateEdit open={open} close={handleClose} product={product} />

    </div>
  )
}
export default ProductList