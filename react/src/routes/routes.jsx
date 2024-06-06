// React Router
import { Navigate, createBrowserRouter } from "react-router-dom";

// React UI
import { Container, Row } from 'react-bootstrap';

// Components
import Header from "../components/Menu/Header";
import HomeAlert from "../components/HomeAlert/HomeAlert";
import Footer from "../components/Menu/Footer";
import Home from "../components/Home/Home";
import CustomerList from "../components/Customer/CustomerList";
import CustomerCreate from "../components/Customer/CustomerCreate";
import CustomerEdit from "../components/Customer/CustomerEdit";
import ProductList from "../components/Product/ProductList";
import ProductCreate from "../components/Product/ProductCreate";
import ProductEdit from "../components/Product/ProductEdit";
import OrderCreate from "../components/Order/OrderCreate";
import OrderList from "../components/Order/OrderList";
import OrderEdit from "../components/Order/OrderEdit";
import OrderShow from "../components/Order/OrderShow";
import Login from "../components/Login/Login";
import Logout from "../components/Logout/Logout";

{/* Children va contenir un component : exemple <Home /> etc */}
const PageLayout = ({ children }) => (
    <div className="dark-theme">
        <Header />
            <Container className='mt-5 p-2'>
                <HomeAlert />
            </Container>
            {children}
        <Footer />
    </div>
);

const isAuthenticated = () => {
    // Vérifiez si l'utilisateur est connecté en fonction de votre logique d'authentification
    // Par exemple, vérifiez si un jeton d'authentification est présent dans le stockage local ou dans un état global
    const token = localStorage.getItem('token');
    return token !== null; // Retourne vrai si l'utilisateur est connecté, sinon faux
};


const router = createBrowserRouter([
    {
        path: "/",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <Home />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "login",
        element: (
            <div>
                <PageLayout>
                    <Login />
                </PageLayout>
            </div>
        ),
    },
    {
        path: "logout",
        element: (
            <div>
                <PageLayout>
                    <Logout />
                </PageLayout>
            </div>
        ),
    },
    {
        path: "products",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <ProductList />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "products/create",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <ProductCreate />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "products/edit/:id",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <ProductEdit />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "customers",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <CustomerList />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "customers/create",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <CustomerCreate />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "customers/edit/:id",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <CustomerEdit />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "orders",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <OrderList />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "orders/id",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <OrderShow />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "orders/create",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <OrderCreate />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
    {
        path: "orders/edit/:id",
        element: isAuthenticated() ? ( // Vérifiez si l'utilisateur est connecté
            <div>
                <PageLayout>
                    <OrderEdit />
                </PageLayout>
            </div>
        ) : (
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            <Navigate to="/login" replace />
        ),
    },
]);

export default router;