import styles from '/styles/Home.module.css';
import { Product } from '@/interfaces/entities';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler } from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useMemo } from 'react';

type Props = {
    product: Product,
    close(): void;
    open: boolean;
}

const ProductCreateEdit: React.FC<Props> = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Product>(
        {
            defaultValues: useMemo(() => {
                return props.product;
            }, [props])
        }
    );
    const onSubmit: SubmitHandler<Product> = async product => {
        console.log("id:", product.id);
        if (product.id === 0) {
            await axios.post("http://localhost:8080/product", product);
        }
        else {
            await axios.put("http://localhost:8080/product/" + product.id, product);
        }
        props.close();

    };
    const handleClose = () => {
        props.close();
    };
    console.log(props.product);

    useEffect(() => {
        reset(props.product);
    }, [props.product, reset]);

    return (
        <div className={styles.container}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog open={props.open} onClose={handleClose}>
                    <DialogTitle>新增產品</DialogTitle>
                    <DialogContent>
                        <TextField id="filled-basic" label="產品名稱" variant="outlined" {...register("name", { required: true, minLength: 1 })} /><br />
                        {errors.name && <span>請至少輸入一個字<br /></span>}
                        <TextField id="filled-basic" label="產品描述" variant="outlined" {...register("desc", { required: true, minLength: 5 })} /><br />
                        {errors.desc && <span>描述至少5個字<br /></span>}
                        <TextField id="filled-basic" label="產品排序" variant="outlined" type="number" {...register("order", { min: 0 })} /><br />
                        {errors.order && <span>請輸入排序號碼<br /></span>}
                        <TextField id="filled-basic" label="產品價格" variant="outlined" type="number" {...register("price", { min: 0, max: 100000 })} /><br />
                        {errors.price && <span>價格在0到100000之間<br /></span>}
                        <TextField id="filled-basic" label="所屬部門" variant="outlined" {...register("dep", { required: true, min: 0 })} /><br />
                        {errors.dep && <span>請輸入部門代號<br /></span>}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleSubmit(onSubmit)}>送出</Button>
                        <Button color="secondary" variant="contained" onClick={handleClose}>取消</Button>
                    </DialogActions>
                </Dialog>
            </form>

        </div>
    )
}
export default ProductCreateEdit