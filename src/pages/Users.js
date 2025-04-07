import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const userService = new UserService();

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await userService.list();
      setUsers(response.data || []);
    } catch (err) {
      setError("Error al obtener usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este usuario?")) return;
    try {
      await userService.delete(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Error al eliminar usuario");
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/${id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Usuários</h1>
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => navigate("/users/add")}
        >
          + Agregar Usuario
        </button>
      </div>
  
      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      {!loading && users.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nombre</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tipo</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.type}</td>
                <td style={{ textAlign: 'center', padding: '8px' }}>
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      marginRight: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEdit(user.id)}
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No hay usuarios registrados</p>
      )}
      {/* Botón para cerrar sesión */}
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={() => {
          // Eliminar el token de la sesión
          sessionStorage.removeItem('token');
          // Redirigir al usuario a la página de login
          navigate('/login');
        }}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Cerrar sesión
      </button>
    </div>
    </div>
    
  );
  
}

export default Users;
