import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ProductCreate() {
    return (
        <div>
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

                <Button className='mt-5' variant="primary" type="submit">
                    Ajouter le produit
                </Button>
            </Form>
        </div>
  );
}

export default ProductCreate;