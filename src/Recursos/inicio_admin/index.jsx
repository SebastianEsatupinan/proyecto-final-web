import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function InicioAdmin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    cedula: '',
    contrasena: '',
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // Aquí iría la función para autenticar el administrador en Firebase
    // authenticateAdmin(login);
    alert('Inicio de sesión exitoso');
    navigate('/admin'); // Redirigir a la página de administración después del inicio de sesión
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión - Administrador</h2>
      <form onSubmit={handleSubmitLogin}>
        <input
          type="text"
          name="cedula"
          placeholder="Cédula Ciudadana"
          value={login.cedula}
          onChange={handleChangeLogin}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={login.contrasena}
          onChange={handleChangeLogin}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default InicioAdmin;
