import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AuthContext, AUTH_STATUS } from "components/auth/AuthContext";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuBar = () => {
  const authContext = useContext(AuthContext);
  let isAuth = false;
  if (authContext.name !== "" && authContext.status === AUTH_STATUS.LOGIN) {
    isAuth = true;
  }
  const router = useRouter();
  const currentRoute = router.pathname;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    authContext.setName("");
    authContext.setStatus(AUTH_STATUS.LOGOUT);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="Home" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href="/">Home</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="Product" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href="/product">Product</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="time" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href="/time">Time</Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Home"
              onClick={handleCloseNavMenu}
              color={currentRoute === "/" ? "secondary" : "inherit"}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link href="/">Home</Link>
            </Button>
            <Button
              key="Product"
              onClick={handleCloseNavMenu}
              color={currentRoute === "/product" ? "secondary" : "inherit"}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link href="/product">Product</Link>
            </Button>
            <Button
              key="Time"
              onClick={handleCloseNavMenu}
              color={currentRoute === "/time" ? "secondary" : "inherit"}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link href="/time">Time</Link>
            </Button>
            {isAuth ? (
              <Button
                key="Logout"
                onClick={handleLogout}
                // color={currentRoute === "/login" ? "secondary" : "inherit"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href="/login">Logout</Link>
              </Button>
            ) : (
              <Button
                key="Login"
                onClick={handleCloseNavMenu}
                color={currentRoute === "/login" ? "secondary" : "inherit"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
            {isAuth && <p>Hello,{authContext.name}</p>}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
