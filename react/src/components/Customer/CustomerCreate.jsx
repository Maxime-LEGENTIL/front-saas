// React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Axios :
import axios from 'axios';

// Redux :
import { useSelector } from 'react-redux';

// URL Api :
import API_URL from '../../services/api';

// Bootstrap :
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

// CSS :
import './CustomerCreate.css';

// Méthode
function CustomerCreate() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [city, setCity] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
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
        if (!country) newErrors.country = "Le pays est requis";
        if (!postalcode) newErrors.postalcode = "Le code postal est requis";
        if (!city) newErrors.city = "La ville est requise";

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

            const customerResponse = await axios.post(API_URL + 'customers', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonenumber: phonenumber,
                address: address,
                zipcode: postalcode,
                city: city,
                country: country
            }, config);

            console.log(customerResponse)
            //handleClose();

            const customerId = customerResponse.data.customer.id;
            navigate(`/customers/edit/${customerId}`);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    function onChange(e, setState, errorKey, validationFunc) {
        setState(e.target.value);
        if (validationFunc) {
            const error = validationFunc(e.target.value);
            setErrors(prevErrors => ({ ...prevErrors, [errorKey]: error }));
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
                    <p><strong>Adresse:</strong> {address}, {postalcode} {city}, {country}</p>
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
                                    onChange={(e) => onChange(e, setFirstname, 'firstname', (value) => !value ? "Le prénom est requis" : null)}
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
                                    onChange={(e) => onChange(e, setLastname, 'lastname', (value) => !value ? "Le nom de famille est requis" : null)}
                                    placeholder="Dupont"
                                    isInvalid={!!errors.lastname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastname}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} className='pt-3' controlId="formAddress">
                                <Form.Label>Adresse du client</Form.Label>
                                <Form.Control
                                    onChange={(e) => onChange(e, setAddress, 'address', (value) => !value ? "L'adresse est requise" : null)}
                                    placeholder="5 Impasse des mouettes"
                                    isInvalid={!!errors.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} className='pt-3' controlId="formCountry">
                                <Form.Label>Pays du client</Form.Label>
                                <Form.Control
                                    onChange={(e) => onChange(e, setCountry, 'country', (value) => !value ? "Le pays est requis" : null)}
                                    placeholder="France"
                                    isInvalid={!!errors.country}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.country}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} className='pt-3' controlId="formPostalcode">
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control
                                    onChange={(e) => onChange(e, setPostalcode, 'postalcode', (value) => !value ? "Le code postal est requis" : null)}
                                    placeholder="75001"
                                    isInvalid={!!errors.postalcode}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.postalcode}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} className='pt-3' controlId="formCity">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control
                                    onChange={(e) => onChange(e, setCity, 'city', (value) => !value ? "La ville est requise" : null)}
                                    placeholder="Paris"
                                    isInvalid={!!errors.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <h4 className='pt-5'>Informations de contact</h4>

                        <Form.Group className='pt-3' controlId="formEmail">
                            <Form.Label>Email du client</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => onChange(e, setEmail, 'email', (value) => {
                                    if (!value) return "L'email est requis";
                                    if (!/\S+@\S+\.\S+/.test(value)) return "L'email est invalide";
                                    return null;
                                })}
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
                                onChange={(e) => onChange(e, setPhonenumber, 'phonenumber', (value) => {
                                    if (!value) return "Le numéro de téléphone est requis";
                                    if (!/^\d{10}$/.test(value)) return "Le numéro de téléphone est invalide";
                                    return null;
                                })}
                                placeholder="0600000000"
                                isInvalid={!!errors.phonenumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phonenumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button onClick={handleShow} className='mt-5 btn-create-customer' variant="success" style={{ backgroundColor: '#FF4F01', border: 'none', color: 'white' }}>
                            Créer le client
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}

export default CustomerCreate;
