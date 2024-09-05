import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GiNotebook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useMyVariable } from "../../../context/email";
import './Navbar.css'; // Import the CSS file

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigateTo = useNavigate();
  const { myVariable } = useMyVariable();
  
  function Logout() {
    localStorage.removeItem("thinker"); // Clear user data from localStorage
    setIsLoggedIn(false); // Update state
    navigateTo("/"); // Redirect to home
  }

  function handleRedirect  () {
    if (myVariable === "") {
      navigateTo("/");
    }else{
      navigateTo("/dashboard");
    }
  };
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
            {isLoggedIn && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
