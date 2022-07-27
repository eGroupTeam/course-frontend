import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Link from "next/link"
import { useRouter } from "next/router"


const Menu = () => {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <Button id="home" color={currentRoute === "/" ? "primary" : "inherit"}><Link href="/">Home</Link></Button>
                <Button id="product" color={currentRoute === "/product" ? "primary" : "inherit"}><Link href="/product">Product</Link></Button>
                <Button id="organization" color={currentRoute === "/organization" ? "primary" : "inherit"}><Link href="/organization">Organization</Link></Button>
            </Toolbar>
        </AppBar>)

}
export default Menu