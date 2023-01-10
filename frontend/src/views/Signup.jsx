import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordref = React.useRef();
  const passwordConfirmationRef = React.useRef();

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordref.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    // console.log(payload);
    axiosClient
      .post("/api/auth/signup", payload)
      .then((res) => {
        setUser(res.data.user);
        setToken(res.data.token);
      })
      .catch((err) => {
        const response = err.response.data;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {/* {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))} */}
          {/* </div>
          )} */}
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordref} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Repeat Password"
          />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
