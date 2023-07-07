import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import InputControl from "../InputControl/Inputcontrol";
import { auth, db, storage } from "../firebase";
import { AuthContext } from "../Context/authContext";
import login from "./login.css";

function Login() {
  // const [data, setData] = useState({});

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  console.log(values);
  const { dispatch } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      if (!values.email || !values.pass) {
        setErrorMsg("Fill all fields");
        return;
      }
      setErrorMsg("");
      console.log(values.email);
      setSubmitButtonDisabled(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.pass
      );
      const user = userCredential.user;
      setSubmitButtonDisabled(false);

      console.log("login in");
      navigate("/Admin/AdminFlightDetail");
      dispatch({ type: "LOGIN", payload: user });
      console.log(user);
    } catch (err) {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="innerBox">
        <h1 className="heading">Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className="footer">
          <b className="error">{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/Adminsignup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <div className="innerBox">
    //     <h1 className="heading">Login</h1>

    //     <InputControl
    //       label="Email"
    //       // onChange={handleInput}
    //       onChange={(event) =>
    //         setValues((prev) => ({ ...prev, email: event.target.value }))
    //       }
    //       placeholder="Enter email address"
    //     />
    //     <InputControl
    //       label="Password"
    //       // onChange={handleInput}
    //       onChange={(event) =>
    //         setValues((prev) => ({ ...prev, pass: event.target.value }))
    //       }
    //       placeholder="Enter Password"
    //     />

    //     <div className="footer">
    //       <b className="error">{errorMsg}</b>
    //       <button disabled={submitButtonDisabled} onClick={handleSubmission}>
    //         Login
    //       </button>
    //       <p>
    //         Already have an account?{" "}
    //         <span>
    //           <Link to="/signup">Sign up</Link>
    //         </span>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Login;
