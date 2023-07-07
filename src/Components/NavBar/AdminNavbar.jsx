import React from "react";
import { Link } from "react-router-dom";
import "./adminNavbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const AdminNavbar = () => {
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
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">
        <Link to="#">Flight Admin Dashboard</Link>
      </div>
      <ul className="admin-navbar-links">
        <li>
          <Link to="/Admin/AdminFlightDetail">Dashboard</Link>
        </li>
        <li>
          <Link to="/Admin/AdminFlightDetail/avaiableFlight">Flight Table</Link>
        </li>
        <li>
          <Link to="/Admin/AdminFlightDetail/allFlights">
            All Aviable Flight
          </Link>
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

export default AdminNavbar;
