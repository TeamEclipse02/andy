import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard 👋</h1>

      <p><strong>Email:</strong> {user?.email}</p>

      <p>
        <strong>Nombre:</strong>{" "}
        {user?.user_metadata?.nombre}
      </p>

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}
