import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Componentes/firebase';
import { collection, getDocs } from 'firebase/firestore';
import imgSrc from '../../Componentes/img.jpg'; // Asegúrate de que la ruta de la imagen sea correcta
import './style.css';

function PaginaUsuarios() {
  const [torneos, setTorneos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTorneos = async () => {
      const torneosCollection = collection(db, "torneos");
      const torneosSnapshot = await getDocs(torneosCollection);
      const torneosList = torneosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTorneos(torneosList);
    };

    fetchTorneos();
  }, []);

  const inscribirseEnTorneo = (torneo) => {
    // Aquí iría la función para inscribirse en el torneo usando Firebase
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
          torneos.map((torneo) => (
            <div className="torneo-card" key={torneo.id}>
              <img src={imgSrc} alt="Imagen del torneo" className="torneo-image" />
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
