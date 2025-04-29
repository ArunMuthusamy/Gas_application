import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../../Pages/Landing";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import Provider from "../../Pages/Provider";
import MyBooking from "../../Pages/MyBooking";
import AddProvider from "../../Pages/AddProvider";
import BookingSlots from "../../Pages/BookingSlots";
import BookingDetails from "../../Pages/BookingDetails";

const Reactrouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/provider" element={<Provider />} />
      <Route path="/mybooking" element={<MyBooking />} />
      <Route path="/addprovider" element={<AddProvider />} />
      <Route path="/bookingSlots" element={<BookingSlots />} />
      <Route path="/bookingDetails" element={<BookingDetails />} />
    </Routes>
  );
};

export default Reactrouting;
