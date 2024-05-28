import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function LatestProduct() {
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_UWfQgGTLdZMYl506uR4xFkW3ZeVDY9XqOknkKUI4w&s" />
        <Card.Body>
            <Card.Title>Pot de peinture 20L blanc</Card.Title>
            <Button variant="primary">Voir le produit</Button>
        </Card.Body>
        </Card>
    );
}

export default LatestProduct;