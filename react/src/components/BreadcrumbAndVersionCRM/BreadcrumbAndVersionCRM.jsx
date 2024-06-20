import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const breadcrumbNameMap = {
    '/': 'Dashboard',
    '/customers': 'Liste des clients',
    '/customers/create': 'Créer un client',
    '/customers/edit': 'Modifier un client',
    '/products': 'Liste des produits',
    '/products/create': 'Créer un produit',
    '/products/edit': 'Modifier un produit',
    '/orders': 'Liste des commandes',
    '/orders/create': 'Créer une commande',
    '/orders/edit': 'Modifier une commande',
    '/login': 'Connexion',
    '/inscription': 'Inscription'
    // Ajoutez ici d'autres routes selon vos besoins
};

function DynamicBreadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                <HomeIcon></HomeIcon> Dashboard
            </Breadcrumb.Item>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const routeKey = `/${pathnames.slice(0, index + 1).join('/')}`;

                let breadcrumbName = breadcrumbNameMap[routeKey];
                if (!breadcrumbName) {
                    // Gestion des routes dynamiques comme /customers/edit/:id
                    const dynamicKey = `/${pathnames.slice(0, index).join('/')}/edit`;
                    breadcrumbName = breadcrumbNameMap[dynamicKey] || value;
                }

                return isLast ? (
                    <Breadcrumb.Item active key={to}>
                        {breadcrumbName}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
                        {breadcrumbName}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}

function BreadcrumbAndVersionCRM() {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (
                <Alert variant="light" onClose={() => setShow(false)} dismissible>
                    <span><AddAlertOutlinedIcon /> Hiboo CRM est en version 1.0 ✅</span>
                </Alert>
            )}
            
            <DynamicBreadcrumb />
        </>
    );
}

export default BreadcrumbAndVersionCRM;
