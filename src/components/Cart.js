import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { database } from './firebase';
import { ref, onValue, remove } from 'firebase/database';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('username');
    const cartRef = ref(database, `carts/${userId}`);
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      const itemsList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setCartItems(itemsList);

      const total = itemsList.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total);
    });
  }, []);

  const handleDelete = (itemId) => {
    const userId = localStorage.getItem('username');
    const itemRef = ref(database, `carts/${userId}/${itemId}`);
    remove(itemRef).then(() => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setTotalPrice(prevTotal => prevTotal - cartItems.find(item => item.id === itemId).price);
    });
  };

  return (
    <Container className="cart-container">
      <h2 className="text-center my-4">My Cart</h2>
      <Row>
        {cartItems.map(item => (
          <Col key={item.id} sm={12} className="my-3">
            <Card className="cart-item-card">
              <Row>
                <Col md={4}>
                  <Card.Img variant="top" src={item.imageUrl} alt={item.itemName} className="cart-item-image" />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text><strong>Price:</strong> ${item.price}</Card.Text>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        View Details
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item><strong>Phone Number:</strong> {item.phone}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="danger" className="delete-button" onClick={() => handleDelete(item.id)}>
                      🗑️
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="cart-total">
        <Col md={6}>
          <h4>Total Price: ${totalPrice}</h4>
        </Col>
        <Col md={6} className="text-right">
          <Button variant="success">Checkout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
