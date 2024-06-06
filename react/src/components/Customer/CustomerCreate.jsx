import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../../services/Auth';

function CustomerCreate() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowModal(true);
        }
    };

    const { user, token } = useAuth()


    function validateForm() {
        const newErrors = {};
        if (!firstname) newErrors.firstname = "Le prénom est requis";
        if (!lastname) newErrors.lastname = "Le nom de famille est requis";
        if (!email) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "L'email est invalide";
        }
        if (!phonenumber) {
            newErrors.phonenumber = "Le numéro de téléphone est requis";
        } else if (!/^\d{10}$/.test(phonenumber)) {
            newErrors.phonenumber = "Le numéro de téléphone est invalide";
        }
        if (!address) newErrors.address = "L'adresse est requise";

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

            const customerResponse = await axios.post('http://localhost:8000/api/customers', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonenumber: phonenumber,
                address: address
            }, config);

            handleClose();

            //console.log(customerResponse.data);
            const customerId = customerResponse.data.customer.id;
            navigate(`/customers/edit/${customerId}`);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    function onChangeFirstname(e) {
        setFirstname(e.target.value);
        if (e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, firstname: null }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, firstname: "Le prénom est requis" }));
        }
    }

    function onChangeLastname(e) {
        setLastname(e.target.value);
        if (e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, lastname: null }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, lastname: "Le nom de famille est requis" }));
        }
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
        if (!e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, email: "L'email est requis" }));
        } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
            setErrors(prevErrors => ({ ...prevErrors, email: "L'email est invalide" }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, email: null }));
        }
    }

    function onChangePhonenumber(e) {
        setPhonenumber(e.target.value);
        if (!e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, phonenumber: "Le numéro de téléphone est requis" }));
        } else if (!/^\d{10}$/.test(e.target.value)) {
            setErrors(prevErrors => ({ ...prevErrors, phonenumber: "Le numéro de téléphone est invalide" }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, phonenumber: null }));
        }
    }

    function onChangeAddress(e) {
        setAddress(e.target.value);
        if (e.target.value) {
            setErrors(prevErrors => ({ ...prevErrors, address: null }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, address: "L'adresse est requise" }));
        }
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer les informations du client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Prénom:</strong> {firstname}</p>
                    <p><strong>Nom de famille:</strong> {lastname}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Numéro de téléphone:</strong> {phonenumber}</p>
                    <p><strong>Adresse:</strong> {address}</p>
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
                    <h1 className='pt-3 pb-3'>Créer un nouveau client</h1>
                    <Form>
                        <Row>
                            <h4 className='pb-3'>Informations personnelles</h4>
                            <Form.Group as={Col} controlId="formFirstname">
                                <Form.Label>Prénom du client</Form.Label>
                                <Form.Control
                                    onChange={onChangeFirstname}
                                    placeholder="Jacques"
                                    isInvalid={!!errors.firstname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstname}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLastname">
                                <Form.Label>Nom de famille du client</Form.Label>
                                <Form.Control
                                    onChange={onChangeLastname}
                                    placeholder="Dupont"
                                    isInvalid={!!errors.lastname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastname}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className='pt-3' controlId="formAddress">
                            <Form.Label>Adresse du client</Form.Label>
                            <Form.Control
                                onChange={onChangeAddress}
                                placeholder="5 Impasse des mouettes 17290 Aigrefeuille d'Aunis"
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <h4 className='pt-5'>Informations de contact</h4>

                        <Form.Group className='pt-3' controlId="formEmail">
                            <Form.Label>Email du client</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={onChangeEmail}
                                placeholder="jacques.dupont@gmail.com"
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='pt-3' controlId="formPhonenumber">
                            <Form.Label>Numéro de téléphone du client</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={onChangePhonenumber}
                                placeholder="0600000000"
                                isInvalid={!!errors.phonenumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phonenumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button onClick={handleShow} className='mt-5' variant="success">
                            Créer client
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}

export default CustomerCreate;
