import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Componentes/firebase'; // Asegúrate de que la ruta es correcta
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import './style.css';

 

function PaginaRegistro() {
  const [tipoUsuario, setTipoUsuario] = useState('Usuario');
  const [registro, setRegistro] = useState({
    correo: '',
    cedula: '',
    nombre: '',
    apellidos: '',
    contrasena: '',
    confirmarContrasena: '',
  });

  const [errorContrasena, setErrorContrasena] = useState('');
  const [errorRegistro, setErrorRegistro] = useState('');

  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
  };

  const handleSubmitRegistro = (e) => {
    e.preventDefault();
    if (registro.contrasena !== registro.confirmarContrasena) {
      setErrorContrasena('Las contraseñas no coinciden');
    } else {
      setErrorContrasena('');
      createUserWithEmailAndPassword(auth, registro.correo, registro.contrasena)
        .then((userCredential) => {
          // Registro exitoso
          const user = userCredential.user;
          console.log("Registro exitoso:", user);
          alert('Registro exitoso');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorRegistro(errorMessage);
        });
    }
  };

  return (
    <div className="registro-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmitRegistro}>
        <label>
          Tipo de Usuario:
          <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
        </label>
        <input
          type="email"
          name="correo"
          placeholder="Correo Electrónico"
          value={registro.correo}
          onChange={handleChangeRegistro}
          required
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={registro.cedula}
          onChange={handleChangeRegistro}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={registro.nombre}
          onChange={handleChangeRegistro}
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={registro.apellidos}
          onChange={handleChangeRegistro}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Ingresar Contraseña"
          value={registro.contrasena}
          onChange={handleChangeRegistro}
          required
        />
        <input
          type="password"
          name="confirmarContrasena"
          placeholder="Confirmar Contraseña"
          value={registro.confirmarContrasena}
          onChange={handleChangeRegistro}
          required
        />
        {errorContrasena && <p className="error">{errorContrasena}</p>}
        {errorRegistro && <p className="error">{errorRegistro}</p>}
        <button type="submit">Registrarse</button>
      </form>
      <Link to="/principal" className="link-button">Ya tengo una cuenta</Link>
    </div>
  );
}

export default PaginaRegistro;
