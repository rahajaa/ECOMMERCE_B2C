// Frontend/src/admin/MonthlyAccounting.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export default function MonthlyAccounting() {

    const [report, setReport] = useState({});
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const fetchReport = async () => {
        const res = await api.get(`reports/monthly_accounting/?year=${year}&month=${month}`);
        setReport(res.data);
    };

    useEffect(() => { fetchReport(); }, [year, month]);

    const exportExcel = () => {
        window.location.href = `http://127.0.0.1:8000/api/accounting/export_excel/?year=${year}&month=${month}`;
    };

    return (
        <div>
            <h1>Comptabilité Mensuelle</h1>

            <label>Mois:
                <input type="number" value={month} onChange={e => setMonth(e.target.value)} />
            </label>
            <label>Année:
                <input type="number" value={year} onChange={e => setYear(e.target.value)} />
            </label>

            <button onClick={fetchReport}>Actualiser</button>
            <button onClick={exportExcel}>Exporter Excel</button>

            <div>
                <p>Total HT: {report.total_ht} Ar</p>
                <p>Total TVA: {report.total_tva} Ar</p>
                <h3>Total TTC: {report.total_ttc} Ar</h3>
                <p>Commandes payées: {report.total_orders}</p>
            </div>
        </div>
    );
}
