import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Asegúrate de que tu archivo de estilos esté importado si tienes uno.

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
