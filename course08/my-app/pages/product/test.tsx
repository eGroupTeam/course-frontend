import Menu from '@/components/ui/Menu';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styles from '/styles/Home.module.css';
const Test = () => {
  const router = useRouter();
  const id = router.query.id;
  const action = () =>{
    router.back();
  }
  return(
    <div className={styles.container}>
      <Menu/>
      {id}
      <Button onClick={action}>回上頁</Button>
    </div>
    )
}

export default Test;