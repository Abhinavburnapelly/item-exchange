import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { database, storage } from './firebase'; // Make sure firebase is correctly configured
import { ref, set, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AddItem.css';
import HeadNav from './HeadNav';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [section, setSection] = useState('');
  const [otherSection, setOtherSection] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
    if (e.target.value !== 'Other') {
      setOtherSection('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName && description && price && phone && image && (section || otherSection)) {
      setLoading(true);
      const userId = localStorage.getItem('userId'); // Assuming you store the user's ID in localStorage
      const newItemRef = push(ref(database, 'items'));
      const itemId = newItemRef.key;

      const storageReference = storageRef(storage, 'item-images/' + itemId);
      uploadBytes(storageReference, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          set(newItemRef, {
            userId,
            itemName,
            description,
            price,
            phone,
            section: section === 'Other' ? otherSection : section,
            imageUrl: downloadURL,
          }).then(() => {
            console.log('Item successfully added');
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              navigate('/'); // Redirect to main page
            }, 3000);
          }).catch((error) => {
            console.error('Error adding item:', error);
            setError('Error adding item');
            setLoading(false);
          });
        });
      }).catch((error) => {
        console.error('Error uploading image:', error);
        setError('Error uploading image');
        setLoading(false);
      });
    } else {
      setError('All fields are required');
    }
  };

  return (
    <>
      <HeadNav />
      <Container className="d-flex justify-content-center align-items-center add-item-container">
        <Card className="add-item-card">
          <Card.Body>
            <h2 className="text-center mb-4">Add Item</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && (
              <div className="loading-indicator">
                <div className="loading-emoji">😊</div>
                <p>Uploading item to the store...</p>
              </div>
            )}
            {!loading && success && (
              <Alert variant="success">
                Successfully uploaded! Redirecting to the main page...
              </Alert>
            )}
            {!loading && !success && (
              <Form onSubmit={handleSubmit}>
                <Form.Group id="itemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="section">
                  <Form.Label>Section</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    value={section}
                    onChange={handleSectionChange}
                  >
                    <option value="">Select Section</option>
                    <option value="Stationary">Stationary</option>
                    <option value="Dressing">Dressing</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
                {section === 'Other' && (
                  <Form.Group id="otherSection">
                    <Form.Label>Specify Section</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={otherSection}
                      onChange={(e) => setOtherSection(e.target.value)}
                    />
                  </Form.Group>
                )}
                <Form.Group id="image">
                  <Form.Label>Item Image</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Button className="w-100 mt-3" type="submit">
                  Add Item
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AddItem;
