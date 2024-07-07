import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './BuyItems.css';

function BuyItems() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    const itemsRef = ref(database, 'items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const itemsList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setItems(itemsList);
      setFilteredItems(itemsList);
      setLoading(false); // Turn off loading state once data is fetched
    });
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.section === filter));
    }
  }, [filter, items]);

  if (loading) {
    return (
      <div className="loading-indicator">
        <div className="loading-emoji">😊</div>
        <p>Uploading item to the store...</p>
      </div>
    );
  }

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <Link to="/" className="back-link">
          
            <span className="back-icon">&lt;</span> Back
          </Link>
        </Col>
      </Row>
      <h2 className="text-center mb-4">Browse Items</h2>
      <Form>
        <Form.Group controlId="sectionFilter">
          <Form.Label>Filter by Section</Form.Label>
          <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Stationary">Stationary</option>
            <option value="Dressing">Dressing</option>
            <option value="Engineering">Engineering</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Row>
        {filteredItems.map(item => (
          <Col key={item.id} sm={12} md={6} lg={4} className="my-1">
            <Card className="item-card">
              
              <Card.Body>
              <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
                
                <br />
                <Card.Text><strong>{capitalizeFirstLetter(item.itemName)}</strong> </Card.Text>
                <Card.Text><strong>Description:</strong> {item.description}</Card.Text>
                <Card.Text><strong>Section:</strong> {item.section}</Card.Text>
                <Card.Text><strong>Price:</strong> ${item.price}</Card.Text>
                <Card.Text><strong>Uploaded by:</strong> {item.userId}</Card.Text>
                {/* <Card.Text><strong>Contact:</strong> {item.contact}</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BuyItems;
