import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Status from './pages/Status';
import './App.css';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Button } from './components/ui/button';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />*
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function AppLayout() {
  return (
    <>
      <nav className="p-4 bg-slate-800 text-white flex justify-center gap-6">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        <Link to="/status" className="hover:underline">
          Statut API
        </Link>
        <Link to="/users" className="hover:underline">
          Utilisateurs
        </Link>
        <Button
          onClick={() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }}
          className="hover:underline"
        >
          Disconnect
        </Button>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
