import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./viewpage.css";
import AdminNavbar from "../../Components/NavBar/AdminNavbar";

const Viewpage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    const flightCollectionRef = collection(db, "flights");
    const querySnapshot = await getDocs(flightCollectionRef);
    const flightData = querySnapshot.docs.map((doc) => doc.data());
    setFlights(flightData);
  };

  return (
    <div className="flight-card-container">
      <AdminNavbar />
      {flights.map((flight) => (
        <div className="flight-card" key={flight.id}>
          {flight.flightCompany === "Air India" && (
            <img
              src="https://cdn.dribbble.com/users/1867748/screenshots/4296757/media/b4bec06e13789c461c6e1669d234fb96.jpg?compress=1&resize=800x600&vertical=center"
              alt="Flight"
              className="flight-card-image"
            />
          )}
          {flight.flightCompany === "IndiGo" && (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZG039m4QCwsz0uXxCrFg66LMR5nhtROStUtduSHLD-zkTFSNqAED81CgJBPmjBHYmlo&usqp=CAU"
              alt="Flight"
              className="flight-card-image"
            />
          )}
          {flight.flightCompany === "indigo" && (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZG039m4QCwsz0uXxCrFg66LMR5nhtROStUtduSHLD-zkTFSNqAED81CgJBPmjBHYmlo&usqp=CAU"
              alt="Flight"
              className="flight-card-image"
            />
          )}
          {/* {flight.flightCompany === "IndiGo" ||
            (flight.flightCompany === "indigo" && (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZG039m4QCwsz0uXxCrFg66LMR5nhtROStUtduSHLD-zkTFSNqAED81CgJBPmjBHYmlo&usqp=CAU"
                alt="Flight"
                className="flight-card-image"
              />
            ))} */}
          {flight.flightCompany === "Go First" && (
            <img
              src="https://travelbizmonitor.com/wp-content/uploads/2023/05/Gofirst-logo.jpg"
              alt="Flight"
              className="flight-card-image"
            />
          )}
          {flight.flightCompany === "Vistara" && (
            <img
              src="https://seeklogo.com/images/V/vistara-logo-C07710BC2B-seeklogo.com.png"
              alt="Flight"
              className="flight-card-image"
            />
          )}
          {flight.flightCompany === "Air India Express" && (
            <img
              src="https://www.logo.wine/a/logo/Air_India/Air_India-Logo.wine.svg"
              alt="Flight"
              className="flight-card-image"
            />
          )}
          {flight.flightCompany === "SpiceJet" && (
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/b931b455155017.Y3JvcCw4MTAsNjM0LDAsMA.png"
              alt="Flight"
              className="flight-card-image"
            />
          )}
          {flight.flightCompany === "AirAsia India" && (
            <img
              src="https://internetnewsforyoublog.files.wordpress.com/2016/06/air-asia-logo.jpg?w=547"
              alt="Flight"
              className="flight-card-image"
            />
          )}

          <div className="flight-card-details">
            <h3>{flight.flightCompany}</h3>
            <p>Departure: {flight.departureLocation}</p>
            <p>Destination: {flight.destination}</p>
            <p>Price: {flight.price}</p>
            <p>Available Slots: {flight.availableSlots}</p>
            <p>Departure Date: {flight.departureDate}</p>
            <p>Return Date: {flight.returnDate}</p>
            <p>Flight Type: {flight.flightType}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Viewpage;
