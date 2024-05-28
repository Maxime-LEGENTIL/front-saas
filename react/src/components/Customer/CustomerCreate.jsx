import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CustomerCreate() {
    return (
        <div>
            <Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Prénom du client</Form.Label>
                        <Form.Control placeholder="Jacques" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Nom de famille du client</Form.Label>
                        <Form.Control placeholder="Dupont" />
                    </Form.Group>
                </Row>

                <Form.Group className='pt-3'>
                    <Form.Label>Email du client</Form.Label>
                    <Form.Control placeholder="jacques.dupont@gmail.com" />
                </Form.Group>

                <Form.Group className='pt-3'>
                    <Form.Label>Numéro de téléphone du client</Form.Label>
                    <Form.Control placeholder="0600000000" />
                </Form.Group>

                <Form.Group className='pt-3'>
                    <Form.Label>Adresse du client</Form.Label>
                    <Form.Control placeholder="5 Impasse des mouettes 17290 Aigrefeuille d'Aunis" />
                </Form.Group>

                <Button className='mt-5' variant="primary" type="submit">
                    Ajouter le client
                </Button>
            </Form>
        </div>
  );
}

export default CustomerCreate;