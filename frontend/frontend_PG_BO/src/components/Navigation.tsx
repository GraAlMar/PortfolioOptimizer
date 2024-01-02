import React, {useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Menu, MenuItem, Snackbar} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AccountCircle} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import {useAppContext} from "../AppContext.tsx";

const logOutUser = () => {

    const response =  fetch("http://localhost:8080/api/auth/signout", {

        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.text());

    return response;

};
const Navigation: React.FC = () => {
    const {user,setUser} = useAppContext();
    const location = useLocation();
    //console.log(location)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElOne, setAnchorElOne] = useState(null);
    const [open, setOpen] = useState(false)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuOneClick = (event) => {
        setAnchorElOne(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuOneClose = () => {
        setAnchorElOne(null);
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure to logout?")) {
            logOutUser();
            setOpen(true)
            setUser(null)
        }
        //setIsLoggedIn(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={handleMenuOneClick}

                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorElOne}
                        open={Boolean(anchorElOne)}
                        onClose={handleMenuOneClose}
                    >
                        <MenuItem onClick={handleMenuOneClose}>
                            <Link to="/about-beta">About Beta</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuOneClose}>
                            <Link to="/about-sharpe-ratio">About Sharpe Ratio</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuOneClose}>
                            <Link to="/explore">Explore</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuOneClose}>
                            <Link to="/contact">Contact</Link>
                        </MenuItem>
                    </Menu>

                    <Typography variant="h5" component="div" sx={{flexGrow: 1} }>
                        PORTFOLIO OPTIMIZER
                    </Typography>
                    {user !== undefined && user !== null ? (
                        <div>
                            <Button
                                color="inherit"
                                onClick={handleMenuClick}
                                startIcon={<AccountCircle/>}
                            >
                                {user.username}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem disabled={location.pathname.startsWith("/userspace")} onClick={() => {
                                    handleMenuClose();
                                }
                                }><Link to="/userspace">My Space</Link>
                                </MenuItem>
                                <MenuItem onClick={
                                    handleMenuClose
                                }><Link to="/profile">My Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={
                                    handleMenuClose
                                }><Link to="/admin">Admin Space</Link>
                                </MenuItem>
                                {/*<MenuItem onClick={handleLogout}>Logout</MenuItem>*/}
                                <MenuItem onClick={() => {
                                    handleMenuClose();
                                    handleLogout();}
                                }><Link to="/">Logout</Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <Button
                                color="inherit"
                                onClick={handleMenuClick}
                            >
                                Login / Sign Up

                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >

                                <MenuItem onClick={() => {
                                    handleMenuClose();}}><Link to="/login">Login</Link></MenuItem>
                                <MenuItem onClick={() => {
                                    handleMenuClose();}}><Link to="/registration">Sign up</Link></MenuItem>
                            </Menu>
                        </div>
                    )}



                </Toolbar>
                <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} message= "You were logged out" />
            </AppBar>
        </div>
    )
}
export default Navigation;