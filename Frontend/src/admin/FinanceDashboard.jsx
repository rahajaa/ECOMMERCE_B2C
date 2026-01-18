// Frontend/src/admin/FinanceDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export default function FinanceDashboard() {

    const [stats, setStats] = useState({});
    const [exporting, setExporting] = useState(false);

    const fetchStats = async () => {
        const res = await api.get('reports/finance/');
        setStats(res.data);
    };

    useEffect(() => { fetchStats(); }, []);

    const exportExcel = () => {
        setExporting(true);
        window.location.href = 'http://127.0.0.1:8000/api/export/excel/';
        setExporting(false);
    };

    return (
        <div>
            <h1>Finance – BeToo</h1>
            <p>Chiffre d’affaires : {stats.chiffre_affaires} Ar</p>
            <p>Commandes payées : {stats.commandes}</p>
            <p>Panier moyen : {stats.panier_moyen} Ar</p>
            <button onClick={exportExcel} disabled={exporting}>
                {exporting ? 'Export en cours...' : 'Export Excel'}
            </button>
        </div>
    );
}
