import React from "react";
import styles from 'styles/Home.module.css';
import EmployeeListItem from 'components/EmployeeListItem';
//import EmployeeCreate from '@/components/employee/EmployeeCreate';
import { Employee } from 'interfaces/entities';
import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import EmployeeCreate from "@/components/EmployeeCreate";
import { EmployeeFormInput } from "@/interfaces/form";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 0, name: "Me", age: 17, gender: 0 },
    { id: 1, name: "You", age: 25, gender: 0 }
  ])
  let serialnum:number = 1;

  const deleteEmployee = (e: Employee) => {
    const temp = [...employees];
    let index = temp.indexOf(e);
    temp.splice(index, 1);
    setEmployees([...temp]);
    console.log(employees);
  }

  const addEmployee = (input:EmployeeFormInput)=>{
    let e:Employee ={
      id:++serialnum, name:input.name,gender:input.gender,age:input.age
    };
    setEmployees(current=>[...current, e]);
    console.log("welcome.");
  }

  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>
            {employees.map((employee) =>
              <EmployeeListItem
                key={employee.id}
                employee={employee}
                delete={()=>deleteEmployee(employee)}
              />)
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" aria-label="add" onClick={() => setOpenForm(true)}>
        <AddIcon />
      </Fab>
  
      <EmployeeCreate create={addEmployee} active ={openForm} close={()=>setOpenForm(false)}/>
    </div >
  )
}
export default EmployeeList;