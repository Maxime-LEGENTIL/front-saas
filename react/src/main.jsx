import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import store from './redux/store/store.js'; // Importer le store Redux

// Routes 
import routes from './routes/routes.jsx';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
