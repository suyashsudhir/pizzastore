import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {axios} from "../../utils";

import {withRouter} from 'react-router-dom';
import {Loader} from "semantic-ui-react";
import signinImage from '../../assets/img/pizza-signin.jpg'


function SignIn({history}) {
    const [rememberMe, setRememberMe] = useState(false);
    const [signIn, setSigningIn] = useState(false)

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm();


    const submitForm = (values) => {
        setSigningIn(true);
        if (values.username === ''.trim() || !values.username) {
            setError("username", {
                type: 'validate',
                message: 'Email is required!'
            })

            setSigningIn(false)
        } else if (values.password === "".trim() || !values.password) {
            setError("password", {
                type: "validate",
                message: "Password is required!",
            });
            setSigningIn(false)

        }
        axios
            .post("/login", {
                username: values.username,
                password: values.password,
                rememberMe: rememberMe,
            })
            .then(({data}) => {
                
                setSigningIn(false)

                    window.localStorage.setItem("token", data);
                   window.location.href = "/menu";

            })
            .catch((e) => {

                if (e.response.status === 403){
                    setError("username", {
                        type: "validate", message: "We couldn't find this email!"
                    })
                }
                else {
                    setError("password", {
                        type: "validate", message: "Your Password is incorrect"
                    })
                }
                setSigningIn(false);
            });
    };

    return (
        <div className="signin-container">
            <div className="signin-wrapper">
                <div className="signin-image">
                    <img src={signinImage} alt="signin"/>
                </div>
                <div className="signin-form-wrapper">
                    <h1>Sign In</h1>
                    <div className="signin-card">
                        <h4>Hey there 🍕 lover! </h4>
                        <form
                            onSubmit={handleSubmit(submitForm)}
                        >
                            <div className="signin-form">
                                <div className="signin-field">
                                    <input
                                    placeholder="Enter your email"
                                        className={`mb-3 ${
                                            errors.username ? "brand-input-error" : "brand-input"
                                        }`}
                                        type="email"
                                        {...register("username")}

                                    />
                                    {errors.username && (
                                        <div className="mt-1 mb-3 text-red">
                                            {errors.username.message}
                                        </div>
                                    )}
                                </div>
                                <div className="signin-field">
                                    <input
                                    placeholder="Enter your password"
                                        className={`mb-3 ${
                                            errors.password ? "brand-input-error" : "brand-input"
                                        }`}
                                        type="password"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <div className="mt-1 mb-3 text-red">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>
                                <div className="signin-field">
                                    <input type="checkbox"
                                           id={"remeberme"}
                                           className="mb-3"
                                           name={"remeberme"}
                                           checked={rememberMe}
                                           onClick={() => setRememberMe(!rememberMe)}
                                           {...register("rememberme")}
                                    />
                                    <label htmlFor={"remeberme"}>Remember Me</label>

                                </div>
                                <div className="signin-field">
                                    <button
                                        className="brand-btn"
                                        type="submit"

                                    >
                                        {signIn ? <Loader active={true} inverted={true}/> : "Sign In"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="new-account-link">
                            New here? <a href="/signup">
                                Join Us
                            </a>
                        </div>
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

export default withRouter(SignIn)
