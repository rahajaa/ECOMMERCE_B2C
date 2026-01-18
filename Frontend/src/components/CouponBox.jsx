// PATH: frontend/src/components/CouponBox.jsx

import { useState } from "react";
import API from "../services/api";

export default function CouponBox({ onApply }) {

  const [code, setCode] = useState("");

  const check = async () => {
    const res = await API.get(
      "coupons/validate/?code=" + code
    );

    onApply(res.data);
  };

  return (
    <div>
      <input
        placeholder="Code promo"
        onChange={e => setCode(e.target.value)}
      />

      <button onClick={check}>
        Appliquer
      </button>
    </div>
  );
}
