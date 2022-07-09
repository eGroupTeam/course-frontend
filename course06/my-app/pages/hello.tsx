import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
//let time:string = new Date().toLocaleTimeString();


const HelloPage = () => {
  const [time, setTime] = useState<string>();
  let names: string[] = ["Ben", "Mary", "Sam"];
  const getTime = () =>  {
    setTime(new Date().toLocaleTimeString());
    console.log("time:",time);
  }
  useEffect(getTime,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
  return (
    
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Hello World!</h1>
        <h1>hello</h1>
        <div>{names}</div>
        <ul>
          {names.map((name, index) => (<li key={name}>{index}/{name}</li>))}
        </ul>
        
        <button onClick={getTime}>點一下</button>
        <a href="/">首頁</a>
      </main>
    </div>
  )
}

export default HelloPage