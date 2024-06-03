import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Spinner, Form, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductEdit() {
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                    username: 'admin@admin.com',
                    password: 'admin'
                });

                const token = loginResponse.data.token;
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const productResponse = await axios.get('http://localhost:8000/api/products/' + id, config);

                const productData = productResponse.data;
                setProduct(productData);
                setName(productData.name);
                setPrice(productData.price.toString()); // Assurez-vous que le prix est une chaîne de caractères
            } catch (error) {
                setError('Error fetching product: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    function validateForm() {
        const newErrors = {};
        if (!name) newErrors.name = "Le nom du produit est requis";
        if (!price) newErrors.price = "Le prix du produit est requis";

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function onChangeName(e) {
        setName(e.target.value);
        if (e.target.value) {
            setFormError(prevErrors => ({ ...prevErrors, name: null }));
        } else {
            setFormError(prevErrors => ({ ...prevErrors, name: "Le nom du produit est requis" }));
        }
    }

    function onChangePrice(e) {
        setPrice(e.target.value);
        if (e.target.value) {
            setFormError(prevErrors => ({ ...prevErrors, price: null }));
        } else {
            setFormError(prevErrors => ({ ...prevErrors, price: "Le prix du produit est requis" }));
        }
    }

    async function onSubmitForm(e) {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                    username: 'admin@admin.com',
                    password: 'admin'
                });

                const token = loginResponse.data.token;
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                console.log('price:', price); // Log pour déboguer

                await axios.put('http://localhost:8000/api/products/' + id, {
                    name,
                    price: parseFloat(price) // Assurez-vous que le prix est un nombre avant de l'envoyer
                }, config);

                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 10000); // Masquer le message après 10 secondes
            } catch (error) {
                setError('Error updating product: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <hr />

                    {isLoading ? (
                        <div className="text-center pt-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p>Chargement des données en cours...</p>
                        </div>
                    ) : (
                        <div>
                            {showSuccessMessage && (
                                <Alert variant="success">
                                    Les modifications ont été enregistrées avec succès.
                                </Alert>
                            )}

                            <h1 className="pt-3">Modifier produit n°{id}</h1>
                            <h4 className='pb-3'>Informations essentielles</h4>
                            <Form onSubmit={onSubmitForm}>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Nom du produit</Form.Label>
                                        <Form.Control value={name} onChange={onChangeName} placeholder="Nom du produit" isInvalid={!!formError.name}/>
                                        <Form.Control.Feedback type="invalid">
                                            {formError.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Prix du produit</Form.Label>
                                        <Form.Control value={price} onChange={onChangePrice} placeholder="Prix du produit" isInvalid={!!formError.price}/>
                                        <Form.Control.Feedback type="invalid">
                                            {formError.price}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <h4 className='pt-5 pb-3'>Informations complémentaires (v2)</h4>

                                <Form.Group controlId="formName">
                                    <Form.Label>Description du produit</Form.Label>
                                    <Form.Control 
                                        as="textarea"
                                        placeholder="Description du produit"
                                    />
                                </Form.Group>

                                <Button className="mt-5" variant="primary" type="submit">
                                    Sauvegarder le produit
                                </Button>
                            </Form>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default ProductEdit;
