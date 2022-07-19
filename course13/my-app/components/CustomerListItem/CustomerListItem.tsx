import { Customer } from '../../interfaces/entities';
import { Button, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import axios from 'axios';

type Props = {
    customer: Customer,
    setCurrentCustomer(customer: Customer): void;
    deleteCustomer(): void;
}

const CustomerListItem = (props:Props) => {
    const deleteCustomer = async () => {
        await axios.delete("http://localhost:8080/customer/" + props.customer.id);
        props.deleteCustomer();
    }
    const updateCustomer = () => {
        props.setCurrentCustomer(props.customer);
    }

    return (
        <TableRow>
            <TableCell >{props.customer.name}</TableCell>
            <TableCell>{props.customer.address}</TableCell>
            <TableCell>{props.customer.weight}</TableCell>
            <TableCell>
                <Button variant="contained" onClick={updateCustomer}>修改</Button>
                <Button variant="contained" color="secondary" onClick={deleteCustomer}>刪除</Button>
            </TableCell>
        </TableRow>
    )
}

export default CustomerListItem;