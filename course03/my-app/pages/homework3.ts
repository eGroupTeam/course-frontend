import {useState} from 'react';
import styles from '../styles/Home.module.css';

const shiunPage = () => {
    const [num, setNum] = useState(0);
    const addNum = () =>{
      setNum = (num + 1)
    }

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Num:{num}</h1>
          <button onClick={addNum}>Click</button>
        </main>
      </div>
    )
  }
  
  export default shiunPage