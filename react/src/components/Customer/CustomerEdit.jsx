import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerEdit() {

    const { id } = useParams(); // Ne récupère pas un objet mais l'id directement
;
    const [customer, setCustomer] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement

    useEffect(() => {
        async function fetchCustomer() {
            try {
                const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                    username: 'admin@admin.com',
                    password: 'admin'
                });

                const token = loginResponse.data.token;
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const customerResponse = await axios.get('http://localhost:8000/api/customers/' + id, config);

                setCustomer(customerResponse.data);
            } catch (error) {
                setError('Error fetching customer: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false); // Arrêter le chargement après la récupération des données
            }
        }

        fetchCustomer();
    }, []); // L'effet se déclenche une seule fois à l'initialisation du composant

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
                            <h1 class='pt-3 pb-3'>Modifier {customer.firstname} {customer.lastname}</h1>
                            <Form>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Prénom du client</Form.Label>
                                        <Form.Control value={customer.firstname} placeholder="Jacques" />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Nom de famille du client</Form.Label>
                                        <Form.Control value={customer.lastname} placeholder="Dupont" />
                                    </Form.Group>
                                </Row>

                                <Form.Group className='pt-3'>
                                    <Form.Label>Email du client</Form.Label>
                                    <Form.Control value={customer.email} placeholder="jacques.dupont@gmail.com" />
                                </Form.Group>

                                <Form.Group className='pt-3'>
                                    <Form.Label>Numéro de téléphone du client</Form.Label>
                                    <Form.Control value={customer.phonenumber} placeholder="0600000000" />
                                </Form.Group>

                                <Form.Group className='pt-3'>
                                    <Form.Label>Adresse du client</Form.Label>
                                    <Form.Control value={customer.address} placeholder="5 Impasse des mouettes 17290 Aigrefeuille d'Aunis" />
                                </Form.Group>

                                <Button className='mt-5' variant="primary" type="submit">
                                    Sauvegarder le client
                                </Button>
                            </Form>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
  );
}

export default CustomerEdit;