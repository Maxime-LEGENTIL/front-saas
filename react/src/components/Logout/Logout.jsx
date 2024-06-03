import { Container, Row, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../services/Auth';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const { user, login, logout } = useAuth();  // Accéder à la fonction login via le contexte

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            logout()
            navigate('/login')
        }
    }, [user, navigate])
}
