// React Router
import { createBrowserRouter } from "react-router-dom";

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

{/* Children va contenir un component : exemple <Home /> etc */}
const PageLayout = ({ children }) => (
    <div>
        <Header />
            <Container className='mt-5 p-2'>
                <HomeAlert />
            </Container>
            {children}
        <Footer />
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <PageLayout>
                    <Home />
                </PageLayout>
            </div>
        ),
    },
    {
        path: "products",
        element: <div>
            <PageLayout>
                <ProductList />
            </PageLayout>
        </div>,
    },
    {
        path: "products/create",
        element: <div>
            <PageLayout>
                <ProductCreate />
            </PageLayout>
        </div>,
    },
    {
        path: "products/edit/id",
        element: <div>
            <PageLayout>
                <ProductEdit />
            </PageLayout>
        </div>,
    },
    {
        path: "customers",
        element: <div>
            <PageLayout>
                <CustomerList />
            </PageLayout>
        </div>,
    },
    {
        path: "customers/create",
        element: <div>
            <PageLayout>
                <CustomerCreate />
            </PageLayout>
        </div>,
    },
    {
        path: "customers/edit/:id",
        element: <div>
            <PageLayout>
                <CustomerEdit />
            </PageLayout>
        </div>,
    },
    {
        path: "orders",
        element: <div>
            <PageLayout>
                <OrderList />
            </PageLayout>
        </div>,
    },
    {
        path: "orders/id",
        element: <div>
            <PageLayout>
                <OrderShow />
            </PageLayout>
        </div>,
    },
    {
        path: "orders/create",
        element: <div>
            <PageLayout>
                <OrderCreate />
            </PageLayout>
        </div>,
    },
    {
        path: "orders/edit/id",
        element: <div>
            <PageLayout>
                <OrderEdit />
            </PageLayout>
        </div>,
    },
]);

export default router;