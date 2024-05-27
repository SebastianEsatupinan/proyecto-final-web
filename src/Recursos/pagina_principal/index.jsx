import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function PaginaPrincipal() {
  return (
    <div className="container">
      <div className="menu-option">
        <Link to="/inicio_usuario" className="link">
          Usuario Normal
        </Link>
      </div>
      <div className="menu-option">
        <Link to="/inicio_admin" className="link">
          Administrador
        </Link>
      </div>
    </div>
  );
}

export default PaginaPrincipal;
