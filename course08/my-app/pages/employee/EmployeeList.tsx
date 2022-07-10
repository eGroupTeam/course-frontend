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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const EmployeeList = () => {
  const [employee, setEmployee]=useState<Employee[]>([
    {name:"Ryan", department:"Finance", pay:31900},
    {name:"BoHong", department:"Manage", pay:54000}
  ])
  
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const renderEmployee = (employee:Employee, index:number)=>{
    return <EmployeeListItem key={employee.name} index={index} name={employee.name} department={employee.department} pay={employee.pay} deleteEmployee={deleteEmployee}/>
  }

  const addEmployee = (employee:Employee)=>{
    setEmployee(currentEmployee=>[...currentEmployee, employee]);
    console.log("hello");
  }

  const deleteEmployee = (index:number)=>{
    const temp = [...employee];
    temp.splice(index,1);
    setEmployee([...temp]);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div className={styles.container}>
      <Menu/>
      <br/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>員工姓名</StyledTableCell>
            <StyledTableCell>所在部門</StyledTableCell>
            <StyledTableCell>員工薪水</StyledTableCell>
            <StyledTableCell align="center">相關操作</StyledTableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {employee.map(renderEmployee)}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <Fab color="primary" variant="extended" onClick={() => setOpen(true)}>
        <AddIcon sx={{ mr: 1 }} />
          新增員工資料
      </Fab>
      <EmployeeCreate addEmployee={addEmployee} open ={open} close={handleClose}/>
      
    </div>
  )
}
export default EmployeeList