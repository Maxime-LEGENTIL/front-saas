import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
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
import Home from './components/Home/Home.jsx';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CustomerCreate from './components/Customer/CustomerCreate.jsx';
import CustomerList from './components/Customer/CustomerList.jsx';
import Footer from './components/Menu/Footer.jsx';


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <Header />
                <Container className='mt-5 p-2'>
                    <HomeAlert />
                </Container>
                
                <Home />

                <Footer />
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
            <Footer />
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
            <Footer />
        </div>,
    },
    {
        path: "customers",
        element: <div>
            <Header />
            <Container className='mt-5 p-2'>
                <HomeAlert />
            </Container>
            <Container>
                <Row>
                    <hr />
                    <CustomerList />
                </Row>
            </Container>
            <Footer />
        </div>,
    },
    {
        path: "customers/create",
        element: <div>
            <Header />
            <Container className='mt-5 p-2'>
                <HomeAlert />
            </Container>
            <Container>
                <Row>
                    <hr />

                    <h1 class='pt-3 pb-3'>Créer un nouveau client</h1>
                    <CustomerCreate />
                </Row>
            </Container>
            <Footer />
        </div>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/*<App />*/}
    </React.StrictMode>,
)