// import { useState } from 'react';
// import EquipmentForm from '../src/components/EquipmentForm';
// import LoginForm from '../src/components/LoginForm';
import "./App.css";
import Navbar from "./components/Navbar";
import { lightTheme } from "../themes";
import { ThemeProvider } from "@mui/material";
// import HomePage from '.';
import { BrowserRouter } from "react-router-dom";
import Views from "./Views";
import { LoginContextProvider } from "./context/LoginContext";
import { UserContextProvider } from "./context/UserContext.jsx";
// import { AuthProvider } from './context/auth/AuthContext';
// import { HomePage } from './index'

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <LoginContextProvider>
          <UserContextProvider>
            <Navbar />
            <Views />
          </UserContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
