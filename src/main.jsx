import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import './index.css';

// Inject Vercel Web Analytics for general page traffic monitoring
inject();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </React.StrictMode>
);
