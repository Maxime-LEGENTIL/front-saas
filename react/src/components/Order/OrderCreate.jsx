import { useEffect, useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { useAuth } from '../../services/Auth';
import { useSelector } from 'react-redux';

function OrderCreate() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [orderName, setOrderName] = useState('');

    //const { user, token } = useAuth()
    const { token, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        async function fetchProductsAndCustomers() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const [productsResponse, customersResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/products/', config),
                    axios.get('http://localhost:8000/api/customers/', config)
                ]);

                setProducts(productsResponse.data);
                setCustomers(customersResponse.data);
            } catch (error) {
                setError('Error fetching products and customers: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProductsAndCustomers();
    }, []);

    const addProductToOrder = () => {
        setOrderProducts([...orderProducts, { productId: '', quantity: 1 }]);
    };

    const handleProductChange = (index, field, value) => {
        const newOrderProducts = [...orderProducts];
        newOrderProducts[index][field] = value;
        setOrderProducts(newOrderProducts);
    };

    const handleRemoveProduct = (index) => {
        const newOrderProducts = orderProducts.filter((_, i) => i !== index);
        setOrderProducts(newOrderProducts);
    };

    const calculateTotalAmount = () => {
        return orderProducts.reduce((acc, product) => {
            const productInfo = products.find(p => p.id === product.productId);
            return acc + (productInfo ? productInfo.price * product.quantity : 0);
        }, 0).toFixed(2);
    };

    const getProductOption = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? { value: product.id, label: `${product.name} - ${product.price}€` } : null;
    };

    async function onSubmitForm(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
    
            // Construisez le payload de la commande
            /*const orderPayload = {
                orderNumber: Math.floor(Math.random() * 1000000000), // Générer dynamiquement
                totalAmount: parseInt(calculateTotalAmount()),
                products: orderProducts.map(product => ({ id: product.productId })),
                customer: { id: selectedCustomer ? selectedCustomer.value : '' }
            };*/
            // Ajoutez la clé "quantity" pour chaque produit sélectionné dans le payload de la commande
            const orderPayload = {
                name: orderName,
                orderNumber: Math.floor(Math.random() * 1000000000),
                totalAmount: parseInt(calculateTotalAmount()),
                products: orderProducts.map(product => ({
                    id: product.productId,
                    quantity: product.quantity // Ajoutez la quantité
                })),
                customer: { id: selectedCustomer ? selectedCustomer.value : '' }
            };


            console.log(token)
            console.log(orderPayload)
    
            // Effectuez la requête POST pour créer la commande
            await axios.post('http://localhost:8000/api/orders', orderPayload, config);
    
            // Affichez le message de succès et réinitialisez le formulaire
            setShowSuccessMessage(true);
            setOrderProducts([]);
            setSelectedCustomer(null);
            setTimeout(() => setShowSuccessMessage(false), 10000); // Hide the message after 10 seconds
        } catch (error) {
            setError('Error creating order: ' + error.message);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'white'
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'black',
            backgroundColor: state.isSelected ? '#e9ecef' : 'white'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black'
        })
    };

    const onChangeName = (e) => {
        setOrderName(e.target.value)
    }

    return (
        <div>
            <Container>
                <Row>
                    <hr />
                    <h1 className='pt-3 pb-3'>Créer une commande</h1>

                    <h6 className=''>Vous allez devoir associer un client à cette commande ainsi qu'un ou plusieurs produit(s).</h6>

                    <Form onSubmit={onSubmitForm} className='pt-2 pb-2'>
                        <Form.Group>
                            <Form.Label>Nom de la commande</Form.Label>
                            <Form.Control
                                placeholder="Exemple: Bijoux Bordeaux"
                                onChange={onChangeName}
                                
                                required
                                />
                        </Form.Group>
                    <hr />
                        <Form.Group>
                            <Form.Label>Choisissez un client</Form.Label>
                            <Select
                                options={customers.map((customer) => ({
                                    value: customer.id,
                                    label: `${customer.firstname} ${customer.lastname}`
                                }))}
                                value={selectedCustomer}
                                onChange={setSelectedCustomer}
                                placeholder="Sélectionnez un client"
                                styles={customStyles}
                            />
                        </Form.Group>

                        {orderProducts.map((orderProduct, index) => (
                            <div key={index} className="mt-3 d-flex align-items-center">
                                <Form.Group className="me-2 flex-grow-1">
                                    <Form.Label>Produit</Form.Label>
                                    <Select
                                        options={products.map((product) => ({
                                            value: product.id,
                                            label: `${product.name} - ${product.price}€`
                                        }))}
                                        value={getProductOption(orderProduct.productId)}
                                        onChange={(option) => handleProductChange(index, 'productId', option.value)}
                                        placeholder="Sélectionnez un produit"
                                        styles={customStyles}
                                        formatOptionLabel={({ label }) => <div>{label}</div>}
                                    />
                                </Form.Group>

                                <Form.Group className="me-2">
                                    <Form.Label>Quantité</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={orderProduct.quantity}
                                        onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                        min="1"
                                    />
                                </Form.Group>

                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveProduct(index)}
                                >Supprimer</Button>
                            </div>
                        ))}

                        <Button
                            className='mt-3'
                            variant="secondary"
                            onClick={addProductToOrder}
                        >Ajouter un produit
                        </Button>

                        <div className="mt-5">
                            <h4 class="mt-5">Total prévisionnel: {calculateTotalAmount()}€ HT</h4>
                        </div>
                        <div>
                            <small>Ce total évolue en temps réel en fonction des ajustements sur la commande.</small>
                        </div>

                        <Button className='mt-3' variant="success" type="submit" disabled={isLoading}>
                            {isLoading ? 'Création...' : 'Créer commande'}
                        </Button>
                    </Form>
                    {showSuccessMessage && <p className="mt-3 text-success">Commande créée avec succès !</p>}
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </Row>
            </Container>
        </div>
    );
}

export default OrderCreate;
