import { useState } from "react";
import "./styles/LoginForm.css"; 

export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Message d'erreur

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username_or_email: usernameOrEmail, password }),
      });

      if (response.ok) {
        window.location.href = "/"; // Redirection après connexion réussie
      } else {
        const data = await response.json();
        setError(data.detail || "Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (err) {
      console.error("Erreur connexion :", err);
      setError("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Connexion</h2>
        <p>Accédez à votre compte e-commerce</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Nom d'utilisateur ou Email :</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            placeholder="ex: horitacode@gmail.com"
            required
          />

          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            required
          />

          <button type="submit">Se Connecter</button>
        </form>

        <div className="login-links">
          <p>
            Pas encore de compte ? <a href="/signup">Inscrivez-vous</a>
          </p>
          <p>
            Mot de passe oublié ? <a href="/forgot-password">Réinitialiser</a>
          </p>
        </div>
      </div>
    </div>
  );
}
