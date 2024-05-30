import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Componentes/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import imgSrc from '../../Componentes/img.jpg';
import './style.css';

function PaginaAdministrador() {
  const [torneos, setTorneos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [premio, setPremio] = useState('');
  const [editId, setEditId] = useState(null);
  const [mostrarInscritos, setMostrarInscritos] = useState(false);
  const [inscritos, setInscritos] = useState([]);
  const [torneoActual, setTorneoActual] = useState(null);
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

  const agregarTorneo = async () => {
    if (!nombre || !fecha || !premio) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const nuevoTorneo = { nombre, fecha, premio };
      if (editId) {
        await updateDoc(doc(db, "torneos", editId), nuevoTorneo);
        setTorneos(torneos.map(torneo => (torneo.id === editId ? { id: editId, ...nuevoTorneo } : torneo)));
        setEditId(null);
      } else {
        const docRef = await addDoc(collection(db, "torneos"), nuevoTorneo);
        setTorneos([...torneos, { id: docRef.id, ...nuevoTorneo }]);
      }
      setNombre('');
      setFecha('');
      setPremio('');
    } catch (error) {
      console.error("Error adding/editing tournament: ", error);
    }
  };

  const eliminarTorneo = async (id) => {
    try {
      await deleteDoc(doc(db, "torneos", id));
      setTorneos(torneos.filter(torneo => torneo.id !== id));
    } catch (error) {
      console.error("Error deleting tournament: ", error);
    }
  };

  const editarTorneo = (id) => {
    const torneo = torneos.find(torneo => torneo.id === id);
    setNombre(torneo.nombre);
    setFecha(torneo.fecha);
    setPremio(torneo.premio);
    setEditId(id);
  };

  const verInscritos = async (id) => {
    try {
      const inscritosQuery = query(collection(db, "inscripciones"), where("torneoId", "==", id));
      const inscritosSnapshot = await getDocs(inscritosQuery);
      const inscritosList = inscritosSnapshot.docs.map(doc => doc.data());
      setInscritos(inscritosList);
      setTorneoActual(id);
      setMostrarInscritos(true);
    } catch (error) {
      console.error("Error fetching inscritos: ", error);
    }
  };

  const cerrarPanel = () => {
    setMostrarInscritos(false);
    setInscritos([]);
    setTorneoActual(null);
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
          <button onClick={agregarTorneo}>{editId ? 'Actualizar Torneo' : 'Agregar Torneo'}</button>
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
                  <button onClick={() => verInscritos(torneo.id)}>Ver Inscritos</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {mostrarInscritos && (
        <div className="inscritos-panel">
          <div className="inscritos-content">
            <button className="cerrar-panel" onClick={cerrarPanel}>Cerrar</button>
            <h2>Inscritos en el Torneo</h2>
            {inscritos.length === 0 ? (
              <p>No hay inscritos en este torneo</p>
            ) : (
              <ul>
                {inscritos.map((inscrito, index) => (
                  <li key={index}>
                    {inscrito.nombre} {inscrito.apellidos} - {inscrito.cedula}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaAdministrador;
