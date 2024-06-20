import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Spinner } from 'react-bootstrap'; // Importer Spinner
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../services/Auth';

function CustomerList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement

    const { user, token } = useAuth()

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const customerResponse = await axios.get('http://localhost:8000/api/customers', config);

                setCustomers(customerResponse.data);
            } catch (error) {
                setError('Error fetching customers: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false); // Arrêter le chargement après la récupération des données
            }
        }

        fetchCustomers();
    }, []); // L'effet se déclenche une seule fois à l'initialisation du composant

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        (customer.firstname && customer.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.lastname && customer.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.phonenumber && customer.phonenumber.includes(searchTerm)) ||
        (customer.address && customer.address.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div>
            <Container>
                <Row>
                    <hr />
                    <h1>Liste des clients</h1>
                    <Form.Control
                        type="text"
                        placeholder="Rechercher un client..."
                        className="mt-3 mb-3"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {error && <p className="text-danger">{error}</p>}
                    {isLoading ? (
                        <div className="text-center pt-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p>Chargement des données en cours...</p>
                        </div>
                    ) : (
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th>Modifier</th>
                                    <th>ID</th>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Téléphone</th>
                                    <th>Adresse</th>
                                    <th>Date de création</th>
                                    <th>Date de mise à jour</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map(customer => (
                                    <tr key={customer.id}>
                                        <td><Link to={`../customers/edit/${customer.id}`}><Button variant="warning" style={{backgroundColor: '#FF4F01', border: 'none', color: 'white'}}>Modifier</Button></Link></td>
                                        <td>{customer.id}</td>
                                        <td>{customer.firstname}</td>
                                        <td>{customer.lastname}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phonenumber}</td>
                                        <td>{customer.address}</td>
                                        <td>{formatDate(customer.createdAt)}</td>
                                        <td>{customer.updatedAt ? formatDate(customer.createdAt) : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default CustomerList;
