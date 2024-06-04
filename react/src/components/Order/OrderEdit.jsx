import { useEffect, useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

function OrderEdit() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { id } = useParams(); // Récupère l'id de la commande à partir des paramètres d'URL
    const [orderName, setOrderName] = useState('')

    useEffect(() => {
        async function fetchProductsAndCustomers() {
            try {
                const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                    username: 'admin@admin.com',
                    password: 'admin'
                });

                const token = loginResponse.data.token;
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

        async function fetchOrderDetails() {
            try {
                const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                    username: 'admin@admin.com',
                    password: 'admin'
                });
        
                const token = loginResponse.data.token;
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
        
                const orderResponse = await axios.get('http://localhost:8000/api/orders/' + id, config);
                const orderData = orderResponse.data;
        
                console.log(orderData.customer)
        
                if (orderData.customer && orderData.orderProducts) {
                    setSelectedCustomer({ value: orderData.customer.id, label: `${orderData.customer.firstname} ${orderData.customer.lastname}` });
                    
                    // Mise à jour de orderProducts pour inclure le nom et le prix des produits
                    setOrderProducts(orderData.orderProducts.map(orderProduct => ({
                        productId: orderProduct.id,
                        name: orderProduct.product.name, // Accédez au nom du produit à partir de orderProduct.product.name
                        price: orderProduct.product.price, // Accédez au prix du produit à partir de orderProduct.product.price
                        quantity: orderProduct.quantity
                    })))
                    
                    setOrderName(orderData.name);
                } else {
                    setError('Order details not found.');
                }
            } catch (error) {
                setError('Error fetching order details: ' + error.message);
                console.error('Error:', error);
            }
        }
        

        fetchProductsAndCustomers();
        fetchOrderDetails();
    }, [id]);

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
        let total = 0;
    
        orderProducts.forEach(orderProduct => {
            const productInfo = products.find(product => product.id === orderProduct.productId);
            if (productInfo) {
                total += productInfo.price * orderProduct.quantity;
            }
        });
    
        return total.toFixed(2);
    };

    const getProductOption = (productId) => {
        const product = orderProducts.find(p => p.productId === productId);
        return product ? { value: product.productId, label: `${product.name} - ${product.price}€` } : null;
    };
    
    

    async function onSubmitForm(e) {
        e.preventDefault();
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
    
            const orderPayload = {
                orderNumber: Math.floor(Math.random() * 1000000000),
                totalAmount: parseInt(calculateTotalAmount()),
                products: orderProducts.map(product => ({
                    id: product.productId,
                    quantity: product.quantity
                })),
                customer: { id: selectedCustomer ? selectedCustomer.value : '' }
            };

            console.log(token)
            console.log(orderPayload)
    
            await axios.put('http://localhost:8000/api/orders/' + id, orderPayload, config);
    
            setShowSuccessMessage(true);
            setOrderProducts([]);
            setSelectedCustomer(null);
            setTimeout(() => setShowSuccessMessage(false), 10000); // Hide the message after 10 seconds
        } catch (error) {
            setError('Error updating order: ' + error.message);
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

    return (
        <div>
            <Container>
                <Row>
                    <hr />
                    <h1 className='pt-3 pb-3'>Modifier la commande {orderName}</h1>
                    <hr />
                    <Form onSubmit={onSubmitForm} className='pt-3'>
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
                            <h4 className="mt-5">Total prévisionnel: {calculateTotalAmount()}€ HT</h4>
                        </div>
                        <div>
                            <small>Ce total évolue en temps réel en fonction des ajustements sur la commande.</small>
                        </div>

                        <Button className='mt-3' variant="success" type="submit" disabled={isLoading}>
                            {isLoading ? 'Modification...' : 'Modifier commande'}
                        </Button>
                    </Form>
                    {showSuccessMessage && <p className="mt-3 text-success">Commande mise à jour avec succès !</p>}
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </Row>
            </Container>
        </div>
    );
}

export default OrderEdit;
