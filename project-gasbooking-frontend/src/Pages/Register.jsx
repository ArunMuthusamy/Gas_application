import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import gas from "../assets/gas-cylinder.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      pass: password,
      confirmpass: confirmPassword,
    };

    try {
      const res = await axios.post(
        "https://gas-application-1.onrender.com/user/register",
        userData
      );
      console.log(res);
      toast.success(res.data.Message || "Registration successful!");
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      toast.error(
        error.response?.data?.Message ||
          "Error registering user, please try again."
      );
    }
  };

  return (
    <div id="login">
      <div className="form">
        <div className="line1">
          <img src={gas} alt="gas-cylinder" />
          <h5>GasBooker</h5>
        </div>
        <h3>Create an account</h3>
        <h6>Enter your details to create a new account</h6>

        <form className="input" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label> <br />
          <input
            type="text"
            placeholder="John Doe"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="passline">
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button id="login-btn" type="submit">
            Register
          </button>
        </form>

        <p>
          If you don't have an account? <span>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
