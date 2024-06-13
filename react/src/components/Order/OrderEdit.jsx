import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import OrderPDF from './OrderPDF';
import { useAuth } from '../../services/Auth';

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
    const [customerDetails, setCustomerDetails] = useState({});
    const [orderDetails, setOrderDetails] = useState({})
    const { user, token } = useAuth()

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

        async function fetchOrderDetails() {
            try {
                // Connexion et obtention du token d'authentification
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
        
                // Récupération des détails de la commande
                const orderResponse = await axios.get('http://localhost:8000/api/orders/' + id, config);
                const orderData = orderResponse.data;
        
                console.log("[useEffect] Response /api/orders/id", orderData);
        
                if (orderData.customer && orderData.orderProducts) {
                    // Définir le client sélectionné
                    setSelectedCustomer({ 
                        value: orderData.customer.id, 
                        label: `${orderData.customer.firstname} ${orderData.customer.lastname}` 
                    });
                    
                    // Mettre à jour orderProducts pour inclure le nom et le prix des produits
                    setOrderProducts(orderData.orderProducts.map(orderProduct => ({
                        productId: orderProduct.product.id, // Corrigé pour utiliser product.id
                        name: orderProduct.product.name, // Accès au nom du produit
                        price: orderProduct.product.price, // Accès au prix du produit
                        quantity: orderProduct.quantity
                    })));

                    //console.log(orderProducts)
        
                    // Stocker les détails du client
                    setCustomerDetails({
                        firstname: orderData.customer.firstname,
                        lastname: orderData.customer.lastname,
                        address: orderData.customer.address,
                        email: orderData.customer.email,
                        phone: orderData.customer.phonenumber
                    });


                    setOrderDetails({
                        orderNumber: orderData.orderNumber,
                        name: orderData.name
                    })
                    // Définir le nom de la commande
                    //setOrderName(orderData.name);
                } else {
                    setError('Détails de la commande non trouvés.');
                }
            } catch (error) {
                setError('Erreur lors de la récupération des détails de la commande : ' + error.message);
                console.error('Erreur :', error);
            }
            finally {
                setIsLoading(false); // Arrêter le chargement après la récupération des donné
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
        setIsLoading(true); // Indiquer que le chargement commence
        try {
            // Connexion et obtention du token d'authentification
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
    
            // Préparer les données de la commande à envoyer
            const orderPayload = {
                orderNumber: 2000,
                totalAmount: 666,
                name: orderDetails.name,
                customer: { id: selectedCustomer ? selectedCustomer.value : '' },
                products: orderProducts.map(product => ({
                    id: product.productId, // Correction pour utiliser productId au lieu de id
                    quantity: parseInt(product.quantity)
                }))
            };
    
            console.log(orderPayload); // Afficher les données de la commande pour vérification
    
            // Envoyer la requête PUT pour mettre à jour la commande
            await axios.put('http://localhost:8000/api/orders/' + id, orderPayload, config);
    
            // Afficher un message de succès
            setShowSuccessMessage(true);
            setOrderProducts([]); // Réinitialiser les produits de la commande
            setSelectedCustomer(null); // Réinitialiser le client sélectionné
            setTimeout(() => setShowSuccessMessage(false), 10000); // Cacher le message après 10 secondes
        } catch (error) {
            setError('Erreur lors de la mise à jour de la commande : ' + error.message);
            console.error('Erreur :', error);
        } finally {
            setIsLoading(false); // Indiquer que le chargement est terminé
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
                    <h1 className='pt-3 pb-3'>Modifier la commande {orderDetails.name}</h1>
                    <hr />

                    {isLoading ? (
                        <div className="text-center pt-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p>Chargement des données en cours...</p>
                        </div>
                    ) : (
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

                    </Form>)}

                    {showSuccessMessage && <p className="mt-3 text-success">Commande mise à jour avec succès !</p>}
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </Row>
            </Container>

            <Container className='mt-5'>
                <Row>
                    <Col>
                        <OrderPDF
                        title="Devis" 
                        orderNumber={orderDetails.orderNumber} 
                        orderName={orderDetails.name} 
                        customerDetails={customerDetails}
                        orderProducts={orderProducts}
                        />
                    </Col>
                    <Col>
                        <OrderPDF 
                        title="Facture"
                        orderNumber={orderDetails.orderNumber} 
                        orderName={orderDetails.name} 
                        customerDetails={customerDetails}
                        orderProducts={orderProducts}
                        />
                    </Col>
                </Row>
                
            </Container>
            

        </div>
    );
}

export default OrderEdit;
