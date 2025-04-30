import React, { useState, useEffect } from "react";
import "./Landing.css";
import { IoIosSearch } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [provider, setProvider] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);
  const navigate = useNavigate();

  // Fetch providers on mount
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const res = await axios.get("https://gas-application-1.onrender.com/provider/providers-get", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setProvider(res.data.Providers || []);
        console.log(provider);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, Please login first");
      console.error("No token found");
      navigate("/login");
      return;
    }
    const filtered = provider.filter((p) =>
      p.state.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredProviders(filtered);
    console.log("i am clicked")
    console.log(filteredProviders);
  };

  return (
    <div id="landing">
      <div className="main">
        <h1 className="main-heading">Book Your Gas Slot Easily</h1>
        <h4 className="main-h3">
          Find and book gas slots from various providers in your area with just
          a few clicks.
        </h4>

        {/* Search Section */}
        <div className="search">
          <div className="searchbox">
            <IoIosSearch style={{ fontSize: "25px" }} />
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => {
                setSearchLocation(e.target.value);
              }}
              style={{ width: "25rem" }}
            />
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Filtered Providers Section */}
        {filteredProviders.length > 0 && (
          <div className="provider-list">
            <h3>Providers in "{searchLocation}"</h3>
            {filteredProviders.map((p) => (
              <div
                className="provider-card"
                key={p._id}
                onClick={() =>
                  navigate("/bookingSlots", { state: { provider: p } })
                }
              >
                <h4>{p.name}</h4>
                <p>{p.address}</p>
              </div>
            ))}
          </div>
        )}

        {filteredProviders.length === 0 && searchLocation && (
          <p className="no-results">
            No providers found for "{searchLocation}"
          </p>
        )}
      </div>

      {/* How It Works Section */}
      <div className="main-two">
        <h1 className="main-heading">How It Works</h1>
        <h4 className="main-h3">Book your gas slot in three simple steps</h4>
        <div className="grid">
          <div className="content">
            <div className="icon">
              <FiSearch />
            </div>
            <h5>Find Provider</h5>
            <h6>Search for gas providers in your area and compare prices.</h6>
          </div>
          <div className="content">
            <div className="icon">
              <LuCalendar />
            </div>
            <h5>Select Slot</h5>
            <h6>Choose a convenient time slot for your gas delivery.</h6>
          </div>
          <div className="content">
            <div className="icon">
              <RiContactsLine />
            </div>
            <h5>Confirm Booking</h5>
            <h6>Complete your booking and receive confirmation.</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
