// src/pages/AccountPage.jsx

import { useEffect, useState } from "react";
import api from "../api/axios"; // ton axios CONFIGURÉ

function AccountPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/accounts/profile/")
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        setError("Non autorisé ou token invalide");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mon compte</h2>
      <p><strong>ID :</strong> {user.id}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Username :</strong> {user.username}</p>
    </div>
  );
}

export default AccountPage;
