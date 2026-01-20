import { useEffect, useState } from "react";
import { getProfile } from "../api/userService";

function UserProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then(res => setUser(res.data))
      .catch(() => console.error("Non autorisé"));
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mon compte</h2>
      <p>Email : {user.email}</p>
      <p>Username : {user.username}</p>
    </div>
  );
}

export default UserProfilePage;
