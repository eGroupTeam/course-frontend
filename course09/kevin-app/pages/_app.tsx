import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '@/components/Menu/Menu';
import { useState } from 'react';
import {AuthContext,AUTH_STATUS} from 'redux/authContext'

function MyApp({ Component, pageProps }: AppProps) {
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.LOGOUT);
  const [userName, setUserName]= useState("guest");
  return (
    <AuthContext.Provider value={{authStatus, setAuthStatus, userName, setUserName}}>
      <Menu />
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
