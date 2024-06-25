import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Spinner } from 'react-bootstrap'; // Importer Spinner
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useSelector } from 'react-redux';

function OrderList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement

    //const { user, token } = useAuth()
    const { token, isAuthenticated } = useSelector(state => state.auth);


    useEffect(() => {
        async function fetchOrders() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const orderResponse = await axios.get('http://localhost:8000/api/orders', config);
                console.log(orderResponse)

                setOrders(orderResponse.data);
            } catch (error) {
                setError('Error fetching orders: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false); // Arrêter le chargement après la récupération des données
            }
        }

        fetchOrders();
    }, []); // L'effet se déclenche une seule fois à l'initialisation du composant

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = orders.filter(order =>
        (order.orderNumber && order.orderNumber.toString().toLowerCase().includes(searchTerm.toLowerCase()))
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
                    <h1>Liste des commandes</h1>
                    <Form.Control
                        type="text"
                        placeholder="Rechercher une commande..."
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
                        filteredOrders.length > 0 ? (
                            <Table striped bordered hover className='mt-3'>
                                <thead>
                                    <tr>
                                        <th>Modifier</th>
                                        <th>ID</th>
                                        <th>Nom de la commande</th>
                                        <th>Numéro de commande</th>
                                        <th>Montant de la commande</th>
                                        <th>Date de création</th>
                                        <th>Date de mise à jour</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map(order => (
                                        <tr key={order.id}>
                                            <td><Link to={`../orders/edit/${order.id}`}><Button variant="warning">Modifier</Button></Link></td>
                                            <td>{order.id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.orderNumber}</td>
                                            <td>{order.totalAmount}€</td>
                                            <td>{formatDate(order.createdAt)}</td>
                                            <td>{order.updatedAt ? formatDate(order.createdAt) : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>Aucune commande trouvée.</p>
                        )
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default OrderList;
