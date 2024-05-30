import React from 'react'
import ReactDOM from 'react-dom/client'

// Routes 
import routes from './routes/routes.jsx';
import { RouterProvider } from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={routes} />
        {/*<App />*/}
    </React.StrictMode>,
)