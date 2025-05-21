import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './css/Main.css';
import Main from './pages/Main';
import Geografia from './pages/Materia/Geografia';
import Historia from './pages/Materia/Historia';
import Filosofia from './pages/Materia/Filosofia';
import Sociologia from './pages/Materia/Sociologia';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [materiaAtual, setMateriaAtual] = useState(null);

  const navegarParaMateria = (materia) => {
    setMateriaAtual(materia.nome);
  };

  const voltarParaMain = () => {
    setMateriaAtual(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Header voltarParaMain={voltarParaMain} navegarParaMateria={navegarParaMateria} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/main" /> : <Login onLogin={handleLogin} />} />
          <Route path="/main" element={isAuthenticated ? <Main navegarParaMateria={navegarParaMateria} /> : <Navigate to="/" />} />
          <Route path="/materia/geografia" element={isAuthenticated ? <Geografia voltarParaMain={voltarParaMain} /> : <Navigate to="/" />} />
          <Route path="/materia/historia" element={isAuthenticated ? <Historia voltarParaMain={voltarParaMain} /> : <Navigate to="/" />} />
          <Route path="/materia/filosofia" element={isAuthenticated ? <Filosofia voltarParaMain={voltarParaMain} /> : <Navigate to="/" />} />
          <Route path="/materia/sociologia" element={isAuthenticated ? <Sociologia voltarParaMain={voltarParaMain} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;