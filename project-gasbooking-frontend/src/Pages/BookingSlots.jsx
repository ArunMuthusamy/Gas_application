import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSlots.css";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";

const BookingSlots = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider;

  const [selectedDay, setSelectedDay] = useState("Today"); // for day
  const [selectedTime, setSelectedTime] = useState("");
  const [description, setDescription] = useState(
    "LPG gas dealership is a business that involves selling liquefied petroleum gas (LPG) to customers for use in cooking, heating, and other purposes. As an LPG gas dealership owner, you will be responsible for obtaining LPG gas from a supplier and selling it to customers."
  );

  console.log(provider);
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return;
  }

  const handleSubmit = async () => {
    const bookingDetails = {
      name: provider.name,
      address: provider.address,
      available: selectedDay,
      time: selectedTime,
      price: provider.price,
      description: description,
      status: "pending",
    };
    try {
      const res = await axios.post(
        "https://gas-application-1.onrender.com/booking/booking-post",
        bookingDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      alert(res.data.Message);
      if (res.status == 200) {
        navigate("/mybooking");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div id="slots">
      <p onClick={() => navigate("/provider")}>
        <FaArrowLeftLong /> Back to Providers
      </p>
      <div className="bar">
        <h2>{provider.name}</h2>
        <p>
          <IoLocationOutline /> {provider.address}
        </p>
        <div className="rat-price">
          <h6>🗓️ {provider.available}</h6>
          <h6>$ {provider.price}</h6>
        </div>
        {provider.description ? (
          <p>{provider.description}</p>
        ) : (
          <div className="type">
            {provider.typeofgas.map((gasType) => (
              <div key={gasType}>{gasType}</div>
            ))}
          </div>
        )}
      </div>
      <h1>Available Slots</h1>
      <p>Select a day and time slot for your gas delivery</p>

      <div className="box">
        <div
          className={`box1 ${selectedDay === "Today" ? "activ" : ""}`}
          onClick={() => setSelectedDay("Today")}
        >
          Today
        </div>
        <div
          className={`box2 ${selectedDay === "Tomorrow" ? "activ" : ""}`}
          onClick={() => setSelectedDay("Tomorrow")}
        >
          Tomorrow
        </div>
        <div
          className={`box3 ${selectedDay === "In 2 days" ? "activ" : ""}`}
          onClick={() => setSelectedDay("In 2 days")}
        >
          In 2 days
        </div>
      </div>

      <div className="slot-time">
        {/* Repeat for each time */}
        <div
          id="time1"
          className={selectedTime === "Invalid Data" ? "active" : ""}
          onClick={() => setSelectedTime("Invalid Data")}
        >
          🕓 Invalid Data
        </div>
        <div
          id="time2"
          className={selectedTime === "10:00" ? "active" : ""}
          onClick={() => setSelectedTime("10:00")}
        >
          🕓 10:00
        </div>
        <div
          id="time3"
          className={selectedTime === "11:00" ? "active" : ""}
          onClick={() => setSelectedTime("11:00")}
        >
          🕓 11:00
        </div>
        <div
          id="time4"
          className={selectedTime === "12:00" ? "active" : ""}
          onClick={() => setSelectedTime("12:00")}
        >
          🕓 12:00
        </div>
        <div
          id="time5"
          className={selectedTime === "13:00" ? "active" : ""}
          onClick={() => setSelectedTime("13:00")}
        >
          🕓 13:00
        </div>
        <div
          id="time6"
          className={selectedTime === "14:00" ? "active" : ""}
          onClick={() => setSelectedTime("14:00")}
        >
          🕓 14:00
        </div>
        <div
          id="time7"
          className={selectedTime === "15:00" ? "active" : ""}
          onClick={() => setSelectedTime("15:00")}
        >
          🕓 15:00
        </div>
        <div
          id="time8"
          className={selectedTime === "16:00" ? "active" : ""}
          onClick={() => setSelectedTime("16:00")}
        >
          🕓 16:00
        </div>
      </div>

      <label htmlFor="" style={{ fontWeight: "bold" }}>
        Enter the Description
      </label>
      <input
        type="text"
        className="description"
        id="description"
        value={description}
        onClick={(e) => setDescription("")}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bookSlot" onClick={handleSubmit}>
        Book Selected Slot
      </button>
    </div>
  );
};

export default BookingSlots;
