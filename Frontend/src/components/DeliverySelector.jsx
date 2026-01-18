// PATH: frontend/src/components/DeliverySelector.jsx

import { useEffect, useState } from "react";
import API from "../services/api";

export default function DeliverySelector({ onSelect }) {

  const [zones, setZones] = useState([]);

  useEffect(() => {
    API.get("delivery/zones/").then(r => setZones(r.data));
  }, []);

  return (
    <select onChange={e => onSelect(e.target.value)}>
      {zones.map(z => (
        <option value={z.id}>
          {z.name} — {z.price} Ar
        </option>
      ))}
    </select>
  );
}
