import styles from '/styles/Home.module.css';
import { Organization } from '@/interfaces/entities';
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
    organization: Organization,
    close(): void;
    open: boolean;
}

const OrganizationCreateUpdate: React.FC<Props> = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Organization>(
        {
            defaultValues: useMemo(() => {
                return props.organization;
            }, [props])
        }
    );
    const onSubmit: SubmitHandler<Organization> = async organization => {
        console.log("id:", organization.id);
        if (organization.id === 0) {
            await axios.post("http://localhost:8080/organization", organization);
        }
        else {
            await axios.put("http://localhost:8080/organization/" + organization.id, organization);
        }
        props.close();

    };
    const handleClose = () => {
        props.close();
    };
    console.log(props.organization);

    useEffect(() => {
        reset(props.organization);
    }, [props.organization, reset]);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog open={props.open} onClose={handleClose}>
                    <DialogTitle>{props.organization.id === 0 ? "新增單位" : "修改單位"}</DialogTitle>
                    <DialogContent>
                        <br />
                        <TextField id="filled-basic" label="單位名稱" variant="outlined" {...register("name", { required: true, minLength: 2 })} /><br />
                        {errors.name && <span>單位名稱至少2個字<br /></span>}<br />
                        <TextField id="filled-basic" label="" variant="outlined" type="date" {...register("date", { required: true, minLength: 5 })} /><br />
                        {errors.date && <span>請選擇單位成立時間<br /></span>}<br />
                        <TextField id="filled-basic" label="單位介紹" variant="outlined" {...register("intro", { required: true, minLength: 5 })} /><br />
                        {errors.intro && <span>單位介紹至少5個字<br /></span>}<br />
                        <TextField id="filled-basic" label="單位電話" variant="outlined" {...register("phone", { required: true, minLength: 8 })} /><br />
                        {errors.phone && <span>請輸入正確的單位電話<br /></span>}<br />
                        <TextField id="filled-basic" label="單位信箱" variant="outlined" {...register("email", { required: true, minLength: 8 })} /><br />
                        {errors.email && <span>請輸入單位信箱<br /></span>}<br />
                        <TextField id="filled-basic" label="單位地址" variant="outlined" {...register("address", { required: true, minLength: 5 })} /><br />
                        {errors.address && <span>請輸入單位地址<br /></span>}<br />
                    </DialogContent>
                    <DialogActions>
                        <Button id="cancel" color="error" variant="contained" onClick={handleClose}>返回</Button>
                        <Button id="submit" variant="contained" onClick={handleSubmit(onSubmit)}>送出</Button>
                    </DialogActions>
                </Dialog>
            </form>

        </div>
    )
}
export default OrganizationCreateUpdate