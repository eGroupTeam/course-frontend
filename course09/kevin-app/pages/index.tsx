import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { AUTH_STATUS,AuthContext } from 'redux/authContext'
import styles from '/styles/Home.module.css'

const Home: NextPage = () => {
  const auth =useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{auth.authStatus===AUTH_STATUS.LOGIN? "Hi, "+auth.userName:"我首頁啦"}</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home