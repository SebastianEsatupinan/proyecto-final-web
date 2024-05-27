import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './Recursos/pagina_principal/index';
import PaginaUsuarios from './Recursos/pagina_usuarios/index';
import PaginaAdministrador from './Recursos/pagina_administrador/index';
import InicioUser from './Recursos/Inicio_user/index';
import InicioAdmin from './Recursos/inicio_admin/index';
import PaginaRegistro from './Recursos/pagina_registro/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PaginaRegistro />} />
        <Route path="/principal" element={<PaginaPrincipal />} />
        <Route path="/usuarios" element={<PaginaUsuarios />} />
        <Route path="/admin" element={<PaginaAdministrador />} />
        <Route path="/inicio_usuario" element={<InicioUser />} />
        <Route path="/inicio_admin" element={<InicioAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
