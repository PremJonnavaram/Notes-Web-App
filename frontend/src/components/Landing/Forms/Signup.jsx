import classes from "./Forms.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMyVariable } from "../../../context/email";

export default function Signup({ setIsLoggedIn }) {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [isThinker, setIsThinker] = useState("");
  const [wrong, setWrong] = useState(null);

  const { setMyVariable } = useMyVariable();
  const navigateTo = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    if (
      signupEmail !== "" &&
      signupUsername !== "" &&
      signupPassword !== "" &&
      signupConfirmPassword !== ""
    ) {
      if (signupPassword === signupConfirmPassword) {
        axios
          .post("https://notes-web-app-a7iu.onrender.com/thinkers", {
            email: signupEmail,
            username: signupUsername,
            password: signupPassword,
          })
          .then((response) => {
            setIsThinker("isn't");
            console.log(
              response.status,
              "Thinker Created @:",
              response.data.email,
              "Username:",
              response.data.username
            );
            // Blank all fields
            setSignupEmail("");
            setSignupUsername("");
            setSignupPassword("");
            setSignupConfirmPassword("");
            setMyVariable(response.data.email);
            setIsLoggedIn(true);
            navigateTo("/dashboard");
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            if (error.response.status === 400) {
              setIsThinker("is");
              setWrong("Email");
            } else if (error.response.status === 401) {
              setIsThinker("is");
              setWrong("Username");
            }
          });
      }
    }
  }

  return (
    <Form className={classes.signupForm} onSubmit={submitHandler}>
      {isThinker === "is" && (
        <Alert
          variant="danger"
          dismissible
          onClick={() => {
            setIsThinker("isn't");
          }}
        >
          {wrong} already in use, Please Login
        </Alert>
      )}
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={signupEmail}
          onChange={(e) => {
            setSignupEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Username"
        value={signupUsername}
        onChange={(e) => {
          setSignupUsername(e.target.value);
        }}
      />
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => {
            setSignupPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={signupConfirmPassword}
          onChange={(e) => {
            setSignupConfirmPassword(e.target.value);
          }}
        />
      </Form.Group>
      <div className={classes.buttonContainer}> {/* Centering Container */}
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </div>
    </Form>
  );
}
