import classes from "./Forms.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMyVariable } from "../../../context/email";

export default function Login({ setIsLoggedIn }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isThinker, setIsThinker] = useState("");
  const [wrong, setWrong] = useState(null);

  const { setMyVariable } = useMyVariable();
  const navigateTo = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    if (loginEmail !== "" && loginPassword !== "") {
      axios
        .post("https://notes-web-app-a7iu.onrender.com/login", {
          email: loginEmail,
          password: loginPassword,
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          if (response.status === 200) {
            setIsThinker("is");
            // Blank all fields
            setLoginEmail("");
            setLoginPassword("");
            setIsLoggedIn(true);
            setMyVariable(response.data.email);
            navigateTo("/dashboard");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            if (error.response.status === 400) {
              setIsThinker("isn't");
              setWrong("Email");
            } else if (error.response.status === 401) {
              setIsThinker("isn't");
              setWrong("Password");
            }
          }
        });
    }
  }

  return (
    <Form className={classes.loginForm} onSubmit={submitHandler}>
      {isThinker === "isn't" && (
        <Alert
          variant="danger"
          dismissible
          onClick={() => {
            setIsThinker("is");
          }}
        >
          Nice Try, Unfortunately ... <br></br> (Wrong {wrong})
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={loginEmail}
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
      </Form.Group>
      <div className={classes.buttonContainer}> {/* Centering Container */}
        <Button className="bttn" variant="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}
