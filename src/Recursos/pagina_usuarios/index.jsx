import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Componentes/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import imgSrc from '../../Componentes/img.jpg';
import './style.css';

const auth = getAuth();

function PaginaUsuarios() {
  const [torneos, setTorneos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const torneosCollection = collection(db, "torneos");
        const torneosSnapshot = await getDocs(torneosCollection);
        const torneosList = torneosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTorneos(torneosList);
      } catch (error) {
        console.error("Error fetching tournaments: ", error);
      }
    };

    fetchTorneos();
  }, []);

  const inscribirseEnTorneo = async (torneo) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Debes estar registrado para inscribirte en un torneo");
      navigate('/registro');
      return;
    }

    // Obtener la información del usuario desde Firestore
    const usuariosCollection = collection(db, 'usuarios');
    const usuariosSnapshot = await getDocs(usuariosCollection);
    const usuarioData = usuariosSnapshot.docs.find(doc => doc.data().uid === user.uid)?.data();

    if (!usuarioData) {
      alert("No se pudo encontrar la información del usuario");
      return;
    }

    try {
      await addDoc(collection(db, 'inscripciones'), {
        torneoId: torneo.id,
        usuarioId: user.uid,
        nombre: usuarioData.nombre,
        apellidos: usuarioData.apellidos,
        cedula: usuarioData.cedula,
        correo: usuarioData.correo,
      });

      alert(`Inscrito en el torneo: ${torneo.nombre}`);
    } catch (error) {
      console.error("Error al inscribirse en el torneo:", error);
    }
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
