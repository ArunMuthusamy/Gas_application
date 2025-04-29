import React from "react";
import "./Navbar.css";
import gas from "../assets/gas-cylinder.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const login = localStorage.getItem("login");
  const navigate=useNavigate("");
  return (
    <>
      <nav id="navbar">
        <div className="icons">
          <img src={gas} alt="" />
          <h1>GasBooker</h1>
        </div>
        {login == "true" ? (
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/provider">Provider</Link>
            <Link to="/mybooking">My Booking</Link>
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("login");
                navigate("/")
              }}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/provider">Provider</Link>
            <Link to="/mybooking">My Booking</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
