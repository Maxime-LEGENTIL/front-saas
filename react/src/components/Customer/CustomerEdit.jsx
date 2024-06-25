import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Spinner, Form, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import { useAuth } from '../../services/Auth';
import { useSelector } from 'react-redux';

function CustomerEdit() {
    const { id } = useParams();

    const [customer, setCustomer] = useState({});
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    //const { user, token } = useAuth()
    const { token, isAuthenticated } = useSelector(state => state.auth);


    useEffect(() => {
        async function fetchCustomer() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const customerResponse = await axios.get('http://localhost:8000/api/customers/' + id, config);

                const customerData = customerResponse.data;
                setCustomer(customerData);
                setFirstname(customerData.firstname);
                setLastname(customerData.lastname);
                setEmail(customerData.email);
                setPhonenumber(customerData.phonenumber);
                setAddress(customerData.address);
            } catch (error) {
                setError('Error fetching customer: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCustomer();
    }, [id]);

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

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function onChangeFirstname(e) {
        setFirstname(e.target.value);
        if (e.target.value) {
            setFormError(prevErrors => ({ ...prevErrors, firstname: null }));
        } else {
            setFormError(prevErrors => ({ ...prevErrors, firstname: "Le prénom est requis" }));
        }
    }

    function onChangeLastname(e) {
        setLastname(e.target.value);
        if (e.target.value) {
            setFormError(prevErrors => ({ ...prevErrors, lastname: null }));
        } else {
            setFormError(prevErrors => ({ ...prevErrors, lastname: "Le nom de famille est requis" }));
        }
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
        if (!e.target.value) {
            setFormError(prevErrors => ({ ...prevErrors, email: "L'email est requis" }));
        } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
            setFormError(prevErrors => ({ ...prevErrors, email: "L'email est invalide" }));
        } else {
            setFormError(prevErrors => ({ ...prevErrors, email: null }));
        }
    }

    function onChangePhonenumber(e) {
        setPhonenumber(e.target.value);
        if (!e.target.value) {
            setFormError(prevErrors => ({ ...prevErrors, phonenumber: "Le numéro de téléphone est requis" }));
        } else if (!/^\d{10}$/.test(e.target.value)) {
            setFormError(prevErrors => ({ ...prevErrors, phonenumber: "Le numéro de téléphone est invalide" }));
        } else {
            setFormError(prevErrors => ({ ...prevErrors, phonenumber: null }));
        }
    }

    function onChangeAddress(e) {
        setAddress(e.target.value);
        if (e.target.value) {
            setFormError(prevErrors => ({ ...prevErrors, address: null }));
        } else {
            setFormError(prevErrors => ({ ...prevErrors, address: "L'adresse est requise" }));
        }
    }

    async function onSubmitForm(e) {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                await axios.put('http://localhost:8000/api/customers/' + id, {
                    firstname,
                    lastname,
                    email,
                    phonenumber,
                    address
                }, config);

                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 10000); // Masquer le message après 10 secondes

            } catch (error) {
                setError('Error updating customer: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <hr />

                    {isLoading ? (
                        <div className="text-center pt-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p>Chargement des données en cours...</p>
                        </div>
                    ) : (
                        <div>
                            {showSuccessMessage && (
                                <Alert variant="success">
                                    Les modifications ont été enregistrées avec succès.
                                </Alert>
                            )}

                            <h1 className="pt-3">Modifier {firstname} {lastname}</h1>
                            <h4 className='pb-3'>Informations personnelles</h4>
                            <Form onSubmit={onSubmitForm}>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Prénom du client</Form.Label>
                                        <Form.Control value={firstname} onChange={onChangeFirstname} placeholder="Jacques" isInvalid={!!formError.firstname}/>
                                        <Form.Control.Feedback type="invalid">
                                            {formError.firstname}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Nom de famille du client</Form.Label>
                                        <Form.Control value={lastname} onChange={onChangeLastname} placeholder="Dupont" isInvalid={!!formError.lastname}/>
                                        <Form.Control.Feedback type="invalid">
                                            {formError.lastname}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="pt-3">
                                    <Form.Label>Adresse du client</Form.Label>
                                    <Form.Control value={address} onChange={onChangeAddress} placeholder="5 Impasse des mouettes 17290 Aigrefeuille d'Aunis" isInvalid={!!formError.address}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formError.address}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <h4 className='pt-5'>Informations de contact</h4>

                                <Form.Group className="pt-3">
                                    <Form.Label>Email du client</Form.Label>
                                    <Form.Control type="email" value={email} onChange={onChangeEmail} placeholder="jacques.dupont@gmail.com" isInvalid={!!formError.email}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formError.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="pt-3">
                                    <Form.Label>Numéro de téléphone du client</Form.Label>
                                    <Form.Control value={phonenumber} onChange={onChangePhonenumber} placeholder="0600000000" isInvalid={!!formError.phonenumber}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formError.phonenumber}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button className="mt-5" variant="primary" type="submit">
                                    Sauvegarder le client
                                </Button>

                                {/*<Button className="ms-3 mt-5" variant="warning" type="submit">
                                    Modifier le client
                                </Button>*/}
                            </Form>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default CustomerEdit;
