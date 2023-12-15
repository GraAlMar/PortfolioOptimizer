import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Welcome from './pages/Welcome';
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import Functionality from './pages/Functionality';
import AdminSpace from './pages/AdminSpace';
import InfoPage from './pages/InfoPage';
import styles from "./Styles.module.css"

import Portfolios from "./pages/Portfolios.tsx";

import {useAppContext} from "./AppContext.tsx";
import UserSpace from "./pages/UserSpace.tsx";
import UserAssetsPage from "./pages/UserAssetsPage.tsx";
import CalculatorPage from "./pages/CalculatorPage.tsx";
import Navigation from "./components/Navigation.tsx";
import BetaInfoPage from "./pages/BetaInfoPage.tsx";
import SharpeRatioInfoPage from "./pages/SharpeRatioInfoPage.tsx";

const fetchSession = (): Promise<Response> => {
  return fetch("http://localhost:8080/api/auth/session", {
    method: "GET",
    credentials: "include",
    headers: {"Content-Type":"application/json"}
  });
}




const App: React.FC = () => {
  const {user,setUser} = useAppContext();

  console.log("user: " + user)
  const checkSession = () => {
      fetchSession()
          .then(res =>  {
            //console.log(res)
            if (res.ok) {
              return res.json()
            }
            return null;
          })
          .then(data => {console.log("checkSession-setUser: " + data), setUser(data)})
      //console.log("initial render user: " + user)
  };
  
  useEffect(() => {
    checkSession();
    console.log("useEffect-user-log: " + user)
  }, []);





  return (
      <div className={styles.divContainer}>

        <Router>
          <Navigation/>

          < Routes>
            < Route path="/" element={<Welcome/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/registration" element={<UserRegistration/>}/>
            <Route path="/info" element={<InfoPage/>}/>
            <Route path="/about-beta" element={<BetaInfoPage/>}/>
            <Route path="/about-sharpe-ratio" element={<SharpeRatioInfoPage/>}/>
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
