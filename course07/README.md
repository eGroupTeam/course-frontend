# course-frontend
## 第七章 UI介面 2 Form的處理
### react-hook-form
透過controlled component事實上在效率上不是很好，因為每做一個動作就要rerender一次，所以，比較好的方式是使用一些套件，form的類似套件很多，但因為react-hook-form是透過uncontrolled component，所以，使用的人更多了。目前react-hook-form的最新版本是7.33.1。

接下來我們就根據使用說明來改一下我們的程式:[Get Started](https://react-hook-form.com/get-started)，因為我們使用的是typescript，請選擇typescript範例。

安裝的方式是:

    yarn add react-hook-form

首先，要import相關的套件:

    import { useForm, SubmitHandler } from "react-hook-form";

然後，透過useForm產生相關的函數與物件，其中register是用來登錄欄位，handleSubmit是用來處理送出的資料，watch可以監控變數，formState是form目前的狀態，例如輸入錯誤。onSubmit則是取得回傳的資料，並進行送出的處理。

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

第一個我們會發現handleSubmit重複了，所以，我們先修改一下，把原本handleSubmit的內容放到onSubmit。
另外，我們將Input改為Product。

接下來，加上form。

    <form onSubmit={handleSubmit(onSubmit)}>
    </form>

加上register。

    <input defaultValue="test" {...register("example")} />
    <input {...register("exampleRequired", { required: true })} />

以及submit按鈕。

    <input type="submit" />

清除掉一些不必要的程式碼 (如:useState())。

如果有問體，可以利用watch去看欄位的內容
    console.log(watch("example")) // watch input value by passing the name of it


接下來，來設定一些驗證機制: 設定desc至少5個字，price大於等於0小於等於100000，也要顯示對應的錯誤訊息

      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />

    {errors.exampleRequired && <span>This field is required</span>}

你就會發現，使用react-hook-form讓我們的程式碼乾淨多了!

可以使用[form builder](https://react-hook-form.com/form-builder)研究一下語法。

另外，使用Dialog的時候，習慣上會將Dialog放在同一個元件裡，未來如果要換元件也會比較好，那我們要怎麼改?
** Dialog似乎與react-hook-form會打架，不要放在一起

### 作業 接下來試試看怎麼根據範例讓產品增加一個欄位:庫存量 (stock)，庫存量要大於等於0，增加這個欄位要做哪些修改?