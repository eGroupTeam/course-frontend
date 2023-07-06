import { useState } from "react";
import { Product } from "../../interfaces/entities";
import style from "../../src/styles/Home.module.css";
import { Button, DialogActions, DialogContent, TextField } from "@mui/material";

type Props = {
  addProduct(product: Product): void;
  onClose(): void;
};

const ProductCreate: React.FC<Props> = (props) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: "",
    sort: "",
    organizationId: 0,
  });
  const handeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    props.addProduct(product);
    console.log(product);
    setProduct({
      id: 0,
      name: "",
      description: "",
      price: "",
      sort: "",
      organizationId: 0,
    });
    props.onClose();
  };
  return (
    <div className={style.container}>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="產品名稱"
          variant="outlined"
          name="name"
          value={product.name}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="產品描述"
          variant="outlined"
          name="description"
          value={product.description}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="產品價格"
          variant="outlined"
          name="price"
          value={product.price}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="產品排序"
          variant="outlined"
          name="sort"
          value={product.sort}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="製作公司"
          variant="outlined"
          name="organizationId"
          value={product.organizationId}
          onChange={handeChange}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          送出
        </Button>
        <Button color="secondary" variant="contained" onClick={props.onClose}>
          取消
        </Button>
      </DialogActions>
    </div>
  );
};

export default ProductCreate;
