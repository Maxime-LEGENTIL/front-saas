import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function LatestProduct() {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://img.freepik.com/vecteurs-libre/composition-seau-peinture-realiste-metallique-couvercle-seau-plastique-blanc-illustration-peinture-rouge_1284-29319.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716595200&semt=ais_user" />
            <Card.Body className='text-center'>
                <Card.Title>Pot de peinture 20L blanc</Card.Title>
                <Button variant="primary">Voir le produit</Button>
            </Card.Body>
        </Card>
    );
}

export default LatestProduct;