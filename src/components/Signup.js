import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './Signup.css'; // Import your Signup.css for styling
import HeadNav from './HeadNav';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password && username) {
      console.log('User details:', { email, password, username });
      // Handle form submission (e.g., send data to a backend)
      setError(null);
    } else {
      setError('All fields are required');
    }
  };

  return (
    <>
    <HeadNav login={true} signup={false}/>
    <Container className="d-flex justify-content-center align-items-center signup-container">
      <Card className="signup-card">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSignup}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default Signup;
