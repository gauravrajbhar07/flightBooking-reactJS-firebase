import "./home.scss";

import FlightSearchBar from "../FlightSearchBar/Flightsearchbar";
import AdminFlightDetail from "../AdminFlightDetail.jsx/AdminFlightDetail";

const Home = () => {
  return (
    <div className="home">
      {/* <NavBar /> */}

      <AdminFlightDetail />
      {/* <SideBar /> */}
      <FlightSearchBar />
    </div>
  );
};

export default Home;
