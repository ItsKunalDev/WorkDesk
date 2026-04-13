import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, CheckSquare, Receipt, Settings, Sparkles } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/projects', icon: <FolderKanban size={20} /> },
    { name: 'Clients', path: '/clients', icon: <Users size={20} /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Invoices', path: '/invoices', icon: <Receipt size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Sparkles className="text-accent" size={24} />
        <span>Lumina</span>
      </div>
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className="sidebar-nav" style={{ flex: 'none', marginTop: 'auto' }}>
        <NavLink
            to="/profile"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Settings size={20} />
            <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
