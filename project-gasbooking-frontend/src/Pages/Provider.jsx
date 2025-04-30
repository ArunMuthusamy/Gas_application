import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Provider.css";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Provider = () => {
  const [provider, setProvider] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found, Please login first");
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
        console.log(res.data.Providers);
        setProvider(res.data.Providers);
      } catch (error) {
        console.log("Error fetching providers:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProviders = provider.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "" || p.typeofgas.includes(selectedType);

    return matchesSearch && matchesType;
  });

  return (
    <div id="provider">
      <div className="header">
        <div className="header-content">
          <h2>Gas Providers</h2>
          <h6>Find and book gas slots from various providers</h6>
        </div>
        <div className="filter">
          <input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="LPG">LPG</option>
            <option value="CNG">CNG</option>
            <option value="Propane">Propane</option>
            <option value="Natural Gas">Natural Gas</option>
          </select>
        </div>
      </div>

      <button className="add_details" onClick={() => navigate("/addprovider")}>
        Add Providers
      </button>

      {filteredProviders.length <= 0 ? (
        <h1>Provider not found...</h1>
      ) : (
        <div className="card-collection">
          {filteredProviders.map((data) => (
            <div className="card" key={data._id}>
              <h3>{data.name}</h3>
              <p>
                <IoLocationOutline /> {data.address}
              </p>
              <div className="rat-price">
                <h6>⭐️ {data.rating}</h6>
                <h6>${data.price}</h6>
              </div>
              <p>🕓 Available: {data.available}</p>
              <div className="type">
                {data.typeofgas.map((gasType) => (
                  <div key={gasType}>{gasType}</div>
                ))}
              </div>
              <button
                className="slot-book"
                onClick={() =>
                  navigate("/bookingSlots", { state: { provider: data } })
                }
              >
                Book Slots
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Provider;
