import { Container, Row, Table } from 'react-bootstrap';

function ProductEdit() {
    return (
        <div>
            <Container>
                <Row>
                    <hr />
                    <h1 class='pt-3 pb-3'>Modifier un produit</h1>
        
                    <Table striped bordered hover>
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
}

export default ProductEdit;