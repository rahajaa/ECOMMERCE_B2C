import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Assurez-vous que c'est bien './App.jsx' si vous l'avez renommé
import './styles/App.css'
const root = ReactDOM.createRoot(document.getElementById('root')); // Ici on cherche l'élément avec l'ID 'root'
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);