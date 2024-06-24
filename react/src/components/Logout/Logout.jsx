import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { logout } from '../../authActions';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Dispatch logout action
                //await dispatch(logout());

                // Clear local storage
                //localStorage.removeItem('token');

                // Navigate to login page
                navigate('/login');
            } catch (error) {
                console.error("Failed to logout:", error);
                // Handle the error appropriately, e.g., show a notification
            }
        };

        performLogout();
    }, [dispatch, navigate]);

    return null; // This component doesn't render anything visually
}
