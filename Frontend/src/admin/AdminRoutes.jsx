// FRONTEND/src/admin/AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FinanceDashboard from './FinanceDashboard';
import AuditLog from './AuditLog';
import MonthlyAccounting from './MonthlyAccounting';
import MonitoringDashboard from './MonitoringDashboard';

export default function AdminRoutes() {
    return (
        <div className="admin-container">
            <h1>Administration BeToo</h1>
            <nav className="admin-nav">
                <a href="/admin/finance">Finance</a>
                <a href="/admin/audit">Audit</a>
                <a href="/admin/accounting">Comptabilité</a>
                <a href="/admin/monitoring">Monitoring</a>
            </nav>
            
            <Routes>
                <Route path="finance" element={<FinanceDashboard />} />
                <Route path="audit" element={<AuditLog />} />
                <Route path="accounting" element={<MonthlyAccounting />} />
                <Route path="monitoring" element={<MonitoringDashboard />} />
            </Routes>
        </div>
    );
}