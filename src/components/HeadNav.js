import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css'
function HeadNav({login=true,signup=true}) {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ItemExchange</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
        
          </Nav>
          <Form className="d-flex">
            {login?(<a href="Login" className='custom-link'>Login</a>):(<></>)}
            {signup?(<a href="Signup" className='custom-link'>Signup</a>):(<></>)}
            
          </Form>
        </Container>
      </Navbar>

    </div>
  )
}

export default HeadNav
