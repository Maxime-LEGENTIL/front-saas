import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import { useAuth } from '../../services/Auth';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Person3Icon from '@mui/icons-material/Person3';

function Header() {
    const { user, token, logout } = useAuth();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand><Link to="../"><img src={logo} alt="Le logo de Hiboo CRM" style={{height: '50px'}}/></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    { token ? (
                        <>
                            <Nav.Link><Link to="../customers/create"><AddCircleIcon></AddCircleIcon> Créer un client</Link></Nav.Link>
                            <Nav.Link><Link to="../products/create"><AddCircleIcon></AddCircleIcon> Créer un produit</Link></Nav.Link>
                            <Nav.Link><Link to="../orders/create"><AddCircleIcon></AddCircleIcon> Créer une commande</Link></Nav.Link>
                        </>

                    ) : ''}

                    {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>*/}
                </Nav>
                <Nav>
                    { token ? (
                        <>
                            <Nav.Link><Link to="../logout"><LogoutIcon></LogoutIcon> Se déconnecter</Link></Nav.Link>
                        </>

                    ) : 
                        <>
                            <Nav.Link><Link to="../inscription" className='mt-5 px-4 py-2 rounded-pill' style={{backgroundColor: '#FF4F01', border: 'none', color: 'white'}}><Person3Icon></Person3Icon> S'inscrire</Link></Nav.Link>
                            <Nav.Link><Link to="../login" className='mt-5 px-4 py-2 rounded-pill' style={{backgroundColor: '#FF4F01', border: 'none', color: 'white'}}><LoginIcon></LoginIcon> Se connecter</Link></Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Header;