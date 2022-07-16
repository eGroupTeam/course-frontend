import styles from '/styles/Home.module.css';
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from '@mui/material/Input';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
//import Image from 'next/image'

type Data = {
  file: FileList
}

const TestImage = () => {
    const [message, setMessage] = useState("");
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Data>();
    const onSubmit: SubmitHandler<Data> = async data => {
      setMessage("請稍候");
      console.log("file:",data.file);
      const formData = new FormData();
      formData.append(
        'file',data.file[0]
      )
      try{
        const result = await axios.post("http://localhost:8080/file",formData);
        console.log(result);
        setMessage("已上傳");  
      }
      catch (error){
        const err = error as AxiosError
        console.log(error);
        if(err.response?.status===404){
          setMessage("無法送出郵件");
        }
      }
    };
    const handleClose = () => {
    };
  
     
    return (
      <div className={styles.container}>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="contained-button-file">
          <br/>
          <Input inputProps={{ accept: 'image/*' }} id="filled-basic" type="file" {...register("file",{required:true})}/>
          <br/>
          {errors.file && <span>必須上傳檔案<br/></span>}
        </label>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>送出</Button>
          <Button color="secondary" variant="contained" onClick={handleClose}>取消</Button>
        </form>
        {message}
        
      </div>
    )
}
export default TestImage
