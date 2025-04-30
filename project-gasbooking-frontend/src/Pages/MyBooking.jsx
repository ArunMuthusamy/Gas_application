import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyBooking.css";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";  // Import toast

const MyBooking = () => {
  const [booking, setBooking] = useState([]);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found, Please login first"); // Replaced alert
        console.error("No token found");
        return;
      }
      try {
        const res = await axios.get(
          "https://gas-application-1.onrender.com/booking/bookingdetails",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data.BookingList);
        setBooking(res.data.BookingList);
      } catch (error) {
        toast.error("Error fetching bookings: " + error.message); // Replaced alert
      }
    };
    fetchData();
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `https://gas-application-1.onrender.com/booking/bookingCancel/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.Message); // Replaced alert
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error canceling booking: " + error.message); // Replaced alert
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `https://gas-application-1.onrender.com/booking/updateStatus/${id}`,
        { status: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Status updated to completed"); // Replaced alert
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating status:", err.message);
      toast.error("Error updating status: " + err.message); // Replaced alert
    }
  };

  return (
    <div id="booking">
      <h1>My Bookings</h1>
      <h5>Manage your gas delivery bookings</h5>
      <div className="box">
        <div
          className={`box1 ${selectedTab === "upcoming" ? "active" : ""}`}
          onClick={() => setSelectedTab("upcoming")}
        >
          Upcoming
        </div>
        <div
          className={`box2 ${selectedTab === "completed" ? "active" : ""}`}
          onClick={() => setSelectedTab("completed")}
        >
          Completed
        </div>
      </div>

      {booking.length <= 0 ? (
        <h1>No bookings found...</h1> // No need to use toast here as it's not an error
      ) : (
        <div className="bar-collection">
          {booking
            .filter((data) =>
              selectedTab === "completed"
                ? data.status === "true"
                : data.status !== "true"
            )
            .map((data) => (
              <div className="bar" key={data._id}>
                <div className="bar-header">
                  <h2>{data.name}</h2>
                  {data.status == "true" ? (
                    <button id="status" className="details">
                      Completed
                    </button>
                  ) : (
                    <button
                      id="status"
                      className="add_details"
                      onClick={() => handleUpdate(data._id)}
                    >
                      Pending
                    </button>
                  )}
                </div>

                <p>
                  <IoLocationOutline /> {data.address}
                </p>
                <div className="rat-price">
                  <h6>🗓️ {data.available}</h6>
                  <h6>🕓 {data.time}</h6>
                  <h6>$ {data.price}</h6>
                </div>
                <div className="booking-btn">
                  <button
                    className="details"
                    onClick={() =>
                      navigate("/bookingDetails", { state: { booking: data } })
                    }
                  >
                    View Details
                  </button>
                  <button
                    className="cancel"
                    onClick={() => handleCancel(data._id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
