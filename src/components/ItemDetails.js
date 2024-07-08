import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from './firebase';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './ItemDetails.css';

function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const itemRef = ref(database, `items/${itemId}`);
    onValue(itemRef, (snapshot) => {
      setItem(snapshot.val());
    });

    // Check if item is already in cart
    const userId = localStorage.getItem('username');
    const cartRef = ref(database, `carts/${userId}`);
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemIds = Object.keys(data);
        const foundInCart = itemIds.includes(itemId);
        setInCart(foundInCart);
      }
    });
  }, [itemId]);

  const addToCart = () => {
    const userId = localStorage.getItem('username');
    const cartRef = push(ref(database, `carts/${userId}`));
    set(cartRef, {
      ...item,
      itemId
    });
    setInCart(true); // Update state to reflect item is now in cart
    // alert('Item added to cart');
  };

  const removeFromCart = () => {
    const userId = localStorage.getItem('username');
    const itemRef = ref(database, `carts/${userId}/${itemId}`);
    console.log(`carts/${userId}/${itemId}`);
    // itemRef.remove();
    remove(itemRef)
    .then(() => {
      setInCart(false); // Update state to reflect item is removed from cart
      alert('Item removed from cart');
    })
    .catch(error => {
      console.error('Error removing item from cart:', error.message);
      alert('Error removing item from cart');
    });
  };
  

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (!item) {
    return (
      <div className="loading-indicator">
        <div className="loading-circle">
          <div className="loader"></div>
          <span role="img" aria-label="loading" className="loading-emoji">😊</span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Container className="item-details-container">
      <Button variant="secondary" onClick={handleBackClick} className="mb-3">
        &larr; Back
      </Button>
      <Row className="my-4">
        <Col md={6}>
          <Card.Img variant="top" src={item.imageUrl} alt={item.name} className="item-image" />
        </Col>
        <Col md={6} className="item-info">
          <h2>{item.itemName}</h2>
          <p>{item.description}</p>
          <p><strong>Section:</strong> {item.section}</p>
          <p><strong>Uploaded by:</strong> {item.userId}</p>
          {/* <p><strong>Contact:</strong> {item.contact}</p> */}
        </Col>
      </Row>
      <Row className="item-details-bottom fixed-bottom">
        <Col md={6}>
          <p className="price"><strong>Price:</strong> ${item.price}</p>
        </Col>
        <Col md={6} className="text-right">
          {inCart ? (
            <Button variant="danger" onClick={removeFromCart}>Remove from Cart</Button>
          ) : (
            <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetails;
