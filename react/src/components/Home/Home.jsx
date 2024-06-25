import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import RapidMenu from '../Menu/RapidMenu';
import LatestProduct from '../Product/LatestProduct';
import ChartJS from './ChartJS';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import MovingIcon from '@mui/icons-material/Moving';

import { Link, useNavigate } from 'react-router-dom';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import OrderShow from '../Order/OrderShow';

import { useAuth } from '../../services/Auth';
import { useEffect, useState } from 'react';

import axios from 'axios'
import OrderPDF from '../Order/OrderPDF';

//import { login, logout } from '../../authActions';
import { useSelector } from 'react-redux';

export default function Home() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState('');
    const [lastOrder, setLastOrder] = useState('');
    const [error, setError] = useState({})

    //const { user, token } = useAuth()
    const { token, isAuthenticated } = useSelector(state => state.auth);

    const [nbCustomers, setNbCustomers] = useState('')
    const [nbProducts, setNbProducts] = useState('')
    const [nbOrders, setNbOrders] = useState('')


    useEffect(() => {
        async function fetchLastOrder() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const orderResponse = await axios.get('http://localhost:8000/api/orders/last', config);

                setLastOrder(orderResponse.data);
            } catch (error) {
                setError('Error fetching customers: ' + error.message);
                console.error('Error:', error);
            } finally {
                setIsLoading(false); // Arrêter le chargement après la récupération des données
            }
        }

        async function fetchNumbers() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const customerResponse = await axios.get('http://localhost:8000/api/customers', config);
                setNbCustomers(customerResponse.data.length);

                const productResponse = await axios.get('http://localhost:8000/api/products', config);
                setNbProducts(productResponse.data.length);

                const orderResponse = await axios.get('http://localhost:8000/api/orders', config);
                setNbOrders(orderResponse.data.length);
            }
            catch(error) {

            }
            finally {

            }

        }

        fetchLastOrder();
        fetchNumbers();
    }, []); // L'effet se déclenche une seule fois à l'initialisation du composant

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <RapidMenu text={'Créer client'} />
                            <RapidMenu text={'Modifier client'} />
                            <RapidMenu text={'Créer produit'} />
                            <RapidMenu text={'Modifier produit'} />
                        </div>
                        <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <RapidMenu text={'Créer commande'} />
                            <RapidMenu text={'Modifier commande'} />
                            <RapidMenu text={'Créer un ticket'} />
                            <RapidMenu text={'###'} />
                        </div>
                    </Col>
                    <Col style={{backgroundColor: 'white', borderRadius: '10px'}}>
                        <div id='title' className='p-5' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <span><h3>Dernière commande</h3></span>
                            <span><h6><Link to="/orders">Voir tout <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon></Link></h6></span>
                        </div>
                        <div id='body' className='bg-blue p-4 mb-5 border' style={{ backgroundColor: '#11104b', color: 'white', borderRadius: '8px' }}>
                            <div>
                                <h2>{lastOrder.name}</h2>
                            </div>
                            <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h4>Montant</h4></span>
                                <span><h4>{lastOrder.totalAmount}€ TTC</h4></span>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h5>N°</h5></span>
                                <span><h6>{lastOrder.orderNumber}</h6></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h5>Statut</h5></span>
                                <span><h6>-</h6></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h5>Date</h5></span>
                                <span><h6>{formatDate(lastOrder.createdAt)}</h6></span>
                            </div>
                            <div className='text-center'>
                                <Link to={`/orders/edit/${lastOrder.id}`}>
                                    <Button variant='light'>Voir la commande</Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className='mt-5' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="col-md-6 col-lg-4 d-flex mb-3">
                        <div className="row bg-light rounded-3 shadow p-3 w-100 advantage-card">
                            <div className="col-3 icon-container">
                                <i className="fa-regular fa-paper-plane"></i>
                            </div>
                            <div className="col-9 text-start content-container">
                                <div>
                                    <h5 className='orange'>Nombre de clients</h5>
                                    <p>Vous avez {nbCustomers} clients enregistré.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4 d-flex mb-3">
                        <div className="row bg-light rounded-3 shadow p-3 w-100 advantage-card">
                            <div className="col-3 icon-container">
                                <i className="fa-regular fa-paper-plane"></i>
                            </div>
                            <div className="col-9 text-start content-container">
                                <div>
                                    <h5 className='orange'>Nombre de produits</h5>
                                    <p>Vous avez {nbProducts} produits enregistré.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4 d-flex mb-3">
                        <div className="row bg-light rounded-3 shadow p-3 w-100 advantage-card">
                            <div className="col-3 icon-container">
                                <i className="fa-regular fa-paper-plane"></i>
                            </div>
                            <div className="col-9 text-start content-container">
                                <div>
                                    <h5 className='orange'>Nombre de commandes</h5>
                                    <p>Vous avez {nbOrders} commandes en cours.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>

            </Container>
        </div>
    );
}