import React from 'react';

import {useForm} from 'react-hook-form';
import {axios} from '../../utils';
import { withRouter } from 'react-router-dom';


function SignUp({history}) {

 const handleSignUpSubmit = values => {
    axios
      .post("/userSignup", {
        fullname: values.name,
        email: values.email,
        password: values.password,
      })
      .then(({ data }) => {
        window.localStorage.setItem("token", data);
        history.push("/home");
      });
  }

 
   
     const {
      register,
      handleSubmit,
      
    } = useForm();
    
    return (
      <div className="container-fluid vh-100" style={{ height: "100vh" }}>
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
          <h1>Join the pizza club!</h1>
          <div hoverable style={{ width: 500, height: 600 }}>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h4>Welcome 🍕 lover! </h4>
              <form
                className="d-flex justify-content-center align-items-center flex-column mt-5"
                onSubmit={handleSubmit(handleSignUpSubmit)}
              >
                <input
                  style={{ width: "170%", height: "50px" }}
                  className="mb-4 brand-input"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                <input
                  className="mb-4 brand-input"
                  style={{ width: "170%", height: "50px" }}
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                <input
                  className="mb-4 brand-input"
                  style={{ width: "170%", height: "50px" }}
                  type="password"
                  placeholder="Enter a password"
                  {...register("password")}
                />
                <input
                  className="mb-4 brand-input"
                  style={{ width: "170%", height: "50px" }}
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <button
                    className={"brand-btn"}
                  style={{ width: "170%", height: "50px" }}
                  type="submit"

                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default withRouter(SignUp);
