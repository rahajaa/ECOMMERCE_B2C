// Frontend/src/admin/AuditLog.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export default function AuditLog() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await api.get('audit/logs/');
            setLogs(res.data);
        };
        fetchLogs();
    }, []);

    return (
        <div>
            <h1>Journal des vérifications</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Commande</th>
                        <th>Opérateur</th>
                        <th>TX</th>
                        <th>Admin</th>
                        <th>Statut</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((l, i) => (
                        <tr key={i}>
                            <td>{l.order}</td>
                            <td>{l.provider}</td>
                            <td>{l.tx}</td>
                            <td>{l.checked_by}</td>
                            <td>{l.valid ? 'VALIDÉ' : 'REFUSÉ'}</td>
                            <td>{new Date(l.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
