import React from 'react';
import Button from 'react-bootstrap/Button';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'; // Ajouter client
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'; // Liste client
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'; // Modifier client
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; // Liste produits
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'; // Ajouter produit
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined'; // Ajouter commande
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'; // Liste commande
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined'; // Catalogue
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined'; // Modifier commande
import { Link } from 'react-router-dom';

function RapidMenu({ text }) {
    const getIcon = () => {
        switch (text) {
            case "Créer client":
                return <PersonAddOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Créer produit":
                return <AddShoppingCartOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Créer commande":
                return <AddBusinessOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Liste clients":
                return <Person2OutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Liste commandes":
                return <InventoryOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Liste produits":
                return <AutoAwesomeMotionOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Modifier client":
                return <ManageAccountsOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Modifier produit":
                return <ShoppingCartOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            case "Modifier commande":
                return <MuseumOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
            default:
                return <PersonAddOutlinedIcon style={{ color: 'orange', fontSize: '2rem' }} />;
        }
    };

    const getLink = () => {
        switch (text) {
            case "Créer client":
                return "/customers/create";
            case "Modifier client":
                return "/customers";
            case "Créer produit":
                return "/products/create";
            case "Modifier produit":
                return "/products";
            case "Créer commande":
                return "/orders/create";
            case "Modifier commande":
                return "/orders";
            default:
                return "/";
        }
    };

    return (
        <div>
            <Link to={getLink()} style={{ textDecoration: 'none' }}>
                <Button variant="light" className="bg-white p-2 d-flex flex-column align-items-center" style={{ width: '135px', height: '100px' }}>
                    {getIcon()}
                    <div style={{ marginTop: '5px' }}>
                        {text}
                    </div>
                </Button>
            </Link>
        </div>
    );
}

export default RapidMenu;
