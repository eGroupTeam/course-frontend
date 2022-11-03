import {useState} from 'react';
import styles from '../styles/Home.module.css';

const myPage = () => {
    const [num, setNum] = useState<number>(0);
   
    const increment = () => {
        setNum(num + 1);
    }
    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Number: {num}</h1>
                <button onClick={increment}>Click me</button>
            </main>
        </div>
    )
}

export default myPage;