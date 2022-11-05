import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signin from '../views/account/Signin.jsx';
import SignUp from "../views/account/SignUp.jsx";

export const AuthContext = React.createContext();


// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
  const prevAuth = window.localStorage.getItem('authenticated') || false;
  const prevAccessToken = window.localStorage.getItem('access_token') || null;
  const prevRefreshToken = window.localStorage.getItem('refresh_token') || null;
  const prevTokenType = window.localStorage.getItem('token_type') || null;
  const prevCurrentRole = window.localStorage.getItem('current_role') || null;
  const prevToken = window.localStorage.getItem('token') || null;
  const prevUser = window.localStorage.getItem('user') || null;

  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [accessToken, setAccessToken] = useState(prevAccessToken);
  const [currentRole, setCurrentRole] = useState(prevCurrentRole);
  const [refreshToken, setRefreshToken] = useState(prevRefreshToken);
  const [tokenType, setTokenType] = useState(prevTokenType);
  const [token, setToken] = useState(prevToken);
  const [user, setUser] = useState(prevUser);


  const clearStorage = () => {
    setAuthenticated(false);
    setAccessToken('');
    setCurrentRole(null);
    setRefreshToken('');
    setTokenType('');
    setToken(null);
    setUser(null);
    window.localStorage.clear();
  };

  useEffect(
    () => {
      if(authenticated){
        window.localStorage.setItem('authenticated', authenticated);
        window.localStorage.setItem('access_token', accessToken);
        window.localStorage.setItem('current_role', currentRole);
        window.localStorage.setItem('refresh_token', refreshToken);
        window.localStorage.setItem('token_type', tokenType);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', user);
      } else {
        window.localStorage.removeItem('authenticated');
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('current_role');
        window.localStorage.removeItem('refresh_token');
        window.localStorage.removeItem('token_type');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
      }
      
    },
    [authenticated, currentRole, token, accessToken, refreshToken, tokenType, user]
  );


  const defaultContext = {
    clearStorage,
    authenticated,
    setAuthenticated,
    token,
    currentRole,
    setCurrentRole,
    setToken,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    tokenType,
    setTokenType,
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