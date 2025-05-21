import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
  const [user, setUser] = useState(null);
  const [materiaAtual, setMateriaAtual] = useState(null);

  useEffect(() => {
    // Verificar autenticação ao carregar o app
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/check', {
          credentials: 'include' // Importante para enviar o cookie
        });
        const data = await response.json();
        
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        credentials: 'include' // Importante para enviar o cookie
      });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Componente wrapper para as páginas autenticadas
  const AuthenticatedApp = () => {
    const navigate = useNavigate();

    const navegarParaMateria = (materia) => {
      setMateriaAtual(materia.nome);
      const nomeNormalizado = materia.nome
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      navigate(`/materia/${nomeNormalizado}`);
    };

    const voltarParaMain = () => {
      setMateriaAtual(null);
      navigate('/main');
    };

    return (
      <>
        <Header 
          voltarParaMain={voltarParaMain}
          navegarParaMateria={navegarParaMateria}
          onLogout={handleLogout}
          user={user}
        />
        
        <Routes>
          <Route path="/main" element={<Main navegarParaMateria={navegarParaMateria} />} />
          <Route path="/materia/geografia" element={<Geografia voltarParaMain={voltarParaMain} />} />
          <Route path="/materia/historia" element={<Historia voltarParaMain={voltarParaMain} />} />
          <Route path="/materia/filosofia" element={<Filosofia voltarParaMain={voltarParaMain} />} />
          <Route path="/materia/sociologia" element={<Sociologia voltarParaMain={voltarParaMain} />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/main" replace /> : <Login onLogin={handleLogin} />} />
          <Route path="/*" element={isAuthenticated ? <AuthenticatedApp /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;