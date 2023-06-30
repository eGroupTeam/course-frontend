import {
  Button,
  Dialog,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import ProductUpdate from "./ProductUpdate";
import { Product } from "interfaces/entities";

type Props = {
  id: number;
  description: string;
  price: number;
  stock: number;
  index: number;
  deleteProduct(index: number): void;
  updateProduct(product:Product): void;
};

const ProductListItem: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const deleteProduct = () => {
    props.deleteProduct(props.id);
  };

  const updateProduct = (product:Product) => {
    props.updateProduct(product);
  };

  const handlerClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.price}</TableCell>
      <TableCell>{props.stock}</TableCell>
      <TableCell>
        <Button variant="contained" onClick={handlerClickOpen}>
          修改
        </Button>
        <Button variant="contained" onClick={deleteProduct}>
          刪除
        </Button>
      </TableCell>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增</DialogTitle>
        <ProductUpdate
          updateProduct={updateProduct}
          onClose={handleClose}
          id={props.id}
          description={props.description}
          price={props.price}
          stock={props.stock}
        />
      </Dialog>
    </TableRow>
  );
};

export default ProductListItem;
