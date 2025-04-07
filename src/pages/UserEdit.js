import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const userService = new UserService();

export async function userLoader({ params }) {
  try {
    const response = await userService.get(params.userId);
    const user = response.data;
    return { user };
  } catch (error) {
    console.error("Error al cargar el usuario:", error);
    throw new Response("Usuario no encontrado", { status: 404 });
  }
}

function EditUser() {
    const navigate = useNavigate();
  const { user } = useLoaderData();

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [type, setType] = useState(user.type || "");
  const [password, setPassword] = useState(user.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, type, password };

    try {
      await userService.update(user.id, updatedUser);
      navigate("/users");
    } catch (err) {
      console.error("Error al actualizar el usuario:", err.response.data.message);
      navigate("/");
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edición de Usuario</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tipo:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default EditUser;
