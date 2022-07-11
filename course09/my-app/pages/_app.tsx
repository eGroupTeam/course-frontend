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
