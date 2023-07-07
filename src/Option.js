import React from "react";

import { Link, useNavigate } from "react-router-dom";

import "./option.css";

const Option = () => {
  const navigate = useNavigate();
  const handleUserLogin = () => {
    navigate("/login");

    console.log("user login ");
    // <Link to="/signup">Sign up</Link>;
  };

  const handleAdminLogin = () => {
    navigate("/adminLogin");
  };
  return (
    <div>
      <h1 className="heading ">flight booking </h1>
      <div className="container">
        <div className="user">
          <img
            className="img"
            src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          />

          <p>user</p>
          <button onClick={handleUserLogin}>user Login</button>
        </div>
        <div className="admin user">
          <img
            className="img"
            src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          />

          <p>Admin</p>
          <button onClick={handleAdminLogin}>Admin Login</button>
        </div>
      </div>
    </div>
  );
};

export default Option;
