import styles from '/styles/Home.module.css';
import { EmployeeFormInput } from "@/interfaces/form";
import React, { FC } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm, SubmitHandler } from "react-hook-form";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Employee } from '@/interfaces/entities';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

type EmployeeCreateProps = {
    create(input: EmployeeFormInput): void;
    active: boolean;
    close(): void;
}


const EmployeeCreate: FC<EmployeeCreateProps> = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<EmployeeFormInput>();

    const onSubmit: SubmitHandler<EmployeeFormInput> = newEmployee => {
        console.log("submit");
        props.create(newEmployee);
        props.close();
    };

    const handleClose = () => {
        props.close();
    };
    return (
        <div className={styles.container}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog open={props.active} onClose={props.close}>
                    <DialogTitle>增加員工</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <TextField id="filled-basic" label="員工姓名" variant="outlined" {...register("name", { required: true, minLength: 1 })} /><br />
                            {errors.name && <span>姓名至少兩個字<br /></span>}
                            <FormLabel id="employee-gender-label">性別</FormLabel>
                            <RadioGroup id="filled-basic" row aria-labelledby="employee-gender-label" {...register("gender", {required: true })}>
                                <FormControlLabel value='1' control={<Radio />} label="女" />
                                <FormControlLabel value='0' control={<Radio />} label="男" />
                            </RadioGroup>
                            {errors.gender && <span>必須選擇性別<br /></span>}
                            <TextField id="filled-basic" label="年齡" variant="outlined" type="number"{...register("age", { min: 15, max: 75 })} /><br />
                            {errors.age && <span>年齡介於15到75歲<br /></span>}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleSubmit(onSubmit)}>送出</Button>
                        <Button color="success" variant="contained" onClick={handleClose}>取消</Button>
                    </DialogActions>
                </Dialog>
            </form>

        </div>
    )
}
/*
    <FormControl>
      <FormLabel id="employee-gender-label">性別</FormLabel>
      <RadioGroup row aria-labelledby="employee-gender-label" name="gender">
        <FormControlLabel value='F' control={<Radio />} label="女" />
        <FormControlLabel value='M' control={<Radio />} label="男" />
      </RadioGroup>
    </FormControl>
  );
}*/
export default EmployeeCreate;