import '../styles/globals.css'
import type { AppProps } from 'next/app'
//import {AuthContext, AUTH_STATUS} from '@/components/auth/AuthContext';
//import {AuthReduxContext, AUTH_STATUS} from '@/components/auth/AuthReduxContext';
import {store} from '@/components/auth/store'
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

export default MyApp
