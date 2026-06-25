import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../assets/auth.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const iniciarSesion = async () => {
    const emailLimpio = correo.trim();

    const { error } = await supabase.auth.signInWithPassword({
      email: emailLimpio,
      password: password,
    });

    if (error) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    alert("Inicio de sesión exitoso");
    navigate("/dashboard");
  };

  return (
    <>
      <div className="header">
        <h1 className="titulo-barra">Local Health Service</h1>

        <p className="subtitulo-barra">
          Porque la salud también se puede organizar
        </p>
      </div>

      <div className="login-container">
        <h1 className="titulo">¡BIENVENIDO!</h1>

        <h3 className="etiqueta">Correo electrónico</h3>

        <input
          className="campo"
          type="email"
          placeholder="Ingresa tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <h3 className="etiqueta">Contraseña</h3>

        <input
          className="campo"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="boton" onClick={iniciarSesion}>
          Iniciar sesión
        </button>

        <p className="registro">
          ¿No tienes una cuenta?{" "}
          <Link className="link-verde" to="/registro">
            Regístrate
          </Link>
        </p>
      </div>
    </>
  );
}
