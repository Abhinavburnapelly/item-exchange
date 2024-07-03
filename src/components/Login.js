import React from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './Login.css';  // Import your custom CSS for styling
import HeadNav from './HeadNav';

function Login() {
  return (
    <>
    <HeadNav login={false} signup={true}/>
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
          {/* <div className="w-100 text-center mt-3">
            <a href="/">Forgot password?</a>
          </div> */}
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default Login;
