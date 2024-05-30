import React, { useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function LatestProduct({image}) {
    return (
        <div>

        <Card style={{ width: '15rem', height: '25rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body className='text-center'>
                <Card.Title>Rolex Gama M24</Card.Title>
                <div className='pt-2'>
                    <Button variant="primary">Voir le produit</Button>
                </div>
            </Card.Body>
        </Card>
        </div>
    );
}

export default LatestProduct;
