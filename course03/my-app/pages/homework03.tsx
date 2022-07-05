import {useState} from 'react';
import styles from '../styles/Home.module.css';

const workpage = () => {
    const [amount , setamount] = useState(0);
    const addamount = () => {
        setamount(amount+1); 
      } 
    return (
      <div className={styles.container}>
        <main className={styles.main}>
            <h1>次數：{amount}</h1>
          
          <button onClick={addamount}>按我</button>
        </main>
        
      </div>
    )
  }
  
  export default workpage
