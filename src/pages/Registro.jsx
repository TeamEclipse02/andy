import { useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../supabaseClient"; 
import "../assets/auth.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const registrarUsuario = async () => {
   
    if (!nombre || !correo || !password || !confirmar) {
      alert("Completa todos los campos");
      return;
    }

   
    if (password !== confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const emailLimpio = correo.trim();

    // 3. Enviar a Supabase Auth (Crea la cuenta de acceso)
    const { data, error } = await supabase.auth.signUp({
      email: emailLimpio,
      password: password,
      options: {
        data: {
          nombre: nombre.trim(),
        },
      },
    });

    if (error) {
      console.log("ERROR COMPLETO:", error);
      alert("Error en registro: " + error.message);
      return;
    }

    // 4. ¡NUEVO PASO! Insertar los datos en tu tabla "Usuario" de la base de datos
    // Separamos el nombre completo por si tu tabla pide "nombre" y "apellido" por separado.
    const partesNombre = nombre.trim().split(" ");
    const primerNombre = partesNombre[0] || "";
    const apellidoDetectado = partesNombre.slice(1).join(" ") || "No especificado";

    const { error: dbError } = await supabase
      .from('Usuario') // Nombre exacto de tu tabla en Supabase
      .insert([
        {
          nombre: primerNombre,
          apellido: apellidoDetectado,
          correo: emailLimpio
        }
      ]);

    if (dbError) {
      console.log("ERROR EN TABLA USUARIO:", dbError);
      alert("Se creó la cuenta, pero hubo un error al guardar en la tabla Usuario.");
      return;
    }

    // 5. Éxito total
    console.log("USUARIO CREADO COMPLETAMENTE:", data);
    alert("Usuario registrado correctamente en la Base de Datos ✔");
    
    // Limpiar campos
    setNombre("");
    setCorreo("");
    setPassword("");
    setConfirmar("");
  };

  return (
    <>
      <div className="header">
        <h1 className="titulo-barra-registro">¡Regístrate!</h1>
      </div>

      <div className="login-container">
        <h3 className="etiqueta-centro">Nombre completo</h3>
        <input
          className="campo-registro"
          type="text"
          placeholder="Ingresa tu nombre y apellido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <h3 className="etiqueta-centro">Correo electrónico</h3>
        <input
          className="campo-registro"
          type="email"
          placeholder="Ingresa tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <h3 className="etiqueta-centro">Contraseña</h3>
        <input
          className="campo-registro"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h3 className="etiqueta-centro">Confirmar contraseña</h3>
        <input
          className="campo-registro"
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />

        <button className="boton" onClick={registrarUsuario}>
          Registrarse
        </button>

        <p className="registro">
          ¿Ya tienes una cuenta?{" "}
          <Link className="link-verde" to="/">
            Inicia sesión
          </Link>
        </p>
      </div>
    </>
  );
}