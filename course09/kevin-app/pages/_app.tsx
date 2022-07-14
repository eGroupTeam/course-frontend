import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '@/components/ui/Menu';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
