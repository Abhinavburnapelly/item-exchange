import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { database } from './firebase'; // Import the initialized database
import './Signup.css'; // Import your Signup.css for styling
import HeadNav from './HeadNav';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email && password && username) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // Save additional user data to the Realtime Database
        await set(ref(database, 'users/' + newUser.uid), {
          email: newUser.email,
          username,
        });

        console.log('User details:', { email: newUser.email, username });
        setError(null);
      } catch (error) {
        console.error('Error signing up:', error.message);
        setError('Error signing up');
      }
    } else {
      setError('All fields are required');
    }
  };

  return (
    <>
      <HeadNav login={true} signup={false} />
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
