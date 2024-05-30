import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers] = useState([
        { id: 1, name: 'Rolex Gama M24', price: '599' },
        { id: 2, name: 'Omega Seamaster', price: '450' },
        { id: 3, name: 'Tag Heuer Carrera', price: '799' },
        { id: 4, name: 'Breitling Navitimer', price: '1050' },
        { id: 5, name: 'Cartier Tank', price: '950' },
        { id: 6, name: 'Audemars Piguet Royal Oak', price: '1250' },
        { id: 7, name: 'Patek Philippe Nautilus', price: '1350' },
        { id: 8, name: 'Hublot Big Bang', price: '1150' },
        { id: 9, name: 'IWC Portugieser', price: '1100' },
        { id: 10, name: 'Panerai Luminor', price: '900' },
        { id: 11, name: 'Longines Master Collection', price: '750' },
        { id: 12, name: 'Tissot Le Locle', price: '650' },
        { id: 13, name: 'Seiko Prospex', price: '550' },
        { id: 14, name: 'Citizen Eco-Drive', price: '350' },
        { id: 15, name: 'Hamilton Khaki Field', price: '500' },
        { id: 16, name: 'Bulova Precisionist', price: '450' },
        { id: 17, name: 'Casio G-Shock', price: '200' },
        { id: 18, name: 'Fossil Grant', price: '175' },
        { id: 19, name: 'Swatch Irony', price: '150' },
        { id: 20, name: 'Michael Kors Lexington', price: '275' }
        // Ajoutez d'autres clients ici
    ]);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.price.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <Table striped bordered hover className='mt-3'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom du produit</th>
                                <th>Prix</th>
                                <th>Modifier</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.price}</td>
                                    <td><Link to="../products/edit/id"><Button variant="warning">Modifier</Button></Link></td>
                                    <td><Button variant="danger">Supprimer</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
}

export default ProductList;
