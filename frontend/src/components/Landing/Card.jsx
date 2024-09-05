import classes from "./Card.module.css";
import Form from "react-bootstrap/Form";
import {  GiNotebook, GiPencil } from "react-icons/gi";
import React, { useState } from "react";
import axios from "axios";
import Login from "./Forms/Login";
import Signup from "./Forms/Signup";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useMyVariable } from "../../context/email";
import Footer from "../Reusable/Footer/Footer"

export default function Card({ setIsLoggedIn }) {
  const { setMyVariable } = useMyVariable();
  const navigateTo = useNavigate();
  const [In, setIn] = useState(true);

  // Google Authentication
  const google = window.google;
  function handleCredentialResponse(response) {
    const thinker = jwt_decode(response.credential);
    axios
      .post("http://localhost:4000/googleAuth", {
        email: thinker.email,
        username: thinker.name,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setMyVariable(response.data.email);
          setIsLoggedIn(true);
          navigateTo("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id:
        "978150168453-0cpljob8rbj9cuaos40on8mlvgm41gg8.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  };

  return (
    <>
    <div className={classes.Landing}>
      <div className={classes.Container}>
        <div className={classes.Card}>
          <div className={classes.formsDiv}>
            {In && <Login setIsLoggedIn={setIsLoggedIn} />}
            {!In && <Signup setIsLoggedIn={setIsLoggedIn} />}
            <Form.Check
              onClick={() => {
                setIn(!In);
              }}
              type="switch"
              style={{ marginTop: "10px" }}
              label={`${In ? "Signup" : "Login"} Instead`}
            />
            <div id="buttonDiv" className={classes.authBtn}></div>
          </div>
          <div className={classes.logoDiv}>
            <h1>
              Notes
              <GiNotebook />
            </h1>
            <h1>
              Not Jots
              <GiPencil/>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
