import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  const { profile, logout } = useAppContext();
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard': return 'Dashboard Overview';
      case '/projects': return 'Projects';
      case '/clients': return 'Clients';
      case '/tasks': return 'Tasks';
      case '/invoices': return 'Invoices';
      case '/profile': return 'Profile Settings';
      default: return 'Lumina';
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{getPageTitle(location.pathname)}</h2>
      </div>
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="form-control"
            style={{ paddingLeft: '2.5rem', width: '250px', background: 'rgba(2,6,23,0.5)' }} 
          />
        </div>
        <button className="btn-icon" style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <Bell size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{profile.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Freelancer</div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
            {profile.name ? profile.name.charAt(0) : '?'}
          </div>
          <button className="btn btn-secondary" onClick={logout} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
