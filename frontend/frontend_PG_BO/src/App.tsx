import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Welcome from './pages/Welcome';
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import Functionality from './pages/Functionality';
import AdminSpace from './pages/AdminSpace';
import InfoPage from './pages/InfoPage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {AccountCircle} from "@mui/icons-material";
import {Menu, MenuItem, Snackbar} from "@mui/material";
import Portfolios from "./pages/Portfolios.tsx";

import {useUserContext} from "./UserContext.tsx";
import UserSpace from "./pages/UserSpace.tsx";
import UserAssetsPage from "./pages/UserAssetsPage.tsx";
import CalculatorPage from "./pages/CalculatorPage.tsx";

const fetchSession = (): Promise<Response> => {
  return fetch("http://localhost:8080/api/auth/session", {
    method: "GET",
    credentials: "include",
    headers: {"Content-Type":"application/json"}
  });
}

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

class Calculator extends React.Component {
  render() {
    return null;
  }
}

const App: React.FC = () => {
  const {user,setUser} = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElOne, setAnchorElOne] = useState(null);
  const [open, setOpen] = useState(false)

  const checkSession = () => {
      fetchSession()
          .then(res =>  res.json()
            )
          .then(data => {
            if (data.username !== null) {
              setUser(data);
            } else {
              setUser(null)
              console.log('No user data available');
            }
          })
      console.log("initial render user: " + user)
  };
  
  useEffect(() => {
    checkSession();
  }, []);

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

        <Router>

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
                <Link to="/about">About Beta</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuOneClose}>
                <Link to="/explore">Explore</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuOneClose}>
                <Link to="/contact">Contact</Link>
              </MenuItem>
            </Menu>

            <Typography variant="h5" component="div" sx={{flexGrow: 1} }>
              BETA OPTIMIZER
            </Typography>
              {user !== null ? (
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
                    <MenuItem onClick={() => {
                                handleMenuClose();
                              }
                              }><Link to="/userspace">My Space</Link>
                    </MenuItem>
                    <MenuItem onClick={
                                handleMenuClose
                              }><Link to="/profile">My Profile</Link>
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

          < Routes>
            < Route path="/" element={<Welcome/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/registration" element={<UserRegistration/>}/>
            <Route path="/info" element={<InfoPage/>}/>

            <Route path="/explore" element={<Functionality/>}/>
            <Route path="/userspace/" element={<UserSpace/>}/>
            <Route path="/userspace/assets" element={<UserAssetsPage/>}/>
            <Route path="/userspace/calculator" element={<CalculatorPage/>}/>
            <Route path="/userspace/portfolios" element={<Portfolios/>}/>

            <Route path="/admin" element={<AdminSpace/>}/>

          </Routes>
        </Router>

      </div>
  );


};

export default App;
