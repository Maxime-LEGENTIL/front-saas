import { Container, Row, Col, Form, Button, Modal, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductCreate() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowModal(true);
        }
    };

    function validateForm() {
        const newErrors = {};
        if (!name) newErrors.name = "Le nom du produit est requis";
        if (!price) newErrors.price = "Le prix du produit est requis";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function onModalSubmit() {
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                username: 'admin@admin.com',
                password: 'admin'
            });

            const token = loginResponse.data.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const productResponse = await axios.post('http://localhost:8000/api/products', {
                name: name,
                price: parseFloat(price),  // Assurez-vous que le prix est un nombre
            }, config);

            handleClose();
            console.log(productResponse.data);

            navigate(`/products/edit/${productResponse.data.product.id}`);
        } catch (error) {
            setServerError('Error creating product: ' + (error.response?.data?.message || error.message));
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    function onChangeName(e) {
        setName(e.target.value);
        if (e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, name: null }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, name: "Le nom du produit est requis" }));
        }
    }

    function onChangePrice(e) {
        setPrice(e.target.value);
        if (e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, price: null }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, price: "Le prix du produit est requis" }));
        }
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer les informations du produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Nom du produit:</strong> {name}</p>
                    <p><strong>Prix du produit:</strong> {price}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={onModalSubmit} disabled={isSubmitting}>
                        Confirmer
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container>
                <Row>
                    <hr />
                    <h1 className='pt-3 pb-3'>Créer un nouveau produit</h1>
                    {serverError && <Alert variant="danger">{serverError}</Alert>}
                    <Form>
                        <Row>
                            <h4 className='pb-3'>Informations essentielles</h4>
                            <Form.Group as={Col} controlId="formName">
                                <Form.Label>Nom du produit</Form.Label>
                                <Form.Control
                                    onChange={onChangeName}
                                    placeholder="Huile moteur 20L"
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formPrice">
                                <Form.Label>Prix du produit (exprimé en €)</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={onChangePrice}
                                    placeholder="119"
                                    isInvalid={!!errors.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <h4 className='pt-5 pb-3'>Informations complémentaires (v2)</h4>

                        <Form.Group controlId="formName">
                            <Form.Label>Description du produit</Form.Label>
                            <Form.Control 
                                as="textarea"
                                placeholder="Description du produit"
                            />
                        </Form.Group>

                        <Button onClick={handleShow} className='mt-5' variant="success">
                            Créer produit
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}

export default ProductCreate;
