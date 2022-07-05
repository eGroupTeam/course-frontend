# course-frontend
## 第六章 UI介面 1 Material-UI
### 安裝

我們可以使用Material-UI來美化我們所使用的HTML元件。[Material Design](https://material.io/)是Google開發的設計語言，Material-UI就是一些Material Design的react模組/元件。各位可以使用過去慣用的Bootstrap，在react裡，可以使用React Bootstrap 。不過，我們課程帶大家使用Material-UI。目前的版本是5.8.7 (2022/07/15)，第5版與第4版的語法差滿多的，看網路文件時要注意版本的差別。

在Material-UI的官網有[安裝說明](https://mui.com/material-ui/getting-started/installation/)，我們直接使用yarn指令安裝

    yarn add @mui/material @emotion/react @emotion/styled

打開package.json，就可以看到已經安裝

    "dependencies": {
        "@emotion/react": "^11.9.3",
        "@emotion/styled": "^11.9.3",
        "@mui/material": "^5.8.7",
        "next": "12.1.6",
        "react": "18.2.0",
        "react-dom": "18.2.0"
    },

我們先就目前使用到一些HTML元件，更換成Material-UI元件吧。

### 常用元件

我們來改一下ProductList吧。
[Table](https://mui.com/material-ui/react-table/)
可以看到有
* [Table API](https://mui.com/material-ui/api/table/)
* [TableContainer API](https://mui.com/material-ui/api/table-container/)
* [TableHead API](https://mui.com/material-ui/api/table-head/)
* [TableRow API](https://mui.com/material-ui/api/table-row/)
* [TableCell API](https://mui.com/material-ui/api/table-cell/)
* [TableBody API](https://mui.com/material-ui/api/table-body/)

ProductListItem裡用到button。
* [Button](https://mui.com/material-ui/react-button/)
* [Button API](https://mui.com/material-ui/api/button/)

ProductCreate裡用到input。
* [TextField](https://mui.com/material-ui/react-text-field/)
* [TextField API](https://mui.com/material-ui/api/text-field/)
* [Input API](https://mui.com/material-ui/api/input/)
* [Dialog](https://mui.com/components/dialogs/)
* [Dialog API](https://mui.com/material-ui/api/dialog/)

首頁可以使用
* [AppBar](https://mui.com/material-ui/react-app-bar/)
* [AppBar API](https://mui.com/material-ui/api/app-bar/)
* [Menu API](https://mui.com/material-ui/api/menu/)
* [Toolbar API](https://mui.com/material-ui/api/toolbar/)

