import {
  Button,
  Dialog,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import ProductUpdate from "./ProductUpdate";
import { Product } from "../../interfaces/entities"; 

type Props = {
  id: number;
  name: string;
  description: string;
  price: string;
  sort: string;
  organizationId: number;
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
      <TableCell>{props.name}</TableCell>
      <TableCell align="right">{props.description}</TableCell>
      <TableCell align="right">{props.sort}</TableCell>
      <TableCell align="right">{props.price}</TableCell>
      <TableCell align="right">{props.organizationId}</TableCell>
      <TableCell align="center">
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
          name={props.name}
          description={props.description}
          price={props.price}
          sort={props.sort}
          organizationId={props.organizationId}
        />
      </Dialog>
    </TableRow>
  );
};

export default ProductListItem;
