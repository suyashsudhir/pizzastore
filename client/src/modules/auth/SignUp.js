import React from 'react';

import {useForm} from 'react-hook-form';
import {axios} from '../../utils';
import { withRouter } from 'react-router-dom';
import signUpImage from '../../assets/img/signupImage.jpg'


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
        <div className="signin-container">
            <div className="signin-wrapper">
                <div className="signin-image" style={{height: '100vh'}}>
                    <img src={signUpImage} alt="signup-image"/>
                </div>
                <div className="signin-form-wrapper">
                    <h1>Join the Pizza Club!</h1>
                    <div className="signin-card">
                        <h4>Welcome 🍕 lover! </h4>
                        <form

                            onSubmit={handleSubmit(handleSignUpSubmit)}
                        >
                            <div className="signin-form">

                            <div className="signin-field">
                            <input

                                className="mb-4 brand-input"
                                type="text"
                                placeholder="Enter your name"
                                {...register("name")}
                            />

                            </div>
                                <div className="signin-field">
                            <input
                                className="mb-4 brand-input"

                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                            />
                                </div>
                                <div className="signin-field">
                            <input
                                className="mb-4 brand-input"

                                type="password"
                                placeholder="Enter a password"
                                {...register("password")}
                            />
                                </div>
                                <div className="signin-field">
                            <input
                                className="mb-4 brand-input"

                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                            />
                            </div>
                            <div className="signin-field">
                            <button
                                className={"brand-btn"}

                                type="submit"

                            >
                                Sign Up
                            </button>
                            </div>
                            </div>
                        </form>
                    </div>


                </div>


                {/* <button
            onClick={handleGoogleSignIn}
            className="brand-btn"
          >
            Sign In with Google
          </button> */}
            </div>
        </div>
    );
}

export default withRouter(SignUp);
