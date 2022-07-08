# course-frontend
## 第八章 頁面間互動 1

### absolute import
在新增import時，會發現有些檔案夾，如:/components、/interfaces。無法像/styles/那樣，使用絕對路徑去取得。當我們的檔案夾越來越多的時候，就會是個困擾，我們來介紹一下怎麼解決這個困擾，請參考: [Absolute Imports and Module path aliases](https://nextjs.org/docs/advanced-features/module-path-aliases)。

我們在tsconfig.json裡，新增:

    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }

在/pages/product/ProductList.tsx，就可以使用

    import ProductListItem from '@/components/product/ProductListItem';
    import ProductCreate from '@/components/product/ProductCreate';

我們可以把其他檔案夾也加進去

另外，Menu是屬於共用的元件，所以，也把Menu.ts移到components/ui下，順便，請大家也整理一下相關的import。

### next/link
* [next/link](https://nextjs.org/docs/api-reference/next/link)

如前面範例(components\Menu.tsx)，我們是直接放連結上去，這樣的呼叫方式是去跟server取得元件

            <Button  color="inherit"><a href="/">Home</a></Button>
            <Button  color="inherit"><a href="/product">Product</a></Button>

我們來試試看，利用開發人員工具，改一下background的顏色，點選其他頁面時，background就消失了

當我們改用Link，就成為

            <Button  color="inherit"><Link href="/">Home</Link></Button>
            <Button  color="inherit"><Link href="/product">Product</Link></Button>

我們來試試看，利用開發人員工具，改一下background的顏色，點選其他頁面時，background會維持黃色。這樣的啟動方法稱為client-side navigation，在更換網頁時，效率是相對好很多的。
* [Navigate Between Pages](https://nextjs.org/learn/basics/navigate-between-pages/link-component)

### next/router
上次提到，當我們換頁面時，要怎麼讓使用者知道現在切換到哪個頁面?

基本上，會使用到Next提供的router:
* [next/router](https://nextjs.org/docs/api-reference/next/router)

先利用useRouter()取得router，再取得router裡的pathname。利用router.pathname的比對就可以達到這個效果了!

    import { useRouter } from "next/router"

    const router = useRouter();
    const currentRoute = router.pathname;

頁面的部份就可以利用currentRoute的比對去設定不同的顏色

            <Button color={currentRoute==="/"?"secondary":"inherit"}><Link href="/">Home</Link></Button>
            <Button color={currentRoute==="/product"?"secondary":"inherit"}><Link href="/product">Product</Link></Button>

* [Next.js: How to Highlight Currently Active Link](https://www.kindacode.com/article/next-js-how-to-highlight-currently-active-link/)
* [Create an Active Link in Next.js](https://zaiste.net/programming/reactjs/howtos/create-activelink-nextjs/)


router除了能知道目前的pathname之外，當我們不能用連結去換頁，而是在script裡要去換頁時，就可以利用push()去換頁。例如，當我們進行登入驗證時，就可以去設定，當成功登入時，進到首頁，如果沒有成功，就回到登入頁面。

    const action = () =>{
        router.push("/product/test");
    }

在按鈕中，透過onClick去執行push。

          <Button onClick={action}>測試</Button>

使用Link或push()的時候也可以傳參數，

    const action = () =>{
        router.push(
        {pathname: '/product/test',
        query: { id: 2 }}
        );
    }

透過router取得參數

    const router = useRouter();
    const {id} = router.query;

    const id = router.query.id;

請注意，這邊的變數傳遞是透過http get傳遞，傳遞的內容會出現在url裡。跟我們透過props傳遞是不一樣的，而且，這些元件之間沒有隸屬關係，是無法透過props傳遞變數。接下來會介紹元件間更複雜的變數傳遞: Context、Redux。

也可以利用back()回到前一頁

    router.back();

### styles
在next.js裡，可以透過/styles/globals.css設定整體的style，事實上，這個套用的機制是透過_app.js去實現
* [Built-In CSS Support](https://nextjs.org/docs/basic-features/built-in-css-support)

所以，以material-ui為例，如果要套用主題(theme)，就要透過_app.js去實現
* [material-ui Next.js example](https://github.com/mui/material-ui/tree/master/examples/nextjs)

### page & data fetching
Next.js之所以受歡迎，主要是因為Next.js提供Static Site Generation(SSG)及Server Side Rendering (SSR)。React的作法是屬於Client Side Rendering (CSR)，是將javascript送到瀏覽器，在瀏覽器中產生HTML內容，然而，Next.js是在伺服器端(Node.js)就產生HTML，只提供所需要的javascript給瀏覽器，透過這樣的方式提升react的效率。

透過getStaticProps()，就可以在build的時候就去取得所有的內容，並透過props提供給元件。很多內容很少變動，例如產品的類別，就可以透過這樣的方式去產生，當這些內容變動時，重新build一次網頁，就可以取得新的內容了。

透過getServerSideProps()，就可以在每次request的時候，在伺服器端(不是在瀏覽器端)去取得內容，這樣可以增加一點彈性，但是，因為還是要一直重新產生，效率當然就比SSG差了。

現在，也可以使用Incremental Static Regeneration (ISR)的概念，基本上可以在getStaticProps()設定，定期的重新取得靜態資料內容，可以避免當這些內容變動時，重新build一次網頁的需要。

在Next.js 12版以後，還提供On-Demand Incremental Static Regeneration，也就是當需要的時候，可以啟動重新產生靜態內容。

[Pages](https://nextjs.org/docs/basic-features/pages)
[Data Fetching Overview](https://nextjs.org/docs/basic-features/data-fetching/overview)

*** 作業 新增一個檔案夾employee，試著像product一樣，有EmployeeList、EmployeeCreate，並把網頁加進Menu