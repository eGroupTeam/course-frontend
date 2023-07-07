import { useEffect, useState } from "react";
import { Organization, Product } from "../../interfaces/entities";
import style from "../../src/styles/Home.module.css";
import { Button, DialogActions, DialogContent, MenuItem, TextField } from "@mui/material";
import axios from "axios";

type Props = {
  updateProduct(product: Product): void;
  onClose(): void;
  id: number;
  name: string;
  description: string;
  price: string;
  sort: string;
  organizationId: number;
};

const ProductUpdate: React.FC<Props> = (props) => {
  const [product, setProduct] = useState<Product>({
    id: props.id,
    name: props.name,
    description: props.description,
    price: props.price,
    sort: props.sort,
    organizationId: props.organizationId
  });
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/organizations");
        const result = response.data;
        setOrganizations(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    props.updateProduct(product);
    setProduct({ id: 0, name: "", description: "", price: "", sort: "", organizationId: 0 });
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
          select
          fullWidth
        >
          {organizations.map((organization) => (
            <MenuItem key={organization.id} value={organization.id}>
              {`${organization.id} - ${organization.name}`}
            </MenuItem>
          ))}
        </TextField>
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

export default ProductUpdate;
