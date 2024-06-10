import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Spinner } from 'react-bootstrap'; // Utilisation directe des composants de React-Bootstrap
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../services/Auth';

function ProductList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useAuth()

    useEffect(() => {
        async function fetchProducts() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const productResponse = await axios.get('http://localhost:8000/api/products', config);

                setProducts(productResponse.data);
            } catch (error) {
                setError('Error fetching products: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.price && product.price.toString().includes(searchTerm))
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
                    <h1>Liste des produits</h1>
                    <Form.Control
                        type="text"
                        placeholder="Rechercher un produit..."
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
                                    <th>Nom du produit</th>
                                    <th>Prix du produit</th>
                                    <th>Date de création</th>
                                    <th>Date de mise à jour</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id}>
                                        <td><Link to={`../products/edit/${product.id}`}><Button variant="warning">Modifier</Button></Link></td>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}€</td>
                                        <td>{formatDate(product.createdAt)}</td>
                                        <td>{product.updatedAt ? formatDate(product.createdAt) : '-'}</td>
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

export default ProductList;
