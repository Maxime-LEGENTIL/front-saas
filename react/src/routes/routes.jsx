import { createBrowserRouter, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// React UI
import { Container } from 'react-bootstrap';

// Components
import Header from "../components/Menu/Header";
import BreadcrumbAndVersionCRM from "../components/BreadcrumbAndVersionCRM/BreadcrumbAndVersionCRM";
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
import Email from "../components/Email/Email";
import Register from "../components/Register/Register";
import TicketCreate from "../components/Ticket/TicketCreate";
//import ProtectedRoute from "../components/ProtectedRoute";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PageLayout = ({ children }) => (
    <div className="dark-theme">
        <Header />
        <Container className='mt-5 p-2'>
            <BreadcrumbAndVersionCRM />
        </Container>
        {children}
        <Footer />
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <Home />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <Home />
                </PageLayout>
            </ProtectedRoute>
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
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <ProductList />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "products/create",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <ProductCreate />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "products/edit/:id",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <ProductEdit />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "customers",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <CustomerList />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "customers/create",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <CustomerCreate />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "customers/edit/:id",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <CustomerEdit />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "orders",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <OrderList />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "orders/id",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <OrderShow />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "orders/create",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <OrderCreate />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "orders/edit/:id",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <OrderEdit />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "inscription",
        element: (
            <div>
                <PageLayout>
                    <Register />
                </PageLayout>
            </div>
        ),
    },
    {
        path: "tickets/create",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <TicketCreate />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "emails/:id",
        element: (
            <ProtectedRoute>
                <PageLayout>
                    <Email />
                </PageLayout>
            </ProtectedRoute>
        ),
    },
]);

export default router;
