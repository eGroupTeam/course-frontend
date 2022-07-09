import React, { FC } from "react";
import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {Gender} from 'interfaces/utils';
import {Employee} from 'interfaces/entities';

type EmployeeListItemProps={
    employee:Employee;
    delete():void;
};

const EmployeeListItem:FC<EmployeeListItemProps> = (content:EmployeeListItemProps) => {
    return (
        <TableRow>
            <TableCell >{content.employee.name}</TableCell>
            <TableCell>{Gender[content.employee.gender]}</TableCell>
            <TableCell>{content.employee.age}</TableCell>
            <TableCell><Button variant="contained" onClick={content.delete}>刪除</Button></TableCell>
        </TableRow>
    )
}

export default EmployeeListItem;