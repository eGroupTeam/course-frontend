import { useState } from "react";
import styles from '../styles/Home.module.css';

const addnumPage = () => {
    const [num , setNum] = useState(0);

    const addNumber = () => {
        setNum(num + 1)
    }

    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>YourNum : {num}</h1>
                <button onClick={addNumber}>+ 1</button>
            </main>
        </div>
    )
}

export default addnumPage