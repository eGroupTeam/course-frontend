# course-frontend

## 第十三章 前後端整合 2

### 修改

首先，先確定後端的 API (put)可以正常運作。

最後，我們來處理修改，修改的部分可以獨立寫一個元件，另一種做法是將修改跟新增寫在一起。將修改跟新增寫在一起比較複雜，但是，因為很多內容可以重複使用，我們就來試試看。

基本上，修改就是要讀取原本的值做為預設值。感覺滿簡單的，但是，要改的內容還不少。

先增加一個 update icon，為了區隔兩個按鈕，更改了一下刪除按鈕的顏色。

        <Button variant="contained" onClick={updateProduct}>修改</Button>
        <Button variant="contained" color="secondary" onClick={deleteProduct}>刪除</Button>

修改跟新增共用同一個元件，我們把檔案命名為 ProductCreateUpdate.tsx，檔案更名後，雖然 import 會跟著改，但是元件名稱不會跟著改，如果要使用新的元件名稱，要記得修改。

接下來，ProductList 可以把要更改的內容直接傳到 ProductCreateUpdate，也可以讓 ProductCreateUpdate 透過 get 去讀內容，當 ProductList 內容的更動不是很頻繁時，其實，不需要透過 get 去讀取內容，當然，也是有些情況下是需要透過 get 去讀內容的。以目前的情境，我們只需要將內容從 ProductList 透過 ProductListItem，傳到 ProductCreateUpdate。另外，我們可以將整個 product 物件傳進 ProductListItem。

    const renderProduct = (product:Product, index:number)=>{
      return <ProductListItem key={product.name} product={product} deleteProduct={deleteProduct}/>
    }

Props 的定義要改一下，當然，變數的使用也要跟著變動

    type Props = {
      product:Product,
      deleteProduct():void;
    }

先試試看新增動作是否還正常。

修改的動作跟刪除不同，要打開 ProductCreateUpdate。所以，要把 setOpen 傳給 ProductListItem。但是，state 變數的函數不能直接傳給元件，所以，我們傳一個函數過去。

在 ProductList:

    const handleOpen = () => {
      setOpen(true);
    };

    const renderProduct = (product:Product, index:number)=>{
      return <ProductListItem key={product.name} product={product} handleOpen = {handleOpen} deleteProduct={deleteProduct}/>
    }

在 ProductListItem:

    type Props = {
      product:Product,
      handleOpen():void;
      deleteProduct():void;
    }

    <Button variant="contained" onClick={props.handleOpen}>修改</Button>

我們來試試看，是否能打開 ProductCreateUpdate。

接下來，打開時，要取得 ProductListItem 裡的 product。
首先，我們在 ProductCreateUpdate 要接受 product。這時候，我們遇到一個問題，原本的新增，是不需要傳入 product，所以，我們先將 product 後加個問號，代表這個變數是個 optional 的變數。

    type Props = {
      product?:Product,
      close():void;
      open:boolean;
    }

可是，問題來了，ProductCreateUpdate 是 ProductList 的子元件，要如何在 ProductListItem 裡傳內容給 ProductCreateUpdate 呢? 所以，要在加個 ProductList 加個 state 變數來完成這個動作。

ProductList.tsx

    const [product, setProduct]=useState<Product>({id:0, name:"", price:0})//product to be updated

我們把程式重整一下，把原本的 handleOpen 改成 setCurrentProduct。

    const setCurrentProduct = (product:Product) => {
      setOpen(true);
      setProduct(product);
    };

定義 ProductListItem 的時候，也把 handleOpen 改成 setCurrentProduct。

    const renderProduct = (product:Product, index:number)=>{
      return <ProductListItem key={product.name} product={product} setCurrentProduct = {setCurrentProduct} deleteProduct={deleteProduct}/>
    }

ProductListItem.tsx

    type Props = {
      product:Product,
      setCurrentProduct(product:Product):void;
      deleteProduct():void;
    }

    const updateProduct = ()=>{
      props.setCurrentProduct(props.product);
    }


        <Button variant="contained" onClick={updateProduct}>修改</Button>

ProductCreateUpdate.tsx，加入 deafultValue。

        <TextField id="filled-basic" label="產品名稱" variant="outlined" defaultValue={props.product.name} {...register("name",{ required: true, minLength: 5 })}/><br/>
        {errors.name && <span>描述至少5個字<br/></span>}
        <TextField id="filled-basic" label="產品價格" variant="outlined" type="number" defaultValue={props.product.price} {...register("price",{min:0, max:100000})}/><br/>
        {errors.price && <span>價格在0到100000之間<br/></span>}

或者:

    const { register, handleSubmit, watch, formState: { errors }, reset  } = useForm<Product>(
      {defaultValues: useMemo(() => {
        return props.product;
      }, [props])}
    );

當欄位多的時候，利用第二種方法會比較方便。

可是畫面上還是沒看到內容。先透過 console.log，可以看到 ProductCreateUpdate 取得正確的資料。這時候就需要 react-hook-form 的 reset。

- [reset](https://react-hook-form.com/api/useform/reset/)

        const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Product>();

      useEffect(() => {
        reset(props.product);
      }, [props.product, reset]);

接下來，要去檢查目前是修改還是新增，並呼叫對應的 API。我們可以利用 id 是否為 0 來處理。

    if (product.id===0){
      await axios.post("http://localhost:8080/product",product);
    }
    else {
      await axios.put("http://localhost:8080/product/"+product.id,product);
    }

Title 也可以利用同樣方式來標明是新增還是修改。

    <DialogTitle>{props.product.id===0?"新增產品":"修改產品"}</DialogTitle>

注意，修改之後再去執行新增，會發現無法新增，必須在新增之前，將 ProductList 裡的 product 內容清空。所以，我們新增一個新的 function，並且將 onClick 改成呼叫 addProduct。

    const addProduct = () => {
      setProduct({id:0, name:"", price:0});
      setOpen(true);
    }

      <Fab color="primary" aria-label="add" onClick={addProduct}>
        <AddIcon id = "addProductIcon"/>
      </Fab>

另外，我們也改一下 FAB 的 style，這樣就會停在畫面的右下角，而不 ˋ 在表格的最下方，要注意的是可能會擋到「修改」或「刪除」按鈕。

      <Fab color="primary" aria-label="add" onClick={addProduct}
        sx={{position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)}}>
        <AddIcon id = "addProductIcon"/>
      </Fab>

### 作業 我們根據 product 來完成 customer 的修改
