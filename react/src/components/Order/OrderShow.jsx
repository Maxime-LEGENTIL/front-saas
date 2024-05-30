import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
//import './OrderShow.css'; // Assuming you have a CSS file for additional styling

export default function OrderShow() {
    return (
        <div>
            <Container>
                <h1 className='pb-5'>Commande n°xxxx</h1>
                <Row className='pb-2 mb-4 border-bottom'>
                    <Col md={6}>
                        <h5>Produits</h5>
                    </Col>
                    <Col md={2}>
                        <h5>Prix unitaire</h5>
                    </Col>
                    <Col md={2}>
                        <h5>Quantité</h5>
                    </Col>
                    <Col md={2}>
                        <h5>Prix HT</h5>
                    </Col>
                </Row>

                {[1, 2, 3].map((item) => (
                    <div className='mb-3' key={item} style={{ backgroundColor: 'rgb(231 231 231)' }}>
                        <div className='p-3' style={{ borderLeft: '5px solid green' }}>
                            <Row className='align-items-center'>
                                <Col md={6} className="d-flex align-items-center">
                                    <img
                                        src="https://img.freepik.com/photos-gratuite/montre-elegante-chaine-argent-or-isolee_181624-27080.jpg"
                                        alt="Produit"
                                        width="90"
                                        height="70"
                                        style={{ borderRadius: '10px' }} />
                                    <div className="ms-3">
                                        <h6>Rolex Gama M24</h6>
                                        <p className="text-muted"><small style={{ color: 'green' }}>8 en stock</small></p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <h6 style={{ color: 'green' }}>20.00 €</h6>
                                </Col>
                                <Col md={2}>
                                    <InputGroup>
                                        <FormControl type="number" min="1" defaultValue="1" style={{ maxWidth: '70px' }} />
                                    </InputGroup>
                                </Col>
                                <Col md={2}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">20.00 € <DeleteForeverOutlinedIcon style={{ cursor: 'pointer', color: 'red' }} /></h6>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ))}

                {/* Total HT and Total TTC Rows */}
                <Row className='mt-4 p-3' style={{ backgroundColor: 'rgb(231 231 231)' }}>
                    <Col md={{ span: 2, offset: 8 }} className="text-right">
                        <h6>Total HT</h6>
                    </Col>
                    <Col md={2} className="text-right">
                        <h6>60.00 €</h6>
                    </Col>
                </Row>
                <Row className='mt-2 p-3' style={{ backgroundColor: 'rgb(231 231 231)' }}>
                    <Col md={{ span: 2, offset: 8 }} className="text-right">
                        <h6>Total TTC</h6>
                    </Col>
                    <Col md={2} className="text-right">
                        <h6 style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>72.00 €</h6>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
