import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './assets/scss/main.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import AuthDataProvider from "./layout/AuthDataProvider.jsx";
import RouteLayout from "./layout/RouteLayout.jsx";
import PageNotFound from "./views/account/PageNotFound.jsx";
import SignIn from "./views/account/Signin.jsx";
import SignUp from "./views/account/SignUp.jsx";

import Dashboard from "./views/Dashboard/Dashboard.jsx";


function App() {
  return <AuthDataProvider>
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/">
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>

          <Route path="/dashboard" element={<RouteLayout component={Dashboard} />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer className="custom-toast" autoClose={false} />
    </div>
  </AuthDataProvider>
}

export default App;
