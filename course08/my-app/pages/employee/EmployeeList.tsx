import styles from '/styles/Home.module.css';
import EmployeeListItem from '@/components/employee/EmployeeListItem';
import EmployeeCreate from '@/components/employee/EmployeeCreate';
import {Employee} from '@/interfaces/entities';
import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@/components/ui/Menu';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const EmployeeList = () => {
  const [employees, setEmployees]=useState<Employee[]>([
    {name:"Machi",  department:"IT", wage:45345},
    {name:"Berry",  department:"HR", wage:34545},
    {name:"Jason",  department:"ACC", wage:56793},
  ])

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const renderEmployee = (employee:Employee, index:number)=>{
    return <EmployeeListItem key={employee.name} index={index} name={employee.name} department={employee.department} wage={employee.wage} deleteEmployee={deleteEmployee}/>
    //return <li key={product.desc}>{product.desc}/{product.price}</li>
  }

  const addEmployee = (employee:Employee)=>{
    setEmployees(currentEmployees=>[...currentEmployees, employee]);
    console.log("hello");
  }

  const deleteEmployee = (index:number)=>{
    const temp = [...employees];
    temp.splice(index,1);
    setEmployees([...temp]);
  }

  const router = useRouter();
  const action = () =>{
    router.push(
      {pathname: '/employee/test',
      query: { id: 100 }}
      );
  }

  return (
    <div className={styles.container}>
      <Menu/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {employees.map(renderEmployee)}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={action}>到測試頁</Button>
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>

      <EmployeeCreate addEmployee={addEmployee} open ={open} close={handleClose}/>

    </div>
  )
}
export default EmployeeList 