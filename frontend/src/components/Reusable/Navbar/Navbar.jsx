import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GiNotebook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useMyVariable } from "../../../context/email";
import './Navbar.css'; // Import the CSS file

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigateTo = useNavigate();
  let { myVariable, setMyVariable } = useMyVariable();

  function Logout() {
    setIsLoggedIn(false);
    setMyVariable(""); 
    localStorage.removeItem("thinker");
    navigateTo("/");
  }

  function LoggedIn(){
    console.log(myVariable);
    return myVariable !== "";
  }

  function handleRedirect() {
    if (myVariable === "") {
      navigateTo("/");
    } else {
      navigateTo("/dashboard");
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-brand" onClick={handleRedirect}>
          Notes App
          <GiNotebook className="icon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link href="/home">Home</Nav.Link>
            {LoggedIn() && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
