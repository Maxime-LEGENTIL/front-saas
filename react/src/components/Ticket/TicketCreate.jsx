import { Container, Row, Col, Form, Button, Modal, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { useAuth } from '../../services/Auth';
import { useSelector } from 'react-redux';


function TicketCreate() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();

    //const { token } = useAuth()
    const { token, isAuthenticated } = useSelector(state => state.auth);


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
                    <h1 className='pt-3 pb-3'>Créer un nouveau ticket</h1>
                    {serverError && <Alert variant="danger">{serverError}</Alert>}
                    <Form>
                        <h4 className='pb-3'>Objet de la demande</h4>

                        <Form.Group controlId="formName">
                            <Form.Label>Objet de la demande</Form.Label>
                            <Form.Control 
                                placeholder="Objet de la demande"
                            />
                        </Form.Group>

                        <Form.Group className='pt-3' controlId="formName">
                            <Form.Label>Votre message</Form.Label>
                            <Form.Control 
                                as="textarea"
                                placeholder="Description de votre demande"
                            />
                        </Form.Group>

                        <Button onClick={handleShow} className='mt-5' variant="success">
                            Créer le ticket
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}

export default TicketCreate;
