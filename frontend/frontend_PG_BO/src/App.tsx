import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import Functionality from './pages/Functionality';
import AdminSpace from './pages/AdminSpace';
import InfoPage from './pages/InfoPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/registration" element={<UserRegistration />} />
        <Route path="/info" element={<InfoPage />} />

        <Route path="/explore" element={<Functionality />} />
        <Route path="/admin" element={<AdminSpace />} />

      </Routes>
    </Router>
  );
};

export default App
