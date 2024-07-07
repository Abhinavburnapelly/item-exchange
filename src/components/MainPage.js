import React from 'react';
import '../App.css';
import HeadNav from './HeadNav';
import { Button, Container, Row, Col } from 'react-bootstrap';

function MainPage() {
  return (
    <div>
      <HeadNav />
      {localStorage.getItem('username')===null?<></>:
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
            <Button 
              className="main-button" 
              variant="light" 
              href="/add-item" 
              style={{ width: '100%', height: '100px' }}>
              Add Item to Store
            </Button>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
            <Button 
              className="main-button" 
              variant="light" 
              href="/buy-items" 
              style={{ width: '100%', height: '100px' }}>
              Buy Item
            </Button>
          </Col>
        </Row>
      </Container>
      }
    </div>
  );
}

export default MainPage;
