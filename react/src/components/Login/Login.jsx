import { Container, Row, Form, Button, Alert, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../services/Auth';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './Login.css'; // Import the CSS file

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();  // Access the login function via context

    const navigate = useNavigate();

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    async function onSubmitLogin(e) {
        e.preventDefault();
        try {
            const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                username: email,
                password: password
            });

            const token = loginResponse.data.token;

            if (token) {
                // Call the login function with user information and token
                login({ email }, token);
                navigate('/');
            }
        } catch (error) {
            setError("L'adresse email ou le mot de passe est incorrect.");
            console.error(error);
        }
    }

    return (
        <div>
            <Container className='p-5 d-flex justify-content-center'>
                <Row>
                    <Col className='text-center'>
                        <h1 className='pb-3'>Connexion 🚀</h1>

                        {error && <Alert key="danger" variant="danger">{error}</Alert>}

                        <Form onSubmit={onSubmitLogin} className='w-100'>
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

                            <div className="separator">
                                <span>OU</span>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <GoogleOAuthProvider clientId="550092839328-ke9plfaaasoljdavoqa9ond0bu888f98.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log(credentialResponse);
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                    />
                                </GoogleOAuthProvider>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
