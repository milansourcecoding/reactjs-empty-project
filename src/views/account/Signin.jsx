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

      authApi.login(emailInput.current.value, pswInput.current.value)
        .then((result) => {
          if(result && result.data && result.data.data){
            setAuthenticated(true);
            setToken(result.data.data.token);
            setUser(JSON.stringify(result.data.data.user));
  
            history("/");
          } else {
            setError('Auth error');
            setIsLoading(false);
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