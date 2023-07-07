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
import "./aviableFlight.css";
import AdminNavbar from "../../Components/NavBar/AdminNavbar";
// import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const rows = [];

export default function AvaiableFlight() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const [des, setdes] = useState([]);
  const empCollectionRef = collection(db, "flights");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    console.log("data data : ", data);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setdes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

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
  // const filterData = (v) => {
  //   if (v) {
  //     setRows([v]);
  //     setdes([v]);
  //   } else {
  //     setRows();
  //     setdes();
  //     getUsers();
  //   }
  // };

  const filterData = (v) => {
    if (v) {
      setRows(rows.filter((row) => row.id === v.id));
      setdes(des.filter((row) => row.id === v.id));
    } else {
      getUsers();
    }
  };

  const handleAddFligth = () => {
    navigate("/Admin/AdminFlightDetail");
  };

  return (
    <div className="container-flight">
      <AdminNavbar />
      <Paper sx={{ width: "100%", overflow: "hidden" }} className="paper">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Admin Add Flights
        </Typography>
        <Divider />
        <Box height={30} />
        <Stack
          direction="row"
          spacing={2}
          className="my-2 mb-2 stack-container"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(v)}
            getOptionLabel={(row) => row.flightCompany || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search lightCompany" />
            )}
            // renderOption={(props, option) => (
            //   <li {...props}>{option.flightCompany}</li>
            // )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={des}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(v)}
            getOptionLabel={(row) => `${row.destination}` || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search destination" />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.destination}
              </li>
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            variant="contained"
            onClick={handleAddFligth}
            endIcon={<AddCircleIcon />}
          >
            Add
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 660 }}>
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
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
                        <EditIcon
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
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody> */}
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                      <TableCell align="left">{row.flightCompany}</TableCell>
                      <TableCell align="left">
                        {row.departureLocation}
                      </TableCell>
                      <TableCell align="left">{row.destination}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.availableSlots}</TableCell>
                      <TableCell align="left">{row.departureDate}</TableCell>
                      <TableCell align="left">{row.returnDate}</TableCell>
                      <TableCell align="left">{row.flightType}</TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
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
                          />
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
