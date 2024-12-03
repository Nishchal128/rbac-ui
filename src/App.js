import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement.js';
import RoleManagement from './pages/RoleManagement';
import './App.css';

function App() {
  return (
    <Router>
      <header className="header">
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/users">User Management</Link>
          <Link to="/roles">Role Management</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
