import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { useRouter } from "next/router";

const Menu=()=>{
    const router = useRouter();
    const currentRoute = router.pathname;
    
    return(
    <AppBar position="static">
        <Toolbar>
            <Button  color={currentRoute==="/"?"error":"inherit"}><Link href="/">Home</Link></Button>
            <Button  color={currentRoute==="/product"?"info":"inherit"}><Link href="/product">Product</Link></Button>
            <Button  color={currentRoute==="/EmployeeList"?"info":"inherit"}><Link href="/EmployeeList">Employee</Link></Button>
        </Toolbar>
    </AppBar>)

}
export default Menu;