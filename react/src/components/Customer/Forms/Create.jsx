import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

export default function Create() {
    return (
        <Form>
            <Row>
                <h4 className='pb-3'>Informations personnelles</h4>
                <Form.Group as={Col} controlId="formFirstname">
                    <Form.Label>Prénom du client</Form.Label>
                    <Form.Control
                        onChange={onChangeFirstname}
                        placeholder="Jacques"
                        isInvalid={!!errors.firstname}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstname}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formLastname">
                    <Form.Label>Nom de famille du client</Form.Label>
                    <Form.Control
                        onChange={onChangeLastname}
                        placeholder="Dupont"
                        isInvalid={!!errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastname}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className='pt-3' controlId="formAddress">
                <Form.Label>Adresse du client</Form.Label>
                <Form.Control
                    onChange={onChangeAddress}
                    placeholder="5 Impasse des mouettes 17290 Aigrefeuille d'Aunis"
                    isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.address}
                </Form.Control.Feedback>
            </Form.Group>

            <h4 className='pt-5'>Informations de contact</h4>

            <Form.Group className='pt-3' controlId="formEmail">
                <Form.Label>Email du client</Form.Label>
                <Form.Control
                    type="email"
                    onChange={onChangeEmail}
                    placeholder="jacques.dupont@gmail.com"
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='pt-3' controlId="formPhonenumber">
                <Form.Label>Numéro de téléphone du client</Form.Label>
                <Form.Control
                    type="text"
                    onChange={onChangePhonenumber}
                    placeholder="0600000000"
                    isInvalid={!!errors.phonenumber}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phonenumber}
                </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={handleShow} className='mt-5' variant="primary">
                Créer client
            </Button>
        </Form>
    )
}