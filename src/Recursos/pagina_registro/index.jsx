import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appFirebase from '../../Componentes/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './style.css';

const auth = getAuth(appFirebase);

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
  const navigate = useNavigate();

  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
  };

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();

    if (registro.contrasena !== registro.confirmarContrasena) {
      setErrorContrasena('Las contraseñas no coinciden');
      return;
    } else {
      setErrorContrasena('');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registro.correo, registro.contrasena);
      const user = userCredential.user;
      console.log("Registro exitoso:", user);
      alert('Registro exitoso');
      navigate('/principal');
    } catch (error) {
      const errorMessage = error.message;
      setErrorRegistro(errorMessage);
      console.error("Error al registrar:", errorMessage);
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
