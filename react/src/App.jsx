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

function App() {
    return (
        <>
            <Navbar />
            <Container className='mt-5 p-2'>
                <HomeAlert />
            </Container>
            <Container className='pt-5'>
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
                        <div className='p-5' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <span><h3>Commandes</h3></span>
                            <span><h6>Voir tout</h6></span>
                        </div>
                        <div className='' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', backgroundColor: '#11104b', color: 'white' }}>
                            <span><h3>Montant</h3></span>
                            <span><h6>2.639€ TTC</h6></span>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='pt-5'>
                <h3>Dernier produit ajouté</h3>

                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus maiores soluta impedit modi architecto, sequi ratione dignissimos est, suscipit facere veritatis nostrum dolor numquam ut. Quibusdam nulla itaque facilis unde.</p>

                <LatestProduct />
                <ProductList />
                <OrderList />
                <ProductCreate />
            </Container>

        </>
    );
}

export default App;
