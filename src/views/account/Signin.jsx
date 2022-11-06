import React, { useRef, useState, useContext } from 'react';

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../layout/AuthDataProvider";
import authApi from '../../api/Authentication.jsx';
import Utils from '../../utils/Utils';


export default function SignIn() {
  let history = useNavigate();

  const { setAuthenticated, setToken, setUser } = useContext(AuthContext);
  
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);
  const [validatedPass, setValidatedPass] = useState(false);
  const [errorPass, setErrorPass] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailInput = useRef();
  const pswInput = useRef();


  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    
    const form = e.currentTarget;

    setError(null);

    setValidatedEmail(false);
    setErrorEmail(null);
    setValidatedPass(false);
    setErrorPass(null);
    
    if(emailInput.current.value === ''){
      setValidatedEmail(true);
      setErrorEmail('Please enter your email address.');
    }

    if(pswInput.current.value === ''){
      setValidatedPass(true);
      setErrorPass('Please enter your password.');
    }

    if (form.checkValidity() === true) {
      setIsLoading(true);

      // setAuthenticated(true);
      // setCurrentRole('Admin');
      // setAccessToken('accessToken1');
      // setRefreshToken('refreshToken1');
      // setTokenType('Bearer');
      // setToken('token1');
      // setUser(JSON.stringify({
      //   id: 1,
      //   username: 'User1',
      //   email: 'user1@gmail.com',
      // }));

      // history("/");
      
      authApi.login(emailInput.current.value, pswInput.current.value)
        .then((result) => {
          console.log('⚡ | result', result);
          if(result && result.data && result.data.data){
            setAuthenticated(true);
            setToken(JSON.stringify(result.data.data.id));
            setUser(JSON.stringify(result.data.data));
  
            history("/");
          } else {
            setError('Auth error');
          }
      });
    }
  };

  return (
      <div className="login">
        {
          error && !isLoading
          &&
          <div>Incorrect username or password!</div>
        }

        <div>
          <form noValidate onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                autoComplete="email"
                autoFocus
                ref={emailInput}
              />
              <input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                ref={pswInput}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
              >
                SIGN IN
              </button>
            </div>
            <div>
              <button
                disabled={isLoading}
                onClick={() => {
                  history('/Sign-up')
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}