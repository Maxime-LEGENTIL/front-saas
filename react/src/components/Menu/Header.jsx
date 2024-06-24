import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Assurez-vous que le chemin est correct
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';

function Header() {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className="me-auto">
                    <Link to="../">
                        <img src={logo} alt="Le logo de Hiboo CRM" style={{ height: '50px' }} />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <Nav.Link
                                as={Link}
                                to="../logout"
                                className='px-4 py-2 rounded-pill'
                                style={{ backgroundColor: '#FF4F01', border: 'none', color: 'white' }}
                                onClick={handleLogout}
                            >
                                Se déconnecter
                            </Nav.Link>
                        ) : (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="../inscription"
                                    className='px-4 py-2 rounded-pill'
                                    style={{ backgroundColor: '#FF4F01', border: 'none', color: 'white' }}
                                >
                                    S'inscrire
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="../login"
                                    className='px-4 py-2 rounded-pill'
                                    style={{ backgroundColor: '#FF4F01', border: 'none', color: 'white' }}
                                >
                                    Se connecter
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
