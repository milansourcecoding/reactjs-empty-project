import React, { useRef, useState, useContext, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../layout/AuthDataProvider";
import authApi from '../../api/Authentication.jsx';
import Utils from '../../utils/Utils';


export default function SignIn() {
  let history = useNavigate();

  const { clearStorage, token, refreshToken, authenticated, setAuthenticated, setToken, setCurrentRole, setAccessToken, setRefreshToken, setTokenType, setUser } = useContext(AuthContext);
  
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);
  const [validatedPass, setValidatedPass] = useState(false);
  const [errorPass, setErrorPass] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef(null);
  const emailInput = useRef();
  const pswInput = useRef();
  const axiosRef = useRef();


  useEffect(() => {
    // executed when component mounted
    axiosRef.current = Utils.getCancelToken();
    isMounted.current = true;

    return () => {
      // executed when unmount
      isMounted.current = false;
      axiosRef.current.cancel();
    }
  }, []);


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

      setAuthenticated(true);
      setCurrentRole('Admin');
      setAccessToken('accessToken1');
      setRefreshToken('refreshToken1');
      setTokenType('Bearer');
      setToken('token1');
      setUser(JSON.stringify({
        id: 1,
        username: 'User1',
        email: 'user1@gmail.com',
      }));

      history("/");
      
      // authApi.login(emailInput.current.lastChild.firstChild.value, pswInput.current.lastChild.firstChild.value, axiosRef.current.token)
      //   .then((result) => {
      //     Utils.parseResult(result, (data) => {
      //       setAuthenticated(true);
      //       setCurrentRole(data.owner_info.roles[0] !== undefined ? data.owner_info.roles[0].role_name : null);
      //       setAccessToken(data.token.access_token);
      //       setRefreshToken(data.token.refresh_token);
      //       setTokenType(data.token.token_type);
      //       setToken(JSON.stringify(data.token));
      //       setUser(JSON.stringify(data));

      //       history("/");
      //     }, (error, type) => {
      //       setError({ title: error });
      //       setIsLoading(false);
      //     });
      // });
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