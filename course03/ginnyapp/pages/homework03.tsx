import {useState} from 'react';
import styles from '../styles/Home.module.css';

const ginnyPage = () => {
    const [num, setnum] = useState(0);
    const Add =() =>{
      setnum(num+1)
      console.log("數字:",num);
    }
    return (
      
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>數字:{num}</h1>
          <button onClick={Add}>點一下</button>
        </main>
        
      </div>
    )
  }
  
  export default ginnyPage