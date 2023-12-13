import './App.css';
import {useContext, useEffect, useState } from 'react';
import SignIn from './pages/auth/login';
import { AuthContext } from './context/AuthContext';
import MainPage from './pages/main';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
function App() {
  console.log("from app");
  let authctx = useContext(AuthContext);
  console.log("fromapp",authctx);
  return(
    <>
      {authctx.token ? <MainPage />:<SignIn/>}
    </>
  );
}


export default App;

