import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Status from './pages/Status';
import './App.css';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';

export const url: string = (import.meta as any).env.VITE_API_URL;

function App() {
  return (
    <Router>
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
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
