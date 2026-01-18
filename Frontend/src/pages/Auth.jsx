// Frontend/src/pages/Auth.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // <-- Assure-toi que LoginForm.css est renommé Auth.css ou adapte

const API_BASE = "http://127.0.0.1:8000/accounts"; // Ton backend Django

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login
        const res = await axios.post(`${API_BASE}/login/`, {
          username: formData.username,
          password: formData.password,
        });
        // Stockage du token dans localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard"); // redirige vers dashboard
      } else {
        // Register
        const res = await axios.post(`${API_BASE}/register/`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
        });
        alert(res.data.message);
        setIsLogin(true);
      }
    } catch (err) {
      if (err.response) setError(err.response.data.detail || JSON.stringify(err.response.data));
      else setError("Erreur réseau, vérifiez le backend");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="password2"
            placeholder="Confirmez le mot de passe"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? "Se Connecter" : "S'inscrire"}</button>
      </form>
      <p>
        {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
        <span className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Inscrivez-vous" : "Connexion"}
        </span>
      </p>
    </div>
  );
}
