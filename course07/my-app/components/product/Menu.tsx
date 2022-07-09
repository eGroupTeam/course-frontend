import { RestaurantMenuTwoTone } from "@mui/icons-material"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"

const Menu=()=>{
    return(
    <AppBar position="static">
        <Toolbar>
            <Button  color="inherit"><a href="/">Home</a></Button>
            <Button  color="inherit"><a href="/product">Product</a></Button>
        </Toolbar>
    </AppBar>)

}
export default Menu