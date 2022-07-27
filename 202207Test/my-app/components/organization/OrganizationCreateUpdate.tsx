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

const OrganizationCreateEdit: React.FC<Props> = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Organization>(
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
                    <DialogTitle>新增部門</DialogTitle>
                    <DialogContent>
                        <TextField id="filled-basic" label="部門名稱" variant="outlined" {...register("name", { required: true, minLength: 1 })} /><br />
                        {errors.name && <span>請至少輸入一個字<br /></span>}
                        <TextField placeholder="西元年-月-日" id="filled-basic" label="成立時間" variant="outlined" {...register("set_time", { required: true, minLength: 3 })} /><br />
                        {errors.set_time && <span>請輸入:年/月/日<br /></span>}
                        <TextField id="filled-basic" label="部門介紹" variant="outlined" {...register("desc", { required: true, minLength: 5 })} /><br />
                        {errors.desc && <span>描述至少5個字<br /></span>}
                        <TextField id="filled-basic" label="聯絡號碼" variant="outlined" type="number" {...register("contactnum", { min: 8 })} /><br />
                        {errors.contactnum && <span>請輸入號碼<br /></span>}
                        <TextField id="filled-basic" label="信箱" variant="outlined" {...register("mail", { required: true, min: 10 })} /><br />
                        {errors.mail && <span>請輸入電子郵箱<br /></span>}
                        <TextField id="filled-basic" label="地址" variant="outlined" {...register("address", { required: true, min: 6 })} /><br />
                        {errors.address && <span>請輸入地址<br /></span>}
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
export default OrganizationCreateEdit