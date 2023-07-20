import React, { useState, useEffect, useLayoutEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from "../../firebase";
import "./Flightsearchbar.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import NavBar from "../../Components/NavBar/NavBar";
import "./Flightsearchbar.css";
// import firebase from '../../firebase

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

  const [destinationoption, setDestinationoption] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showSuggestions2, setShowSuggestions2] = useState(true);

  const [departureLocationption, setDepartureLocationoption] = useState("");
  // const [showSuggestions, setShowSuggestions] = useState(true);

  const empCollectionRef = collection(db, "flights");
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // // let outputArray = [];

  // const fetchData = async () => {
  //   try {
  //     const querySnapshot = await getDocs(empCollectionRef);
  //     const data = querySnapshot.docs.map(
  //       (doc) => doc.data().departureLocation
  //     ); // Extracting departureLocation
  //     const jsonData = JSON.stringify(data); // JSON string
  //     console.log("jsonData : ", jsonData);

  //     let arr = JSON.parse(jsonData);
  //     function removeDuplicates(arr) {
  //       let unique = [];
  //       arr.forEach((element) => {
  //         if (!unique.includes(element)) {
  //           unique.push(element);
  //         }
  //       });
  //       return unique;
  //     }
  //     console.log(removeDuplicates(arr));

  //     // function removeusingSet(jsonData) {
  //     //   let outputArray = Array.from(new Set(jsonData));
  //     //   return outputArray;
  //     // }

  //     // console.log(removeusingSet(jsonData));
  //   } catch (error) {
  //     console.error("Error fetching data from Firestore:", error);
  //   }
  // };

  // const getUsers = async () => {
  //   const data = await getDocs(empCollectionRef);
  //   console.log("data data : ", data);
  // };

  const handleSearch = async () => {
    try {
      // Prepare the query based on the entered search criteria
      let flightQuery = collection(db, "flights");
      console.log("flightQuery : ", flightQuery);

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

  // useEffect(() => {
  //   const delay = 1000;
  //   const debounce = setTimeout(() => {
  //     console.log("hitting API");
  //   }, delay);

  //   return () => {
  //     clearTimeout(debounce);
  //   };
  // }, [destination]);

  const handleSearchDestination = (e) => {
    setDestination(e.target.value);

    const popularCities = [
      "Delhi",
      "Mumbai",
      "Chennai",
      "Kolkata",
      "Bangalore",
      "Hyderabad",
      "Ahmedabad",
    ];

    const filteredSuggestions = popularCities.filter((city) => {
      return city.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setDestinationoption(filteredSuggestions);
    setShowSuggestions(true);

    // Clear the suggestions when the destination is set
    // if (filteredSuggestions.length === 0) {
    //   setDestinationoption([]);
    // }

    console.log("filteredSuggestions:", filteredSuggestions);
  };

  const handleSearchDeparture = (e) => {
    setDepartureLocation(e.target.value);

    const popularCities = [
      "Delhi",
      "Mumbai",
      "Chennai",
      "Kolkata",
      "Bangalore",
      "Hyderabad",
      "Ahmedabad",
    ];

    const filteredSuggestions = popularCities.filter((city) => {
      return city.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setDepartureLocationoption(filteredSuggestions);
    setShowSuggestions2(true);

    // Clear the suggestions when the destination is set
    // if (filteredSuggestions.length === 0) {
    //   setDestinationoption([]);
    // }

    console.log("filteredSuggestions:", filteredSuggestions);
  };

  return (
    <div className="container-flight">
      <div>
        <NavBar />
      </div>

      <div className="flight-search-bar">
        <div className="relative">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={handleSearchDestination}
          />
          <div
            className={`${
              destination && showSuggestions ? "absolute" : "hidden"
            }`}
          >
            <ul className="listsearch">
              {destinationoption &&
                destinationoption.map((elem) => (
                  <li
                    key={elem}
                    onClick={() => {
                      setDestination(elem);
                      setShowSuggestions(false); // Hide the suggestions after setting the destination
                    }}
                  >
                    {elem}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Departure Location"
            value={departureLocation}
            onChange={handleSearchDeparture}
          />
          <div
            className={`${
              departureLocation && showSuggestions2 ? "absolute" : "hidden"
            }`}
          >
            <ul className="listsearch">
              {departureLocationption &&
                departureLocationption.map((elem) => (
                  <li
                    key={elem}
                    onClick={() => {
                      setDepartureLocation(elem);
                      setShowSuggestions2(false); // Hide the suggestions after setting the destination
                    }}
                  >
                    {elem}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {
          // <li>{jsonData}</li>
        }
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
