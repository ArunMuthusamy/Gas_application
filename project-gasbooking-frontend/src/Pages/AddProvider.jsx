import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import gas from "../assets/gas-cylinder.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Importing react-hot-toast

const AddProvider = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [state, setState] = useState("");
  const [typeofgas, setTypeofgas] = useState([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const providerData = {
      name,
      address,
      rating,
      price,
      available,
      state,
      typeofgas,
    };
    try {
      const res = await axios.post(
        "https://gas-application-1.onrender.com/provider/provide-post",
        providerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      toast.success(res.data.message); // Using toast for success message
      if (res.status === 200) {
        navigate("/provider");
      }
    } catch (error) {
      console.log("Error registering provider: ", error);
      toast.error("Error registering provider, please try again."); // Using toast for error message
    }
  };

  return (
    <div id="login">
      <div className="form" id="provider-form">
        <div className="line1">
          <img src={gas} alt="" />
          <h5>GasBooker</h5>
        </div>
        <h3>Add Provider</h3>
        <h6>Enter your details of Provider</h6>

        <form className="input" onSubmit={handleSubmit}> {/* Using onSubmit for form submission */}
          <label htmlFor="name">Full Name</label> <br />
          <input
            type="text"
            placeholder="Gas agency name..."
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="Address">Address</label> <br />
          <input
            type="text"
            placeholder="Gas agency address..."
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="passline">
            <label htmlFor="rating">Rating</label>
          </div>
          <input
            type="text"
            id="rating"
            placeholder="Enter the rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <div className="passline">
            <label htmlFor="price">Price</label>
          </div>
          <input
            type="text"
            id="price"
            placeholder="Enter the price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="Available">Available</label> <br />
          <input
            type="text"
            placeholder="Today, Tomorrow..."
            id="available"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
          />
          <label htmlFor="State">State</label> <br />
          <input
            type="text"
            placeholder="Enter your state...."
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <label htmlFor="typeofgas">Fuel Type</label> <br />
          <div className="fuel">
            <input
              type="text"
              placeholder="Type of fuel..."
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setTypeofgas((prev) => [...prev, type]);
                setType("");
              }}
            >
              Add
            </button>
          </div>
          <button id="login-btn" type="submit"> {/* Changed to type="submit" */}
            Add Provider
          </button>
        </form>

        <p>
          If you don't have an account? <span>Add provider here</span>
        </p>
      </div>
    </div>
  );
};

export default AddProvider;
