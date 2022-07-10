# course-frontend

## 第九章 頁面間互動 2 context、redux

### context

在 react 裡，元件間的資料主要是靠 props 來傳遞，然而，當元件越來越多的時候，這樣的傳遞就會過於複雜，這時候就可以利用 context 來分享資料。在前一章，我們介紹了 ThemeProvider，其實，ThemeProvider 就是利用 context。當然，也可以使用更複雜的 Redux/Recoil 來達成這樣的效果，不過，多數的情況下，Context 就能解決問題了。

context 通常用在需要多元件分享資料的情況，常用的情境有: 介面選項(如:dark mode 或 light mode)的切換，或登入身分的切換。

#### createContext

在 components/auth/AuthContext.tsx
新增一個 AUTH_STATUS 並利用 createContext 產生一個 context 元件

    import { createContext } from "react";

    export enum AUTH_STATUS {
      LOGIN, LOGOUT
      }
    export const AuthContext = createContext({
      status: AUTH_STATUS.LOGIN
    })

#### contextProvider

在 /pages/\_app.tsx 裡設定 ContextProvider，這樣的話，所有的元件都可以取得 context 的內容

    import '../styles/globals.css'
    import type { AppProps } from 'next/app'
    import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';

    function MyApp({ Component, pageProps }: AppProps) {
      return (
        <AuthContext.Provider value={{status:AUTH_STATUS.LOGIN}}>
          <Component {...pageProps} />
        </AuthContext.Provider>

      )

    }

    export default MyApp

#### useContext

要取得 context 變數內容，先 import AuthContext 及 useContext。

    import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';
    import { useContext } from 'react';

就可以透過 useContext 取得 context 變數內容了

    const authContext = useContext(AuthContext);

如果直接顯示 authContext.status，我們會看到 0，因為 enum 事實上就是以數字儲存。

#### 更動 context

通常我們會在登入後去更動 context...，剛剛的 context 並沒有提供任何更動的函數，所以，我們來改一下，事實上，這邊的內容在設定 ContextProvider 的時候，都會被覆蓋掉:

    import { createContext } from "react";

    export enum AUTH_STATUS {
      LOGIN, LOGOUT
    }
    export const AuthContext = createContext({
      status: AUTH_STATUS.LOGIN,
      setStatus:(newStatus:AUTH_STATUS)=>{}
    })

在\_app.tsx 裡，把 status 跟 setStatus 提供給 AuthCotext

    import '../styles/globals.css'
    import type { AppProps } from 'next/app'
    import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';
    import { useState } from 'react';

    function MyApp({ Component, pageProps }: AppProps) {
      const [status, setStatus] = useState<AUTH_STATUS>(AUTH_STATUS.LOGOUT);
      return (
        <AuthContext.Provider value={{status, setStatus}}>
          <Component {...pageProps} />
        </AuthContext.Provider>

      )

    }

    export default MyApp

先在 interfaces/entities.tsx 裡新增一個 type:

    export type Product = {
      desc:string, price:number
    }
    export type Login = {
      id:string, password:string
    }

利用 react-hook-form 寫一個 Login.tsx，透過 authContext.setStatus 來改變狀態

    const onSubmit: SubmitHandler<Login> = login => {
      if (login.id === "benwu" && login.password === "ilovenext"){
        authContext.setStatus(AUTH_STATUS.LOGIN);
      }
      else {
        authContext.setStatus(AUTH_STATUS.LOGOUT);
      }
      router.push("/product/test");
    };

### redux

Redux 基本上是 View、Action、State 的互動
Redux 是利用 store 去儲存 state 及 reducers
在範例裡，我們將 reducer 寫在 authSlice.tsx
並且增加一個 hook.tsx，將 selector 跟 dispatcher 包裝在 hook.tsx 裡

- [Redux Essentials, Part 1: Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

可參考以下的說明，記得，因為我們使用 typescript，所以，兩個說明都要看

- [React Redux Quick Start](https://react-redux.js.org/tutorials/quick-start)
- [React Redux TypeScript Quick Start](https://react-redux.js.org/tutorials/typescript-quick-start)

要使用 react redux，首先要安裝 react redux

    yarn add @reduxjs/toolkit react-redux

剛剛的程式如何改用 redux?

#### 產生 react store (/components/auth/store.tsx)

    import { configureStore } from '@reduxjs/toolkit'

    export default configureStore({
      reducer: {},
    })

#### 利用 Provider 提供 store 給 react

將/pages/\_app.tsx 改為:

    import '../styles/globals.css'
    import type { AppProps } from 'next/app'
    import store from '@components/auth/store'
    import { Provider } from 'react-redux'
    import { useState } from 'react';

    function MyApp({ Component, pageProps }: AppProps) {
      //const [status, setStatus] = useState<AUTH_STATUS>(AUTH_STATUS.LOGOUT);
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>

      )

    }

#### 產生 Redux State Slice (/components/auth/authSlice.tsx)

    import { createSlice } from '@reduxjs/toolkit'
    export enum AUTH_STATUS {
      LOGOUT, LOGIN
    }
    export const authSlice = createSlice({
      name: 'status',
      initialState: {
        value: AUTH_STATUS.LOGOUT,
      },
      reducers: {
        login: (state) => {
          state.value = AUTH_STATUS.LOGIN;
        },
        logout: (state) => {
          state.value = AUTH_STATUS.LOGOUT;
        }
      },
    })

    // Action creators are generated for each case reducer function
    export const { login, logout } = authSlice.actions
    export default authSlice.reducer

#### 將 Slice Reducers 加到 Store 裡 (/components/auth/store.tsx)

    import { configureStore } from '@reduxjs/toolkit'
    import authReducer from '@/components/auth/authSlice'

    export const store = configureStore({
      reducer: {
        status: authReducer,
      },
    })
    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>
    // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
    export type AppDispatch = typeof store.dispatch

#### 提供 hooks (/components/auth/hooks.tsx)

    import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
    import type { RootState, AppDispatch } from './store'

    // Use throughout your app instead of plain `useDispatch` and `useSelector`
    export const useAppDispatch: () => AppDispatch = useDispatch
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

#### 取得內容 (test.tsx)

    import { useAppSelector } from '@/components/auth/hooks'
    import {AUTH_STATUS} from '@/components/auth/authSlice';

    const status = useAppSelector((state) => state.status.value)

    {status === AUTH_STATUS.LOGIN ?"已登入": "未登入"}<br/>

#### 更動內容 (Login.tsx)

注意，因為 login 會跟其他的 login 衝突，要修改:

    import {Login as User} from '@/interfaces/entities';

    const onSubmit: SubmitHandler<User> = user => {
      if (user.id === "benwu" && user.password === "ilovenext"){
        //authContext.setStatus(AUTH_STATUS.LOGIN);
        dispatch(login());
      }


    import { useAppDispatch } from '@/components/auth/hooks'
    import { logout, login } from '@/components/auth/authSlice'

    const dispatch = useAppDispatch();

    if (user.id === "benwu" && user.password === "ilovenext"){
      dispatch(login());
    }
    else {
      dispatch(logout());
    }

基本上 react redux 採用 react 的 context，所以，也可以定義自己的 Context

- [Accessing the Store](https://react-redux.js.org/using-react-redux/accessing-store)
- [Redux Toolkit TypeScript Example](https://github.com/vercel/next.js/tree/canary/examples/with-redux)

### 作業: 如果我們需要登入者的帳號，要怎麼做? (使用 Context 或 redux 都可以)
