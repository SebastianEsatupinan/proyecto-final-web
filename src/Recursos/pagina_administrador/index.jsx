import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function PaginaAdministrador() {
  // Agregar un torneo de ejemplo al estado inicial
  const [torneos, setTorneos] = useState([
    { nombre: 'Torneo Ejemplo', fecha: '01/01/2024', premio: '$1000' }
  ]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [premio, setPremio] = useState('');
  const navigate = useNavigate();

  const agregarTorneo = () => {
    const nuevoTorneo = { nombre, fecha, premio };
    setTorneos([...torneos, nuevoTorneo]);
    setNombre('');
    setFecha('');
    setPremio('');

    // Aquí iría la función para agregar un torneo a Firebase
    // addTournamentToFirebase(nuevoTorneo);
  };

  const eliminarTorneo = (index) => {
    const nuevosTorneos = torneos.filter((_, i) => i !== index);
    setTorneos(nuevosTorneos);

    // Aquí iría la función para eliminar un torneo de Firebase
    // deleteTournamentFromFirebase(torneos[index].id);
  };

  const editarTorneo = (index) => {
    const torneo = torneos[index];
    setNombre(torneo.nombre);
    setFecha(torneo.fecha);
    setPremio(torneo.premio);
    eliminarTorneo(index);

    // Aquí iría la función para actualizar un torneo en Firebase
    // updateTournamentInFirebase(torneo.id, { nombre, fecha, premio });
  };

  return (
    <div className="admin-container">
      <button className="back-button" onClick={() => navigate('/')}>Retroceder</button>
      <h1>Administrar Torneos</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Nombre del Torneo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fecha del Torneo (Día/Mes/Año)"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <input
          type="text"
          placeholder="Premio del Torneo"
          value={premio}
          onChange={(e) => setPremio(e.target.value)}
        />
        <button onClick={agregarTorneo}>Agregar Torneo</button>
      </div>
      <div className="torneos-container">
        {torneos.length === 0 ? (
          <p className="no-torneos">No hay torneos creados</p>
        ) : (
          torneos.map((torneo, index) => (
            <div className="torneo-card" key={index}>
              <h2>{torneo.nombre}</h2>
              <p>Fecha: {torneo.fecha}</p>
              <p>Premio: {torneo.premio}</p>
              <div className="torneo-actions">
                <button onClick={() => editarTorneo(index)}>Editar</button>
                <button onClick={() => eliminarTorneo(index)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PaginaAdministrador;
