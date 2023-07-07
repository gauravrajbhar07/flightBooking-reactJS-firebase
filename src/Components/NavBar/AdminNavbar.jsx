import React from "react";
import { Link } from "react-router-dom";
import "./adminNavbar.css";

const AdminNavbar = () => {
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
          <Link to="/settings">logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
