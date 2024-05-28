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

function RapidMenu({text}) {
    return (
        <div>
            
            <Button variant="light" className="bg-white p-2 d-flex flex-column align-items-center" style={{width: '105px', height: '105px'}}>
                {text === "Créer client" && (
                    <>
                        <PersonAddOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                {text === "Créer produit" && (
                    <>
                        <AddShoppingCartOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                {text === "Créer commande" && (
                    <>
                        <AddBusinessOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                {text === "Clients" && (
                    <>
                        <Person2OutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                {text === "Commandes" && (
                    <>
                        <InventoryOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                {text === "Catalogue" && (
                    <>
                        <AutoAwesomeMotionOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                
                {text === "Modifier client" && (
                    <>
                        <ManageAccountsOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                {text === "Modifier produit" && (
                    <>
                        <ShoppingCartOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                {text === "Modifier commande" && (
                    <>
                        <MuseumOutlinedIcon style={{color: 'orange', fontSize: '2rem'}} />
                    </>
                )}
                <div style={{marginTop: '5px'}}>
                    {text}
                </div>
            </Button>
        </div>
    );
}

export default RapidMenu;
