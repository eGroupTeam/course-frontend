import ProductListItem from "../../../conponents/product/ProductListItem";
import ProductCreate from "../../../conponents/product/ProductCreate";
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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MenuBar from "../../../conponents/ui/MenuBar";
import axios from "axios";

const Product = () => {
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
    };
    fetchData();
    console.log(products);
  }, []);
  console.log(products);

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
      await axios.put(`http://localhost:8080/products/${product.id}`, product);

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

  return (
    <div>
      <MenuBar />
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>產品名稱</TableCell>
              <TableCell align="right">產品描述</TableCell>
              <TableCell align="right">產品排序</TableCell>
              <TableCell align="right">產品價格</TableCell>
              <TableCell align="right">產品所屬單位id</TableCell>
              <TableCell align="center">功能列</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow><TableCell align="center" colSpan={6}>目前無資料</TableCell></TableRow>
            ) : (
              products.map((product, index) => (
                <ProductListItem
                  key={product.description}
                  index={index}
                  {...product}
                  deleteProduct={deleteProduct}
                  updateProduct={updateProduct}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Product;
