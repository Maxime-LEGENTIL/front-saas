import React from 'react'
import ReactDOM from 'react-dom/client'

// Routes 
import routes from './routes/routes.jsx';
import { RouterProvider } from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

// Auth 
import Auth from './services/Auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Auth>
            <RouterProvider router={routes} />
            {/*<App />*/}
        </Auth>
    </React.StrictMode>,
)