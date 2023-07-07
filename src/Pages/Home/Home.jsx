import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import Widgets from "../../Components/Widgets/Widgets";
import Charts from "../../Components/charts/Charts";
import Featured from "../../Components/featured/Featured";
import "./home.scss";
import Table from "../../Components/Table/Table";
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
