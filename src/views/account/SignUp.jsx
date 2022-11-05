import React, { useRef } from 'react';

import { useNavigate } from "react-router-dom";


export default function SignUp() {
  let history = useNavigate();

  const emailInput = useRef();
  const companyNameInput = useRef();
  const fullNameInput = useRef();

  
  return (
    <div className="signup-right" >
      <div>
        <form noValidate 
          onSubmit={() => {

          }}
        >
          <div>
            <input
              id="fullname"
              label="Full name"
              name="fullname"
              autoFocus
              ref={fullNameInput}
            /> 

            <input
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              ref={emailInput}
            />

            <input
              name="companyname"
              label="Company Name"
              id="companyname"
              ref={companyNameInput}

            />
          </div>
      
          <div>
            <button
              type="submit"
            >
              SIGN UP
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                history('/Sign-in')
              }}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}