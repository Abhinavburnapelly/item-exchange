import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeadNav({login=true,signup=true}) {
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var username = capitalizeFirstLetter(localStorage.getItem('username'));

  const handleSignOut = () => {
    localStorage.removeItem('username');
    window.location.reload(); // Reload the page to update the UI
  };

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ItemExchange</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
          {localStorage.getItem('username') === null ? (
            <Form className="d-flex">
              {login ? (<a href="Login" className='custom-link'>Login</a>) : (<></>)}
              {signup ? (<a href="Signup" className='custom-link'>Signup</a>) : (<></>)}
            </Form>
          ) : (
            <NavDropdown className="nav-dropdown-custom" title={username} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/cart">Go to Cart</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default HeadNav;
