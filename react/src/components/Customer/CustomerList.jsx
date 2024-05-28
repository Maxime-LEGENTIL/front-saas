import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CustomerList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers] = useState([
        { id: 1, firstName: 'Mark', lastName: 'Otto', email: 'admin@agrishop.fr', phone: '0601965352', address: '18 impasse de Luxembourg 75001 PARIS' },
        { id: 2, firstName: 'Jacob', lastName: 'Thornton', email: 'jacob@agrishop.fr', phone: '0601965353', address: '19 impasse de Luxembourg 75002 PARIS' },
        { id: 3, firstName: 'Larry', lastName: 'Bird', email: 'larry@agrishop.fr', phone: '0601965354', address: '20 impasse de Luxembourg 75003 PARIS' },
        { id: 4, firstName: 'John', lastName: 'Doe', email: 'john@agrishop.fr', phone: '0601965355', address: '21 impasse de Luxembourg 75004 PARIS' },
        { id: 5, firstName: 'Jane', lastName: 'Smith', email: 'jane@agrishop.fr', phone: '0601965356', address: '22 impasse de Luxembourg 75005 PARIS' },
        { id: 6, firstName: 'Paul', lastName: 'Jones', email: 'paul@agrishop.fr', phone: '0601965357', address: '23 impasse de Luxembourg 75006 PARIS' },
        { id: 7, firstName: 'Emma', lastName: 'Brown', email: 'emma@agrishop.fr', phone: '0601965358', address: '24 impasse de Luxembourg 75007 PARIS' },
        { id: 8, firstName: 'Oliver', lastName: 'Wilson', email: 'oliver@agrishop.fr', phone: '0601965359', address: '25 impasse de Luxembourg 75008 PARIS' },
        { id: 9, firstName: 'Sophia', lastName: 'Martinez', email: 'sophia@agrishop.fr', phone: '0601965360', address: '26 impasse de Luxembourg 75009 PARIS' },
        { id: 10, firstName: 'Liam', lastName: 'Davis', email: 'liam@agrishop.fr', phone: '0601965361', address: '27 impasse de Luxembourg 75010 PARIS' },
        { id: 11, firstName: 'Mia', lastName: 'Garcia', email: 'mia@agrishop.fr', phone: '0601965362', address: '28 impasse de Luxembourg 75011 PARIS' },
        { id: 12, firstName: 'Noah', lastName: 'Rodriguez', email: 'noah@agrishop.fr', phone: '0601965363', address: '29 impasse de Luxembourg 75012 PARIS' },
        { id: 13, firstName: 'Ava', lastName: 'Martinez', email: 'ava@agrishop.fr', phone: '0601965364', address: '30 impasse de Luxembourg 75013 PARIS' },
        { id: 14, firstName: 'Elijah', lastName: 'Hernandez', email: 'elijah@agrishop.fr', phone: '0601965365', address: '31 impasse de Luxembourg 75014 PARIS' },
        { id: 15, firstName: 'Isabella', lastName: 'Lopez', email: 'isabella@agrishop.fr', phone: '0601965366', address: '32 impasse de Luxembourg 75015 PARIS' },
        { id: 16, firstName: 'Lucas', lastName: 'Gonzalez', email: 'lucas@agrishop.fr', phone: '0601965367', address: '33 impasse de Luxembourg 75016 PARIS' },
        { id: 17, firstName: 'Amelia', lastName: 'Wilson', email: 'amelia@agrishop.fr', phone: '0601965368', address: '34 impasse de Luxembourg 75017 PARIS' },
        { id: 18, firstName: 'Mason', lastName: 'Anderson', email: 'mason@agrishop.fr', phone: '0601965369', address: '35 impasse de Luxembourg 75018 PARIS' },
        { id: 19, firstName: 'Harper', lastName: 'Thomas', email: 'harper@agrishop.fr', phone: '0601965370', address: '36 impasse de Luxembourg 75019 PARIS' },
        { id: 20, firstName: 'Ethan', lastName: 'Taylor', email: 'ethan@agrishop.fr', phone: '0601965371', address: '37 impasse de Luxembourg 75020 PARIS' },
        { id: 21, firstName: 'Charlotte', lastName: 'Moore', email: 'charlotte@agrishop.fr', phone: '0601965372', address: '38 impasse de Luxembourg 75021 PARIS' },
        { id: 22, firstName: 'Logan', lastName: 'Jackson', email: 'logan@agrishop.fr', phone: '0601965373', address: '39 impasse de Luxembourg 75022 PARIS' },
        { id: 23, firstName: 'Aria', lastName: 'Martin', email: 'aria@agrishop.fr', phone: '0601965374', address: '40 impasse de Luxembourg 75023 PARIS' },
        { id: 24, firstName: 'James', lastName: 'Lee', email: 'james@agrishop.fr', phone: '0601965375', address: '41 impasse de Luxembourg 75024 PARIS' },
        { id: 25, firstName: 'Ella', lastName: 'Perez', email: 'ella@agrishop.fr', phone: '0601965376', address: '42 impasse de Luxembourg 75025 PARIS' },
        { id: 26, firstName: 'Alexander', lastName: 'Thompson', email: 'alexander@agrishop.fr', phone: '0601965377', address: '43 impasse de Luxembourg 75026 PARIS' },
        { id: 27, firstName: 'Sofia', lastName: 'White', email: 'sofia@agrishop.fr', phone: '0601965378', address: '44 impasse de Luxembourg 75027 PARIS' },
        { id: 28, firstName: 'Henry', lastName: 'Harris', email: 'henry@agrishop.fr', phone: '0601965379', address: '45 impasse de Luxembourg 75028 PARIS' },
        { id: 29, firstName: 'Abigail', lastName: 'Sanchez', email: 'abigail@agrishop.fr', phone: '0601965380', address: '46 impasse de Luxembourg 75029 PARIS' },
        { id: 30, firstName: 'Sebastian', lastName: 'Clark', email: 'sebastian@agrishop.fr', phone: '0601965381', address: '47 impasse de Luxembourg 75030 PARIS' }
        // Ajoutez d'autres clients ici
    ]);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Liste des clients</h1>
            <Form.Control
                type="text"
                placeholder="Rechercher un client..."
                className="mt-3 mb-3"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prénom</th>
                        <th>Nom de famille</th>
                        <th>Email</th>
                        <th>Numéro de téléphone</th>
                        <th>Adresse</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td><Button variant="warning">Modifier</Button></td>
                            <td><Button variant="danger">Supprimer</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CustomerList;
