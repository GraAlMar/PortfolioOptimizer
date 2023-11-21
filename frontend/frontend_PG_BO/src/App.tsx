import './App.css';
import React from 'react';
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
import {Menu, MenuItem} from "@mui/material";
import Portfolios from "./pages/Portfolios.tsx";
import {User} from "./data/UserType.tsx";

import {useUserContext} from "./UserContext.tsx";

/*const fetchSession = (): Promise<Response> => {
  return fetch("http://localhost:8080/api/session", {
    method: "GET",
    credentials: "include",
    headers: {"Content-Type":"application/json"}
  });
}*/
const App: React.FC = () => {
  //const emptyUser: User = {username: ""}
  const {user,setUser} = useUserContext()
  //const [user, setUser] = useState<User>(emptyUser);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElOne, setAnchorElOne] = useState(null);

  //console.log("user: " + user)

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
    //setIsLoggedIn(false);
  };

  /*const checkLoggedInUser = () => {
    fetchSession().then(res => res.json().then(data => setUser(data)))
    setIsLoggedIn(true)
  }*/
  return (

      <div>

        {/*<UserProvider>*/}
        < Router>

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

            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
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
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={() => {
                      handleMenuClose();

                    }}><Link to="/explore">My Space</Link></MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
            ) : (
                <div>
                <Button
                    color="inherit"
                    onClick={handleMenuClick}
                    >
                  Login

                </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >

                    <MenuItem onClick={() => {
                      handleMenuClose();}}><Link to="/login">Login</Link></MenuItem>
                  </Menu>
                </div>
            )}
          </Toolbar>
        </AppBar>
          < Routes>
            < Route path="/" element={<Welcome/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/registration" element={<UserRegistration/>}/>
            <Route path="/info" element={<InfoPage/>}/>

            <Route path="/explore" element={<Functionality/>}/>
            <Route path="/portfolios" element={<Portfolios/>}/>

            <Route path="/admin" element={<AdminSpace/>}/>

          </Routes>
        </Router>
        {/*</UserProvider>*/}
      </div>
  );


};

export default App;
