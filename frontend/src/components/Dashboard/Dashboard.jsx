import classes from "./Dashboard.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useMyVariable } from "../../context/email";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigateTo = useNavigate();
  const { myVariable } = useMyVariable();
  if (myVariable === "") {
    navigateTo("/");
  }
  const email = myVariable;
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const getNotes = useCallback(async () => {
    axios
      .post("http://localhost:4000/dashboard/", {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        setNotes(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      });
  }, [email]);
  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/dashboard/add", {
        email: email,
        title: title,
        note: note,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        setTitle("");
        setNote("");
        getNotes();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      });
  }
  useEffect(() => {
    getNotes();
  }, [email, getNotes]);

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1>Create a new Note</h1>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Title"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingTextarea2"
          label="Start typing here..."
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </FloatingLabel>
        <br />
        <Button variant="primary" type="submit">
          Create
        </Button>
      </form>
      <div className={classes.notesDiv}>
        {notes.length === 0 && (
          <h1>Hmm....So empty, create a new note please</h1>
        )}
        {notes &&
          notes.map((note) => (
            <div key={note._id} className="card my-3">
              <h4 className="card-header">{note.title}</h4>
              <div className="card-body">
                <p>{note.note}</p>
              </div>
              <Button
                style={{
                  width: "100px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
                variant="danger"
                onClick={() => {
                  console.log(note._id);
                  axios
                    .delete("http://localhost:4000/dashboard/delete", {
                      data: {
                        id: note._id,
                      },
                    })
                    .then((response) => {
                      console.log(response.data);
                      console.log(response.status);
                      getNotes();
                    })
                    .catch((error) => {
                      if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                      }
                    });
                  getNotes();
                }}
              >
                DELETE
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
