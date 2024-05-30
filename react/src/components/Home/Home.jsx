import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import RapidMenu from '../Menu/RapidMenu';
import LatestProduct from '../Product/LatestProduct';
import ChartJS from './ChartJS';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { Link } from 'react-router-dom';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import OrderShow from '../Order/OrderShow';

export default function Home() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <RapidMenu text={'Créer client'} />
                            <RapidMenu text={'Modifier client'} />
                            <RapidMenu text={'Créer produit'} />
                            <RapidMenu text={'Modifier produit'} />
                        </div>
                        <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <RapidMenu text={'Créer commande'} />
                            <RapidMenu text={'Modifier commande'} />
                            <RapidMenu text={'dddd'} />
                            <RapidMenu text={'dddd'} />
                        </div>
                    </Col>
                    <Col style={{backgroundColor: 'white', borderRadius: '10px'}}>
                        <div id='title' className='p-5' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <span><h3>Dernière commande</h3></span>
                            <span><h6><Link to="">Voir tout <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon></Link></h6></span>
                        </div>
                        <div id='body' className='bg-blue p-4 mb-5 border' style={{ backgroundColor: '#11104b', color: 'white', borderRadius: '8px' }}>
                            <div>
                                <h2>Bijoux Bordeaux</h2>
                            </div>
                            <div className='pt-3' style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h4>Montant</h4></span>
                                <span><h4>2.639€ TTC</h4></span>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h5>N°</h5></span>
                                <span><h6>65980516</h6></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h5>Statut</h5></span>
                                <span><h6>En cours de signature</h6></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <span><h5>Date</h5></span>
                                <span><h6>28/05/2024</h6></span>
                            </div>
                            <div className='text-center'>
                                <Link to="orders/id">
                                    <Button variant='light'>Voir la commande</Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col className='p-5' style={{backgroundColor: 'white', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Derniers produits ajoutés</h3>
                            <span><h6><Link to="">Voir tout <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon></Link></h6></span>
                        </div>

                       {/* <Row>
                            <Col className='pt-5' style={{display: 'flex', justifyContent: 'space-between'}}>
                                <LatestProduct image='https://img.freepik.com/photos-gratuite/montre-elegante-chaine-argent-or-isolee_181624-27080.jpg'/>
                                <LatestProduct image='https://img.freepik.com/photos-gratuite/montre-doree-elegante-surface-blanche_181624-27078.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716508800&semt=ais_user'/>
                            </Col>
                        </Row>*/}
                        <div className='pt-5'>
                            <ChartJS id='1' type='bar' borderColor='black' />
                        </div>
                    </Col>


                    <Col className='p-5' style={{backgroundColor: 'white', borderTopRightRadius: '15px', borderBottomRightRadius: '15px'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Clients enregistrés</h3>
                            <span><h6><Link to="">Voir tout <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon></Link></h6></span>
                        </div>
                        <div className='pt-5'>
                            <ChartJS id='2' type='line' borderColor='yellow' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}