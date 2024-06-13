import { useEffect, useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../../services/Auth";
import axios from "axios";

export default function Email() {
    const { id } = useParams();
    const { token } = useAuth('');

    const [customer, setCustomer] = useState(null);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        async function fetchCustomer() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const customerResponse = await axios.get('http://localhost:8000/api/customers/' + id, config);

                const customerData = customerResponse.data;
                setCustomer(customerData);
            } catch (error) {
                setError('Error fetching customer: ' + error.message);
                console.error('Error:', error);
            }
        }

        fetchCustomer();
    }, [id, token]);

    const handleSendEmail = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const emailData = {
                to: customer.email,
                subject: subject,
                message: message
            };

            await axios.post('http://localhost:8000/api/send-email', emailData, config);
            setSuccess('Email sent successfully!');
            setSubject('');
            setMessage('');
        } catch (error) {
            setError('Error sending email: ' + error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Container>
                <hr />
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                {customer ? (
                    <>
                        <h1>Envoyer un email à {customer.firstname} {customer.lastname}</h1>

                        <Form className='pt-3' onSubmit={handleSendEmail}>
                            <Form.Group className="mb-3" controlId="emailSubject">
                                <Form.Label>Objet du mail :</Form.Label>
                                <Form.Control 
                                    placeholder="Exemple : Devis AgriShop - Matériel tracteur"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="emailMessage">
                                <Form.Label>Message :</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Form.Group>

                            <Button className="mt-2" variant="primary" type="submit">
                                Envoyer le mail
                            </Button>
                        </Form>

                        <hr />
                        <h2>Prévisualisation :</h2>
                        <div className="preview">
                            <h3>{subject}</h3>
                            <p>{message}</p>
                        </div>
                    </>
                ) : (
                    <p>Loading customer data...</p>
                )}
            </Container>
        </div>
    )
}
