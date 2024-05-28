import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './max.css'

// Router DOM
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Header from './components/Menu/Header.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RapidMenu from './components/Menu/RapidMenu';
import OrderList from './components/Order/OrderList';
import ProductCreate from './components/Product/ProductCreate';

import HomeAlert from './components/HomeAlert/HomeAlert';
import LatestProduct from './components/Product/LatestProduct';

import Button from 'react-bootstrap/Button';
import ProductEdit from './components/Product/ProductEdit.jsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <Header />
                <Container className='mt-5 p-2'>
                    <HomeAlert />
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <RapidMenu text={'Créer client'} />
                                <RapidMenu text={'Modifier client'} />
                                <RapidMenu text={'Créer commande'} />
                                <RapidMenu text={'Modifier commande'} />
                            </div>
                            <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <RapidMenu text={'Créer produit'} />
                                <RapidMenu text={'Modifier produit'} />
                                <RapidMenu text={'Catalogue'} />
                                <RapidMenu text={'Clients'} />
                            </div>
                            <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <RapidMenu text={'Commandes'} />
                            </div>
                        </Col>
                        <Col style={{backgroundColor: 'white'}}>
                            <div id='title' className='p-5' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <span><h3>Dernière commande</h3></span>
                                <span><h6>Voir tout</h6></span>
                            </div>
                            <div id='body' className='bg-blue p-4 mb-5 border' style={{ backgroundColor: '#11104b', color: 'white' }}>
                                <div>
                                    <h2>Bijoux Bordeaux</h2>
                                </div>
                                <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <span><h4>Montant</h4></span>
                                    <span><h4>2.639€ TTC</h4></span>
                                </div>
                                <hr />
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <span><h5>N°</h5></span>
                                    <span><h6>65980516</h6></span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <span><h5>Statut</h5></span>
                                    <span><h6>En cours de signature</h6></span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <span><h5>Date</h5></span>
                                    <span><h6>28/05/2024</h6></span>
                                </div>
                                <div className='text-center'>
                                    <Button variant='light'>Voir la commande</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        ),
    },
    {
        path: "products/create",
        element: <div>
            <Header />
                <Container className='mt-5 p-2'>
                    <HomeAlert />
                </Container>
                <Container>
                    <Row>
                        <hr />
                        <h1 class='pt-3 pb-3'>Créer un nouveau produit</h1>
                        <ProductCreate />
                    </Row>
                </Container>
        </div>,
    },
    {
        path: "products/edit",
        element: <div>
            <Header />
                <Container className='mt-5 p-2'>
                    <HomeAlert />
                </Container>
                <Container>
                    <Row>
                        <hr />
                        <h1 class='pt-3 pb-3'>Modifier un produit</h1>
                        <ProductEdit />
                    </Row>
                </Container>
        </div>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/*<App />*/}
    </React.StrictMode>,
)