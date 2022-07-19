import styles from '/styles/Home.module.css';
import CustomerListItem from 'components/CustomerListItem';
// import CustomerCreateUpdate from '@/components/customer/CustomerCreateUpdate';
import { Customer } from '@/interfaces/entities';
import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@/components/ui/Menu';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import axios from 'axios'

const Customer = () => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [customer, setCustomer] = useState<Customer>({ id: 0, name: "", address:"", weight: 0 })

    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const setCurrentCustomer = (customer: Customer) => {
        setCustomer(customer);
        setOpen(true);
    };

    const addCustomer = () => {
        setCustomer({ id: 0, name: "", address: "", weight:0 });
        setOpen(true);
    }

    useEffect(() => {
        async function fetchData() {

            const result = await axios.get("http://localhost:8080/customer");
            setCustomers(result.data);

        }
        fetchData();
    }, [open, deleted]);

    const renderCustomer = (customer: Customer, index: number) => {
        return <CustomerListItem key={customer.name} customer={customer} setCurrentCustomer={setCurrentCustomer} deleteCustomer={deleteCustomer} />
    }

    const deleteCustomer = () => {
        setDeleted(!deleted);
    }

    const router = useRouter();


    return (
        <div className={styles.container}>
            <Menu />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableBody>
                        {customers.map(renderCustomer)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab color="primary" aria-label="add" onClick={addCustomer}
                sx={{
                    position: "fixed",
                    bottom: (theme) => theme.spacing(2),
                    right: (theme) => theme.spacing(2)
                }}>
                <AddIcon id="addCustomerIcon" />
            </Fab>
        </div>
    )
}

export default Customer;