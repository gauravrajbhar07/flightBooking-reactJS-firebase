import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import "./aviableFlight./css";
// import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../../Components/NavBar/NavBar";

const rows = [];

export default function Useravaiableflight() {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "flights");
  const navigate = useNavigate();
  const passengerCount = location.passengerCount;
  const aviableflight = location.state;
  console.log("viableflight :", aviableflight);
  //   console.log(first);

  useEffect(() => {
    if (aviableflight) {
      getUsers();
    }
  }, [aviableflight]);

  const getUsers = async () => {
    if (aviableflight) {
      const data = aviableflight;
      console.log("data : ", data);
      console.log("viableflight :::::", data);

      let list = [];
      data.forEach((element) => {
        list.push({ id: element.id, ...element });
      });
      setRows(list);

      // setRows(data.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("rows", rows);
    }
  };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const getUsers = async () => {
  //   const data = aviableflight;
  //   console.log("data : ", data);
  //   console.log("viableflight :::::", data);

  //   let list = [];
  //   data.forEach((element) => {
  //     list.push({ id: element.id, ...element });
  //   });
  //   setRows(list);

  //   // setRows(data.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   console.log("rows", rows);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "flights", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };

  const handleSearchFligth = () => {
    navigate("/user/FlightSearchBar");
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Avialble Flights
        </Typography>
        <Divider />
        <Box height={30} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(v)}
            getOptionLabel={(rows) => rows.flightCompany || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Search flightCompany"
              />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            variant="contained"
            onClick={handleSearchFligth}
            endIcon={<SearchIcon />}
          >
            Search Another
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "10px" }}>
                  flightCompany
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  departureLocation
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  destination
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  price
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  availableSlots
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  departureDate
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  returnDate
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  flightType
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  More Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell key={row.id} align="left">
                        {row.flightCompany}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.departureLocation}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.destination}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.price}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.availableSlots}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.departureDate}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.returnDate}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.flightType}
                      </TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          {/* <div className="cellAction">
                          <Link
                            to="/user/FlightSearchBar/view"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <div className="ViewButton">View More</div>
                          </Link>
                        </div> */}
                          <div className="cellAction">
                            <Link
                              // to="/user/FlightSearchBar/view"

                              style={{
                                textDecoration: "none",
                              }}
                            >
                              <div
                                onClick={() => {
                                  toast.success("Successfully Booked!");
                                }}
                                className="ViewButton"
                              >
                                Book Now
                              </div>
                            </Link>
                          </div>
                          {/* <viewIcon
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          //   onClick={() => editUser(row.id)}
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            deleteUser(row.id);
                          }}
                        /> */}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
