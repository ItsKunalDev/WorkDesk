import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
import Invoices from './pages/Invoices';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private/Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
