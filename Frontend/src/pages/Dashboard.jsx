// Frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth"); // redirect if not logged in
      return;
    }

    axios
      .get("/profile/") // Endpoint Django pour récupérer le profil
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/auth");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bienvenue {user.username}</h2>
      <p>Email : {user.email}</p>
      <p>Prénom : {user.first_name}</p>
      <p>Nom : {user.last_name}</p>
      <button onClick={logout} style={{ marginTop: "20px", padding: "10px" }}>
        Se Déconnecter
      </button>
    </div>
  );
}
