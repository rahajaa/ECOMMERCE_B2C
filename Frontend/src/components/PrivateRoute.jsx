// FRONTEND/src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin) {
        const isAdmin = user?.is_staff || user?.is_superuser;
        if (!isAdmin) {
            return <Navigate to="/" />;
        }
    }

    return children;
};

export default PrivateRoute;