import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
// import { useNavigate } from "react-router-dom";/

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Call the signOut function from Firebase Auth
      // Redirect or perform other actions after successful logout
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="user/FlightSearchBar" className="logo">
          FlightBooking
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/user/FlightSearchBar">Home</Link>
        </li>
        <li>
          <Link to="/user/FlightSearchBar/results">Flights</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>
            logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
