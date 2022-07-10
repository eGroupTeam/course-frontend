import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Link from "next/link"
import { useRouter } from "next/router"

const Menu=()=>{
    const router = useRouter();
    const currentRoute = router.pathname;
    
    return(
    <AppBar position="static">
        <Toolbar>
            <Button  color={currentRoute==="/"?"warning":"inherit"}><Link href="/">Home</Link></Button>
            <Button  color={currentRoute==="/product"?"warning":"inherit"}><Link href="/product">Product</Link></Button>
            <Button  color={currentRoute==="/employee"?"warning":"inherit"}><Link href="/employee">Employee</Link></Button>
        </Toolbar>
    </AppBar>)

}
export default Menu