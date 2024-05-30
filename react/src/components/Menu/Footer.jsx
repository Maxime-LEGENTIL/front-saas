import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from './logo.svg';

export default function Footer() {
    return (
        <footer className='mt-5' style={{ backgroundColor: 'rgb(217 217 217)', color: 'black', padding: '20px 0' }}>
            <Container>
                <Row>
                    <Col className="text-center mt-3">
                        <p>&copy; {new Date().getFullYear()} Hiboo CRM. Tous droits réservés.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div>
                                <a href="https://facebook.com" style={{ color: 'black', marginRight: '10px' }}>
                                    <FacebookIcon />
                                </a>
                                <a href="https://twitter.com" style={{ color: 'black', marginRight: '10px' }}>
                                    <TwitterIcon />
                                </a>
                                <a href="https://instagram.com" style={{ color: 'black', marginRight: '10px' }}>
                                    <InstagramIcon />
                                </a>
                                <a href="https://linkedin.com" style={{ color: 'black', marginRight: '10px' }}>
                                    <LinkedInIcon />
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center mt-3'>
                        <img src={logo} alt="Le logo de Hiboo CRM" style={{height: '50px'}}/>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
