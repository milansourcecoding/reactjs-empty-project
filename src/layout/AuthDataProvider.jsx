import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signin from '../views/account/Signin.jsx';
import SignUp from "../views/account/SignUp.jsx";

export const AuthContext = React.createContext();


// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
  const prevAuth = window.localStorage.getItem('authenticated') || false;
  const prevToken = window.localStorage.getItem('token') || null;
  const prevUser = window.localStorage.getItem('user') || null;

  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [token, setToken] = useState(prevToken);
  const [user, setUser] = useState(prevUser);


  const clearStorage = () => {
    setAuthenticated(false);
    setToken(null);
    setUser(null);
    window.localStorage.clear();
  };

  useEffect(
    () => {
      if(authenticated){
        window.localStorage.setItem('authenticated', authenticated);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', user);
      } else {
        window.localStorage.removeItem('authenticated');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
      }
      
    },
    [authenticated, token, user]
  );


  const defaultContext = {
    clearStorage,
    authenticated,
    setAuthenticated,
    token,
    setToken,
    user,
    setUser
  };

  
  return (
    <AuthContext.Provider value={defaultContext}>
      {
        authenticated
        ?
        children
        :
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route exact path="/">
                <Route path="/" element={<Navigate to="/Sign-in" />} />
              </Route>
              
              <Route path="/Sign-in" element={<Signin />} />
              <Route path="/Sign-up" element={<SignUp />} />

              <Route path="*" element={<Signin />} />
            </Routes>
          </BrowserRouter>
        </div>
      }
    </AuthContext.Provider>
  );
};