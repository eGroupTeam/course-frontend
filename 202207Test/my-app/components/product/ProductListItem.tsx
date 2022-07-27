import { IconButton, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Organization, Product } from "@/interfaces/entities";
import axios from "axios";

type Props = {
  product: Product,
  setCurrentProduct(product: Product): void;
  deleteProduct(): void;
}

const ProductListItem: React.FC<Props> = (props) => {
  const deleteProduct = async () => {
    await axios.delete("http://localhost:8080/product/" + props.product.id);
    props.deleteProduct();
  }
  const updateProduct = () => {
    props.setCurrentProduct(props.product);
  }

  return (
    <TableRow>
      <TableCell>{props.product.name}</TableCell>
      <TableCell>{props.product.expla}</TableCell>
      <TableCell>{props.product.seq}</TableCell>
      <TableCell>{props.product.price}</TableCell>
      <TableCell>{props.product.org_id}</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={updateProduct} component="span">
          <BorderColorIcon />
        </IconButton>
        <IconButton color="error" onClick={deleteProduct} component="span">
          <DeleteIcon />
        </IconButton></TableCell>
    </TableRow>
  )
}
export default ProductListItem