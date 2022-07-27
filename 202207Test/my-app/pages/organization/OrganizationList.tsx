import styles from '/styles/Home.module.css';
import OrganizationListItem from '@/components/organization/OrganizationListItem';
import OrganizationCreate from '@/components/organization/OrganizationCreateUpdate';
import { Organization } from '@/interfaces/entities';
import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@/components/product/menu';
import axios from 'axios';
import { styled, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';

const OrganizationList = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [organization, setOrganization] = useState<Organization>({ id: 0, date: "", name: "", intro: "", phone: "", email: "", address: "" })



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
        setOrganization({ id: 0, date: "", name: "", intro: "", phone: "", email: "", address: "" });
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
            <Menu />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>單位編號</StyledTableCell>
                            <StyledTableCell>單位名稱</StyledTableCell>
                            <StyledTableCell>成立時間</StyledTableCell>
                            <StyledTableCell>單位介紹</StyledTableCell>
                            <StyledTableCell>單位電話</StyledTableCell>
                            <StyledTableCell>單位信箱</StyledTableCell>
                            <StyledTableCell>單位地址</StyledTableCell>
                            <StyledTableCell>修改/刪除單位</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {organizations.map(renderOrganization)}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Fab color="primary" variant="extended" onClick={addOrganization} sx={{ position: "fixed", right: (theme) => theme.spacing(4) }}>
                <AddIcon sx={{ mr: 1 }} />
                新增部門
            </Fab>
            <OrganizationCreate open={open} close={handleClose} organization={organization} />

        </div>
    )
}
export default OrganizationList