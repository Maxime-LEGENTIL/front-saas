import { Container, Row, Form, Button, Alert, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../services/Auth';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [society, setSociety] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    //const { login } = useAuth();  // Access the login function via context

    const navigate = useNavigate();

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangeSociety(e) {
        setSociety(e.target.value);
    }

    function onChangeFirstName(e) {
        setFirstname(e.target.value);
    }

    function onChangeLastName(e) {
        setLastname(e.target.value);
    }

    function onChangePhoneNumber(e) {
        setPhoneNumber(e.target.value);
    }

    async function onSubmitRegister(e) {
        e.preventDefault();
        try {
            const registerResponse = await axios.post('http://localhost:8000/users/create', {
                email: email,
                password: password,
                society: society,
                firstname: firstname,
                lastname: lastname,
                phoneNumber: phoneNumber
            });

            if(registerResponse.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            setError("L'adresse email ou le mot de passe est incorrect.");
            console.error(error);
        }
    }

    return (
        <div>
            <Container className='bg-white p-5'>
                <Row>
                    <Col>
                        <h1 className='pt-3 pb-3 text-center'>Création de compte pour démarrer avec Hiboo CRM 🚀</h1>

                        <p className='text-center'>Inscription sans engagement pour une période d’essai gratuite de 14 jours. Aucune information bancaire requise.</p>

                        {error && <Alert key="danger" variant="danger">{error}</Alert>}

                        <Form onSubmit={onSubmitRegister}>
                            <Form.Group className='mt-5'>
                                <Form.Label>Adresse email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="john.doe@gmail.com"
                                    onChange={onChangeEmail}
                                    value={email}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="**********"
                                    onChange={onChangePassword}
                                    value={password}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Société</Form.Label>
                                <Form.Control
                                    placeholder="Votre société"
                                    onChange={onChangeSociety}
                                    value={society}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control
                                    placeholder="Votre prénom"
                                    onChange={onChangeFirstName}
                                    value={firstname}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    placeholder="Votre nom"
                                    onChange={onChangeLastName}
                                    value={lastname}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Numéro de téléphone</Form.Label>
                                <Form.Control
                                    placeholder="Votre téléphone"
                                    onChange={onChangePhoneNumber}
                                    value={phoneNumber}
                                    required
                                />
                            </Form.Group>

                            <Button className='mt-5 px-4 py-2 rounded-pill' variant="primary" type="submit" style={{backgroundColor: '#FF4F01', border: 'none'}}>
                                Créer mon compte
                            </Button>

                            
                        </Form>
                    </Col>

                    {/*<Col>
                        <h1 className='pt-3 pb-3 text-center'>AgriShop</h1>

                        <img src="https://media.istockphoto.com/id/177498989/fr/photo/tracteur.jpg?s=612x612&w=0&k=20&c=ujfTPMc4VBGhz0KSElUN9LycQtvqkMpUvOwYGFYY640=" alt="" className='w-100' />
                    </Col>*/}
                </Row>
            </Container>
        </div>
    );
}
