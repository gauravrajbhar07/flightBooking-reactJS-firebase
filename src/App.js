import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Login/Login";
import Single from "./Pages/single/Single";
import List from "./Pages/List/List";
// import New from "./Pages/New/New";
import Adminlogin from "./Login/Adminlogin";
import Adminsignup from "./SignUp/Adminsignup";
import Porduct from "./Pages/product/Product";
// import { userInputs } from "./fromSource";
import { productInputs, userInputs } from "./fromSource";
import "./style/dark.scss";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useContext, useReducer } from "react";
import { DarkModeContext } from "./Context/darkModeContext";

import { AuthContext } from "../src/Context/authContext";
import Product from "./Pages/product/Product";
import ProductList from "./Pages/List/ProductList";
import NewProduct from "./Pages/New/NewProduct";
import Signup from "./SignUp/Signup";
import Option from "./Option";
import AvaiableFlight from "./Pages/aviableFlight/Avaiableflight";
import AdminFlightDetail from "./Pages/AdminFlightDetail.jsx/AdminFlightDetail";
import Useravaiableflight from "./Pages/userAvaiableFlight/Useravaiableflight";
import FlightSearchBar from "./Pages/FlightSearchBar/Flightsearchbar";
import Viewpage from "./Pages/viewPage/Viewpage";
import New from "./Pages/New/New";

function App() {
  // const [dark, setDark] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  // const currentUser = true;
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  console.log(currentUser);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Option />}></Route>

          <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/adminLogin" element={<Adminlogin />} />
            <Route path="/adminsignup" element={<Adminsignup />} />

            {/* <Route path="/adminAddFlight" element={<AdminFlightDetail />} /> */}
            <Route
              path="/UseravaiableFlight"
              element={<Useravaiableflight />}
            />

            {/* UseravaiableFlight */}

            {/* <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            /> */}

            {/* <Route index element={<Login />}></Route> */}

            <Route path="/user/FlightSearchBar">
              <Route
                index
                element={
                  <RequireAuth>
                    <FlightSearchBar />
                  </RequireAuth>
                }
              />

              <Route
                path="results"
                element={
                  <RequireAuth>
                    <Useravaiableflight />
                  </RequireAuth>
                }
              />
              <Route
                path="view"
                element={
                  <RequireAuth>
                    <Viewpage />
                  </RequireAuth>
                }
              />
            </Route>

            {/* <Route
              path="AdminFlightDetail"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            /> */}

            <Route path="/Admin/AdminFlightDetail">
              <Route
                index
                element={
                  <RequireAuth>
                    <AdminFlightDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="avaiableFlight"
                element={
                  <RequireAuth>
                    <AvaiableFlight />
                  </RequireAuth>
                }
              />
              <Route
                path="allFlights"
                element={
                  <RequireAuth>
                    <Viewpage />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
