import { Container, Row, Form, Button, Alert, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './Login.css'; // Import the CSS file
//import { login, logout } from '../../authActions';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/slices/authSlice'; // Importez setToken depuis authSlice

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    
    const { isAuthenticated } = useSelector(state => state.auth);

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
                // Stocker le token dans Redux
                dispatch(setToken(token));
                // Rediriger après authentification réussie
                navigate('/');
                //navigate('/ddd'); // Redirection après connexion
            }
        } catch (error) {
            setError("L'adresse email ou le mot de passe est incorrect.");
            console.error(error);
        }
    }

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    async function callbackGoogleAuth(credentialResponse) {
        const googleToken = credentialResponse.credential;
        if (googleToken) {
            try {
                const loginResponse = await axios.post('http://localhost:8000/connect/google/check', {
                    token: googleToken
                });
                const tokenJWTSymfony = loginResponse.data.token;

                const payload = parseJwt(googleToken);
                const email = payload.email;

                //dispatch(login(tokenJWTSymfony));
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    }

    //if (isAuthenticated) {
      //  navigate('/'); // Si l'utilisateur est déjà authentifié, redirection vers la page d'accueil
    //}

    return (
        <div>
            <Container className='p-5 d-flex justify-content-center'>
                <Row>
                    <Col className='text-center'>
                        <h1 className='pb-3'>Connexion 🚀</h1>
                        <p className='bg-white p-4'>Si vous n'avez pas de compte, vous pouvez vous inscrire ici.</p>
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
                            <Button className='mt-3 w-100 px-4 py-2 rounded-pill' variant="primary" type="submit" style={{ backgroundColor: '#FF4F01', border: 'none', color: 'white' }}>
                                Connexion
                            </Button>
                            <div className="separator">
                                <span>OU</span>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <GoogleOAuthProvider clientId="550092839328-ke9plfaaasoljdavoqa9ond0bu888f98.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            callbackGoogleAuth(credentialResponse);
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
