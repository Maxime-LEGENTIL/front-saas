import React from 'react';
import ProductList from './components/Product/ProductList';
import Navbar from './components/Menu/Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RapidMenu from './components/Menu/RapidMenu';
import OrderList from './components/Order/OrderList';
import ProductCreate from './components/Product/ProductCreate';

import HomeAlert from './components/HomeAlert/HomeAlert';
import LatestProduct from './components/Product/LatestProduct';

import Button from 'react-bootstrap/Button';

function App() {
    return (
        <>
            <Navbar />
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
            <Container className='bg-white mt-5 p-5'>
                <Row>
                    <Col>
                        <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Dernier produit ajouté</h3>
                            <span><h5>Voir tout</h5></span>
                        </div>

                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus maiores soluta impedit modi architecto, sequi ratione dignissimos est, suscipit facere veritatis nostrum dolor numquam ut. Quibusdam nulla itaque facilis unde.</p>

                        <LatestProduct />
                    </Col>


                    <Col>
                        
                    </Col>
                </Row>

                <ProductList />
                <OrderList />
                <ProductCreate />
            </Container>

        </>
    );
}

export default App;
