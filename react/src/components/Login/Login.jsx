import { Container, Row, Form, Button, Alert, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../services/Auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();  // Accéder à la fonction login via le contexte

    const navigate = useNavigate();

    function onChangeEmail(e) {
        setEmail(e.target.value);
    };

    function onChangePassword(e) {
        setPassword(e.target.value);
    };

    async function onSubmitLogin(e) {
        e.preventDefault();
        try {
            const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                username: email,
                password: password
            });

            const token = loginResponse.data.token;

            if (token) {
                // Appeler la fonction login avec les informations de l'utilisateur et le token
                login({ email }, token);
                console.log('on call login');
                console.log('Navigating to /');
                navigate('/');
                console.log('After navigate');
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
                        <h1 className='pt-3 pb-3 text-center'>Connexion</h1>

                        <h5 className='pt-2 text-center'>Vous n'avez pas de compte ?!</h5>
                        <p className='text-center'>Contactez l'administrateur de l'application</p>

                        {error ? (
                            <Alert key="danger" variant="danger">{error}</Alert>
                        ) : ''}

                        <Form onSubmit={onSubmitLogin}>
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

                            <Button className='mt-3 w-100' variant="primary" type="submit">
                                Connexion
                            </Button>
                        </Form>
                    </Col>

                    <Col>
                        <h1 className='pt-3 pb-3 text-center'>AgriShop</h1>

                        <img src="https://media.istockphoto.com/id/177498989/fr/photo/tracteur.jpg?s=612x612&w=0&k=20&c=ujfTPMc4VBGhz0KSElUN9LycQtvqkMpUvOwYGFYY640=" alt="" className='w-100' />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
