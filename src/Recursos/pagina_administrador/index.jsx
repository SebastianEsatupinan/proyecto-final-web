import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Componentes/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import imgSrc from '../../Componentes/img.jpg';
import './style.css';

function PaginaAdministrador() {
  const [torneos, setTorneos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [premio, setPremio] = useState('');
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

  const agregarTorneo = async () => {
    const nuevoTorneo = { nombre, fecha, premio };
    const docRef = await addDoc(collection(db, "torneos"), nuevoTorneo);
    setTorneos([...torneos, { id: docRef.id, ...nuevoTorneo }]);
    setNombre('');
    setFecha('');
    setPremio('');
  };

  const eliminarTorneo = async (id) => {
    await deleteDoc(doc(db, "torneos", id));
    setTorneos(torneos.filter(torneo => torneo.id !== id));
  };

  const editarTorneo = (id) => {
    const torneo = torneos.find(torneo => torneo.id === id);
    setNombre(torneo.nombre);
    setFecha(torneo.fecha);
    setPremio(torneo.premio);
    eliminarTorneo(id);
  };

  return (
    <div className="admin-container">
      <div className="transparent-container">
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
            torneos.map((torneo) => (
              <div className="torneo-card" key={torneo.id}>
              <img src={imgSrc} alt="Imagen del torneo" className="torneo-image" />
              <h2>{torneo.nombre}</h2>
              <p>Fecha: {torneo.fecha}</p>
              <p>Premio: {torneo.premio}</p>
              <div className="torneo-actions">
                <button onClick={() => editarTorneo(torneo.id)}>Editar</button>
                <button onClick={() => eliminarTorneo(torneo.id)}>Eliminar</button>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PaginaAdministrador;
