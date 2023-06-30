import ProductListItem from "../../../components/product/ProductListItem";
import ProductCreate from "../../../components/product/ProductCreate";
import style from "../../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Product } from "../../../interfaces/entities";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogTitle,
  Fab,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import MenuBar from "../../../components/ui/MenuBar";
import axios from "axios";

const ProductList = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        const result = response.data;
        setProducts(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    console.log(products);
  }, []);

  const addProduct = async (product: Product) => {
    try {
      await axios.post("http://localhost:8080/products", product);
  
      const response = await axios.get("http://localhost:8080/products");
      const updatedProducts = response.data;
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      await axios.put("http://localhost:8080/products", product);
  
      const response = await axios.get("http://localhost:8080/products");
      const updatedProducts = response.data;
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
  
      const response = await axios.get("http://localhost:8080/products");
      const updatedProducts = response.data;
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = () => {
    router.push({ pathname: "/product/test", query: { id: 1 } });
  };
  return (
    <div className={style.container}>
      <MenuBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {/* spread寫法比較像複製內容 如果a為一陣列 a=b會讓b跟a有一樣的記憶體位置 這樣b的改變也會影響a 所以才去需要...的用法 */}
            {products.map((product, index) => (
              <ProductListItem
                key={product.description}
                index={index}
                {...product}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={action}>到測試頁</Button>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增</DialogTitle>
        <ProductCreate addProduct={addProduct} onClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default ProductList;
