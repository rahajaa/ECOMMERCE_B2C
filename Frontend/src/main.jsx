// X:\ecommerce_Projects\BeToo_Frontend\src\main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/App.css'; // Assurez-vous que le chemin est correct pour votre fichier CSS fusionné
import { AuthProvider } from './context/AuthContext.jsx'; // Assurez-vous d'importer AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
);