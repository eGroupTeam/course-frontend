# course-frontend

## 第十四章 檔案上傳、發送電子郵件

### Multipart 傳送檔案

基本上，在 HTML 裡，早就內建了檔案上傳的元件，只要把 input type 設定為 file，就好了，只是，因為不是傳送一般的文字內容，透過 http post 傳送的時候，有些設定要調整。

- [How to Multipart File Upload Using FormData with React Hook Form](https://refine.dev/blog/how-to-multipart-file-upload-with-react-hook-form/)

首先，先產生一個測試頁面 (pages/product/image.tsx)。利用 React-Hook-Form 產生一個 form，並設定 input type。

    import styles from '/styles/Home.module.css';
    import Button from "@mui/material/Button";
    import { SubmitHandler, useForm } from "react-hook-form";
    import Input from '@mui/material/Input';

    type Data = {
      file: FileList
    }

    const TestImage = () => {

        const { register, handleSubmit, watch, formState: { errors } } = useForm<Data>();
        const onSubmit: SubmitHandler<Data> = async data => {
          console.log("file:",data.file);

        };
        const handleClose = () => {
        };


        return (
          <div className={styles.container}>

            <form onSubmit={handleSubmit(onSubmit)}>
              檔案:
              <Input inputProps={{ accept: 'image/*' }} id="filled-basic" type="file" {...register("file",{required:true})}/><br/>
              {errors.file && <span>必須上傳檔案<br/></span>}
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>送出</Button>
              <Button color="secondary" variant="contained" onClick={handleClose}>取消</Button>
            </form>

          </div>
        )
    }
    export default TestImage

注意一下，material-ui 的 Input 不接受「accept」，所以，要轉個彎利用 inputProps 去設定。

可是看起來有點醜，可以美化一下:

- [Upload button](https://mui.com/material-ui/react-button/#UploadButtons.js)

          <Button variant="contained" component="label">
          上傳
          <input hidden accept="image/*" id="filled-basic" type="file" {...register("file",{required:true})}/>
          </Button><br/>

不過，因為我們把 input 藏起來了，所以，也看不到上傳的檔案名稱。所以，我們還是先使用醜醜的 input 好了。I

選完檔案之後，並且按「送出」，可以在 console 看到被選擇的檔案。可以看到收到的是個 FileList 物件，裡面可以放多個檔案，但因為我們沒有在 input 中設定 multiple，所以，不能選擇多個檔案。

接下來，我們把 post 寫好，等待對應的 rest controller。

      const result = await axios.post("http://localhost:8080/file",data.file[0]);

在 spring 的部分，我們新增對應的 rest controller，spring framework 提供 MultipartFile 來接收上傳的檔案。

前端選擇好檔案並按下「送出」之後，會收到 500 的錯誤，看一下後端的錯誤。

org.springframework.web.multipart.MultipartException: Current request is not a multipart request。

問題在於前端送出時沒有處理好，原因是，因為我們要傳遞檔案，不能直接呼叫 post，還要將資料包在 Javascript Web API 提供的 FormData 裡。

      const formData = new FormData();
      formData.append(
        'file',data.file[0]
      )
      const result = await axios.post("http://localhost:8080/file",formData);
      console.log(result);

- [FormData](https://developer.mozilla.org/zh-TW/docs/Web/API/FormData)
- [一起理解 HTML 當中的 form-data](https://blog.kalan.dev/2021-03-13-html-form-data/)
- [form 標籤與 FormData 的應用](https://blog.kalan.dev/2021-03-13-form-and-form-data/)

在 console.log 可以看到

{data: 'OK', status: 200, statusText: 'OK', headers: {…}, config: {…}, …}

這樣就可以把檔案上傳了，接下來就都是後段的工作了。

要在 next 上顯示圖檔，請參考:

- [Image Component and Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [next/image](https://nextjs.org/docs/api-reference/next/image)

- [next/image Un-configured Host](https://nextjs.org/docs/messages/next-image-unconfigured-host)

### 利用 Spring Mail 發送電子郵件

處理一下錯誤

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

#### 作業 設定一下如何利用你自己的 email 帳號，在上傳檔案後，送出通知郵件
