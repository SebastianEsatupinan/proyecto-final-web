import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../../Componentes/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './style.css';

const auth = getAuth(appFirebase);

function InicioUser() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    cedula: '',
    contrasena: '',
  });

  const [errorLogin, setErrorLogin] = useState('');

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, login.cedula, login.contrasena);
      alert('Inicio de sesión exitoso');
      navigate('/usuarios'); // Redirigir a la página de usuarios después del inicio de sesión
    } catch (error) {
      const errorMessage = error.message;
      setErrorLogin(errorMessage);
      console.error("Error al iniciar sesión:", errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión - Usuario</h2>
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
        {errorLogin && <p className="error">{errorLogin}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default InicioUser;
