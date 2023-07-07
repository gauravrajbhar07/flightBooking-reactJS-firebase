import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import InputControl from "../InputControl/Inputcontrol";
// import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
// import { addDoc,  setDoc } from "firebase/firestore";
import signup from "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const handleInput = (e) => {
    const id = e.target.id;

    // using ...data for storing all the input key:values in a single object
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  console.log(data);
  // const [values, setValues] = useState({
  //   // id: e.target.value,
  //   name: "",
  //   email: "",
  //   pass: "",
  //   // timeStamp: serverTimestamp(),
  // });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      //another methods
      // const userData = {
      //   ...data, // Collect all the form input data
      //   timeStamp: serverTimestamp(), // Add a timestamp field
      // };

      //its a promise that why asyac/await
      await setDoc(doc(db, "Admins", res.user.uid), {
        ...data,
        roles: "admin",
        timeStamp: serverTimestamp(),
      });

      //after submit the data navigate to the previsous page !
      navigate(-1);

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // if (!values.name || !values.email || !values.pass) {
    //   setErrorMsg("Fill all fields");
    //   return;
    // }
    // setErrorMsg("");

    // setSubmitButtonDisabled(true);

    // const res = createUserWithEmailAndPassword(auth, values.email, values.pass)
    //   .then(async (userCredential) => {
    //     setSubmitButtonDisabled(false);
    //     const user = userCredential.user;

    //     // await addDoc(collection(db, "users"), values);

    //     await addDoc(doc(db, "users"), {
    //       ...values,
    //       timeStamp: serverTimestamp(),
    //     });
    //     navigate("/home");
    //   })
    //   .catch((err) => {
    //     setSubmitButtonDisabled(false);
    //     setErrorMsg(err.message);
    //   });
  };

  return (
    <div className="container">
      <div className="innerBox">
        <h1 className="heading">Signup</h1>

        <InputControl
          label="Name"
          id="name"
          placeholder="Enter your name"
          onChange={handleInput}
          // onChange={(event) =>
          //   setValues((prev) => ({
          //     ...prev,
          //     name: event.target.value,
          //   }))
          // }
        />
        <InputControl
          label="Email"
          id="email"
          placeholder="Enter email address"
          onChange={handleInput}
          // onChange={(event) =>
          //   setValues((prev) => ({
          //     ...prev,
          //     email: event.target.value,
          //     id: event.target.value,
          //   }))
          // }
        />
        <InputControl
          label="Password"
          id="password"
          placeholder="Enter password"
          onChange={handleInput}
          // onChange={(event) =>
          //   setValues((prev) => ({ ...prev, pass: event.target.value }))
          // }
        />

        <div className="footer">
          <b className="error">{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
