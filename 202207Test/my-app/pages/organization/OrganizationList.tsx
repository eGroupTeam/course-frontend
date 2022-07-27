import styles from '/styles/Home.module.css';
import { Organization, Product } from '@/interfaces/entities';
import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@/components/ui/Menu';
import { useRouter } from 'next/router';
import axios from 'axios';
import { styled, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';
import OrganizationCreateEdit from '@/components/organization/OrganizationCreateUpdate';
import OrganizationListItem from '@/components/organization/OrganizationListItem';

const OrganizationList = () => {

    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [organization, setOrganization] = useState<Organization>({ id: 0, name: "", set_time: "", desc: "", contactnum: 0, mail: "", address: "" })//product to be updated

    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const setCurrentOrganization = (organization: Organization) => {
        setOrganization(organization);
        setOpen(true);
    };

    const addOrganization = () => {
        setOrganization({ id: 0, name: "", set_time: "", desc: "", contactnum: 0, mail: "", address: "" });
        setOpen(true);
    }

    useEffect(() => {
        async function fetchData() {

            const result = await axios.get("http://localhost:8080/organization");
            setOrganizations(result.data);

        }
        fetchData();
    }, [open, deleted]);

    const renderOrganization = (organization: Organization, index: number) => {
        return <OrganizationListItem key={organization.name} organization={organization} setCurrentOrganization={setCurrentOrganization} deleteOrganization={deleteOrganization} />
    }

    const deleteOrganization = () => {
        setDeleted(!deleted);
    }

    const router = useRouter();
    const action = () => {
        router.push(
            {
                pathname: '/organization/test',
                query: { id: 100 }
            }
        );
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div className={styles.container}>
            <Menu />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>部門代號</StyledTableCell>
                            <StyledTableCell>部門名稱</StyledTableCell>
                            <StyledTableCell>成立時間</StyledTableCell>
                            <StyledTableCell>部門介紹</StyledTableCell>
                            <StyledTableCell>聯絡電話</StyledTableCell>
                            <StyledTableCell>信箱</StyledTableCell>
                            <StyledTableCell>地址</StyledTableCell>
                            <StyledTableCell>操作</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {organizations.map(renderOrganization)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab color="primary" aria-label="add" onClick={addOrganization}>
                <AddIcon id="addOrganization" />
            </Fab>

            <OrganizationCreateEdit open={open} close={handleClose} organization={organization} />

        </div>
    )
}
export default OrganizationList