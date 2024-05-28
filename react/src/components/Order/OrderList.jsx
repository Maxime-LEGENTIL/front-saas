import Table from 'react-bootstrap/Table';

function OrderList() {
    return (
        <div>
            <h1>Liste des commandes</h1>
            <Table striped bordered hover className='mt-5'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Prénom</th>
                    <th>Nom de famille</th>
                    <th>Email</th>
                    <th>Numéro de téléphone</th>
                    <th>Addresse</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>admin@agrishop.fr</td>
                    <td>0601965352</td>
                    <td>18 impasse de Luxembourg 75001 PARIS</td>
                </tr>
            </tbody>
            </Table>
        </div>
    );
}

export default OrderList;