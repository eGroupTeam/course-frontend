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
import Menu from '@/components/product/menu';
import axios from 'axios';
import { styled, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>({ id: 0, name: "", expla: "", seq: 0, price: 0, org_id: 0 })



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
        setProduct({ id: 0, name: "", expla: "", seq: 0, price: 0, org_id: 0 });
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
            <Menu />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>商品名稱</StyledTableCell>
                            <StyledTableCell>商品說明</StyledTableCell>
                            <StyledTableCell>商品排序</StyledTableCell>
                            <StyledTableCell>商品價格</StyledTableCell>
                            <StyledTableCell>所屬單位編號</StyledTableCell>
                            <StyledTableCell>修改/刪除產品</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(renderProduct)}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Fab color="primary" variant="extended" onClick={addProduct} sx={{ position: "fixed", right: (theme) => theme.spacing(4) }}>
                <AddIcon sx={{ mr: 1 }} />
                新增產品
            </Fab>
            <ProductCreate open={open} close={handleClose} product={product} />

        </div>
    )
}
export default ProductList