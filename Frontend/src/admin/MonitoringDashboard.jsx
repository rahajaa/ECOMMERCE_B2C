// Frontend/src/admin/MonitoringDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export default function MonitoringDashboard() {

    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        const res = await api.get('monitoring/logs/');
        setLogs(res.data);
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 300000); // rafraîchissement toutes les 5 min
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Monitoring Paiements & Erreurs</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Commande</th>
                        <th>TX</th>
                        <th>Erreur</th>
                        <th>Description</th>
                        <th>Notifié</th>
                        <th>Admin</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((l, i) => (
                        <tr key={i}>
                            <td>{l.order}</td>
                            <td>{l.tx}</td>
                            <td>{l.error_type}</td>
                            <td>{l.description}</td>
                            <td>{l.notified ? 'Oui' : 'Non'}</td>
                            <td>{l.checked_by}</td>
                            <td>{new Date(l.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
