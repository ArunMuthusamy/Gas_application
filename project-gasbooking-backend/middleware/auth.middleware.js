const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ Message: 'No token provided,Please login first' });
  }

  const bearerToken = token.split(' ')[1]; 

  if (!bearerToken) {
    return res.status(403).json({ Message: 'Token is not in the correct format' });
  }

  try {
    // Verify the token using your JWT secret or key
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ Message: 'Invalid token', error: error.message });
   
  }
};

module.exports = auth;
