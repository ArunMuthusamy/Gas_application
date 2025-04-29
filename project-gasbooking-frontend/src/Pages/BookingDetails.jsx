import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSlots.css";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";


const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.booking;

  const [selectedDay, setSelectedDay] = useState("Today"); // for day
  const [selectedTime, setSelectedTime] = useState("");
  const [description, setDescription] = useState("");

  console.log(provider);
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return;
  }

  /*const handleSubmit = async () => {
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
        "http://localhost:3003/booking-post",
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
    }
  };*/

  return (
    <div id="slots">
      <p onClick={()=>navigate("/mybooking")}><FaArrowLeftLong /> Back to Providers</p>
      <div className="bar">
        <h2>{provider.name}</h2>
        <p>
          <IoLocationOutline /> {provider.address}
        </p>
        <div className="rat-price">
          <h6>🗓️ {provider.available}</h6>
          <h6>$ {provider.price}</h6>
        </div>
        <p>{provider.description}</p>
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
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bookSlot"
        style={{
          backgroundColor: "#fff",
          color: "teal",
          border: "2px solid teal",
        }}
      >
        Book Selected Slot
      </button>
    </div>
  );
};

export default BookingDetails;
