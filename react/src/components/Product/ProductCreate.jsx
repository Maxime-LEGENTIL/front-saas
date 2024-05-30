import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function ProductCreate() {
    return (
        <div>
            <Container>
                <Row>
                    <hr />

                    <h1 class='pt-3 pb-3'>Créer un nouveau produit</h1>
                    <Form>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nom du produit</Form.Label>
                                <Form.Control placeholder="Pot de peinture blanc 20L" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Prix du produit (€)</Form.Label>
                                <Form.Control placeholder="50" />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formFile" className="mt-3">
                            <Form.Label>Image du produit</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                        <Button className='mt-5' variant="primary" type="submit">
                            Ajouter le produit
                        </Button>
                    </Form>
                </Row>
            </Container> 
        </div>
  );
}

export default ProductCreate;