import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./AdminFlightdetaiil.css";

import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AdminNavbar from "../../Components/NavBar/AdminNavbar";

const AdminFlightDetail = () => {
  const [flightCompany, setFlightCompany] = useState("");
  const [destination, setDestination] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState("");
  const [flightType, setFlightType] = useState("one-way");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flightData = {
        flightCompany,
        destination,
        departureLocation,
        departureDate,
        returnDate,
        availableSlots,
        flightType,
        price,
      };

      // Add flight data to Firebase Firestore
      const docRef = await addDoc(collection(db, "flights"), flightData);

      toast.success("Successfully Added!");
      console.log("Flight added with ID: ", docRef.id);
      setTimeout(() => {
        // toast("Here is your toast.");
        setFlightCompany("");
        setDestination("");
        setDepartureLocation("");
        setDepartureDate("");
        setReturnDate("");
        setAvailableSlots("");
        setFlightType("one-way");
        setPrice("");
        navigate("/Admin/AdminFlightDetail/avaiableFlight");
      }, 2000);

      // Clear form fields after submission
    } catch (error) {
      toast.error("This didn't work.");
      setTimeout(() => {
        console.error("Error adding flight: ", error);
      }, 2000);
    }
  };

  return (
    <div className="admin-form">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <AdminNavbar />
      <h2>Add Flight Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Flight Company:
          <select
            value={flightCompany}
            onChange={(e) => setFlightCompany(e.target.value)}
            required
          >
            <option value="">Select Flight Company</option>
            <option value="AirAsia India">AirAsia India</option>
            <option value="Air India">Air India</option>
            <option value="Air India Express">Air India Express</option>
            <option value="Go First">Go First</option>
            <option value="IndiGo">IndiGo</option>
            <option value="SpiceJet">SpiceJet</option>
            <option value="Vistara">Vistara</option>
          </select>
        </label>
        <label>
          Flight Type:
          <select
            value={flightType}
            onChange={(e) => setFlightType(e.target.value)}
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
          </select>
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </label>
        <label>
          Departure Location:
          <input
            type="text"
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </label>
        <label>
          Return Date:
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required={flightType === "round-trip"}
            disabled={flightType === "one-way"}
          />
        </label>
        <label>
          Available Slots:
          <input
            type="number"
            value={availableSlots}
            onChange={(e) => setAvailableSlots(e.target.value)}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Update the onChange handler to set the price state
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminFlightDetail;
