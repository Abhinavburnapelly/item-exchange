import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Import the initialized auth instance

import './Login.css'; // Import your custom CSS for styling
import HeadNav from './HeadNav';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed in
        const user = userCredential.user;
        console.log('Logged in user:', user);
        setError(null);
        // Redirect to /HomePage
        window.location.href = '/Homepage';
        
      })
      .catch((error) => {
        console.error('Error logging in:', error.code, error.message); // Log Firebase error details
        setError('Failed to log in. Please check your email and password.');
      });
  };

  return (
    <>
      <HeadNav login={false} signup={true} />
      <Container className="d-flex justify-content-center align-items-center login-container">
        <Card className="login-card">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleLogin}>
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
              <Button className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
