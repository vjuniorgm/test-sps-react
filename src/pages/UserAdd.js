import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";


const userService = new UserService();

function UserAdd() {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newUser = { name, email, type, password };
      await userService.create(newUser);

      navigate("/users");
    } catch (err) {
      setError("Error al agregar el usuario.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Agregar Nuevo Usuario</h2>
  
      {/* Mostrar mensaje de error */}
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
  
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
  
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
  
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Tipo:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            style={{
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Seleccionar tipo</option>
            <option value="admin">Admin</option>
            <option value="normal">Normal</option>
          </select>
        </div>
  
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
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
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            fontSize: '16px',
            marginTop: '20px'
          }}
        >
          Guardar
        </button>
      </form>
    </div>
  );
  
}

export default UserAdd;
