import React, { useState } from "react";
import "./Login.css";
import gas from "../assets/gas-cylinder.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credential = {
      email,
      pass: password,
    };
    try {
      const res = await axios.post("http://localhost:3003/user/login", credential);
      console.log(res);
      console.log(res.data.Message)
      alert(res.data.Message);
      if(res.status==200){
        Navigate("/");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("login",true);
    } catch (error) {
      console.log("Error registering user: ", error);
      alert(error.message);
    }
  };
  return (
    <div id="login">
      <div className="form">
        <div className="line1">
          <img src={gas} alt="" />
          <h5>GasBooker</h5>
        </div>
        <h3>Login to your account</h3>
        <h6>Enter your email and password to login to your account</h6>

        <form className="input" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label> <br />
          <input
            type="text"
            placeholder="m@example.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="passline">
            <label htmlFor="password">Password</label>
            <h6>Forgot password?</h6>
          </div>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id="login-btn" type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <span onClick={()=>Navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
