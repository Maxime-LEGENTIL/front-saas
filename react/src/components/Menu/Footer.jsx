import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <footer className='mt-5' style={{ backgroundColor: '#11104b', color: '#fff', padding: '20px 0' }}>
            <Container>
                <Row className="d-flex justify-content-between">
                    <Col md={4} className="d-flex flex-column">
                        <h5>Contact Us</h5>
                        <p>123 Main Street, Anytown, USA</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </Col>
                    <Col md={4} className="d-flex flex-column">
                        <h5>Quick Links</h5>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li>
                                <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
                            </li>
                            <li>
                                <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
                            </li>
                            <li>
                                <Link to="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</Link>
                            </li>
                            <li>
                                <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col md={4} className="d-flex flex-column">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://facebook.com" style={{ color: '#fff', marginRight: '10px' }}>
                                <FacebookIcon />
                            </a>
                            <a href="https://twitter.com" style={{ color: '#fff', marginRight: '10px' }}>
                                <TwitterIcon />
                            </a>
                            <a href="https://instagram.com" style={{ color: '#fff', marginRight: '10px' }}>
                                <InstagramIcon />
                            </a>
                            <a href="https://linkedin.com" style={{ color: '#fff', marginRight: '10px' }}>
                                <LinkedInIcon />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-3">
                        <p>&copy; {new Date().getFullYear()} Hiboo CRM. Tous droits réservés.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
