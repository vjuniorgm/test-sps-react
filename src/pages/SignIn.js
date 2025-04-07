import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const userService = new UserService();

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.");
      return;
    }
  
    try {
      const response = await userService.login({ email, password });
      console.warn(response)
      if (response && response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError("No se recibió token del servidor.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Iniciar Sesión</h2>
  
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error: </strong>{error}
        </div>
      )}
  
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu email"
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
  
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
  
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            fontSize: '16px',
            marginTop: '20px',
            transition: 'background-color 0.3s ease'
          }}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
  
}

export default Login;
