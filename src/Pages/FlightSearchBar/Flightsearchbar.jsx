import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import "./Flightsearchbar.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import NavBar from "../../Components/NavBar/NavBar";
import "./Flightsearchbar.css";

const FlightSearchBar = () => {
  const [destination, setDestination] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [flightType, setFlightType] = useState("one-way");
  const [price, setPrice] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [departureLocationSuggestions, setDepartureLocationSuggestions] =
    useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      // Prepare the query based on the entered search criteria
      let flightQuery = collection(db, "flights");
      console.log(flightQuery);

      if (destination) {
        flightQuery = query(
          flightQuery,
          where("destination", "==", destination)
        );
      }

      if (departureLocation) {
        flightQuery = query(
          flightQuery,
          where("departureLocation", "==", departureLocation)
        );
      }

      if (departureDate) {
        flightQuery = query(
          flightQuery,
          where("departureDate", "==", departureDate)
        );
      }

      // if (passengerCount) {
      //   flightQuery = query(
      //     flightQuery,
      //     where("availableSlots", ">=", passengerCount)
      //   );
      // }

      if (returnDate && flightType === "round-trip") {
        flightQuery = query(flightQuery, where("returnDate", "==", returnDate));
      }

      // Fetch the flight data based on the query
      const querySnapshot = await getDocs(flightQuery);

      // Process the flight search results
      const flightResults = querySnapshot.docs.map((doc) => doc.data());

      // Do something with the flightResults (e.g., display them, update state, etc.)
      console.log("Flight search results:", flightResults);

      navigate("/user/FlightSearchBar/results", {
        state: flightResults,
        passengerCount: passengerCount,
      });
    } catch (error) {
      console.error("Error performing flight search:", error);
    }
  };

  return (
    <div className="container-flight">
      <div>
        <NavBar />
      </div>

      <div className="flight-search-bar">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="text"
          placeholder="Departure Location"
          value={departureLocation}
          onChange={(e) => setDepartureLocation(e.target.value)}
        />
        {departureLocationSuggestions.length > 0 && (
          <ul className="suggestion-list">
            {departureLocationSuggestions
              .filter((suggest) =>
                suggest.toLowerCase().includes(departureLocation.toLowerCase())
              )
              .map((suggest) => (
                <li key={suggest} onClick={() => setDepartureLocation(suggest)}>
                  {suggest}
                </li>
              ))}
          </ul>
        )}
        <input
          type="date"
          placeholder="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
        {flightType === "round-trip" && (
          <input
            type="date"
            placeholder="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        )}
        <input
          type="number"
          placeholder="Passenger Count"
          value={passengerCount}
          onChange={(e) => setPassengerCount(e.target.value)}
        />
        <select
          value={flightType}
          onChange={(e) => setFlightType(e.target.value)}
        >
          <option value="one-way">One Way</option>
          <option value="round-trip">Round Trip</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default FlightSearchBar;
