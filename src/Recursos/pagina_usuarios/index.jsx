import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function PaginaUsuarios() {
  const [torneos, setTorneos] = useState([]);
  const navigate = useNavigate();

  // useEffect para simular la carga de datos de Firebase en el futuro
  useEffect(() => {
    // Aquí iría la función para obtener los torneos de Firebase
    // fetchTournamentsFromFirebase().then(torneos => setTorneos(torneos));
    const torneosSimulados = [
      { nombre: 'Torneo A', fecha: '01/01/2024', premio: '$1000' },
      { nombre: 'Torneo B', fecha: '15/02/2024', premio: '$1500' },
      { nombre: 'Torneo C', fecha: '30/03/2024', premio: '$2000' }, //Son Para Probar borrar al implementar fire base
    ];
    setTorneos(torneosSimulados);
  }, []);

  const inscribirseEnTorneo = (torneo) => {
    // Aquí iría la función para inscribirse en el torneo usando Firebase
    // enrollInTournament(torneo.id);
    alert(`Inscrito en el torneo: ${torneo.nombre}`);
  };

  return (
    <div className="user-container">
      <button className="back-button" onClick={() => navigate('/')}>Retroceder</button>
      <h1>Ver Torneos</h1>
      <div className="torneos-container">
        {torneos.length === 0 ? (
          <p className="no-torneos">No hay torneos disponibles, vuelve más tarde</p>
        ) : (
          torneos.map((torneo, index) => (
            <div className="torneo-card" key={index}>
              <h2>{torneo.nombre}</h2>
              <p>Fecha: {torneo.fecha}</p>
              <p>Premio: {torneo.premio}</p>
              <div className="torneo-actions">
                <button onClick={() => inscribirseEnTorneo(torneo)}>Inscribirse</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PaginaUsuarios;
