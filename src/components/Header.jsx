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
        {location.pathname !== '/dashboard' && <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{getPageTitle(location.pathname)}</h2>}
      </div>
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="form-control"
            style={{ paddingLeft: '2.5rem', paddingRight: '4rem', width: '320px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '0.75rem', fontSize: '0.875rem', color: 'var(--text-primary)', transition: 'all 0.3s ease' }} 
            onFocus={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)'; }}
            onBlur={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)'; }}
          />
          <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.25rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.5px' }}>⌘K</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '1rem' }}>
          <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s', padding: '0.25rem' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid var(--bg-dark)' }}></span>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: '700', cursor: 'pointer', border: '1px solid rgba(34, 211, 238, 0.3)', boxShadow: 'inset 0 0 10px rgba(34, 211, 238, 0.1), 0 4px 10px rgba(0,0,0,0.2)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }} onClick={logout} title="Logout" onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(34, 211, 238, 0.1), 0 8px 20px rgba(34, 211, 238, 0.2)'; e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(34, 211, 238, 0.1), 0 4px 10px rgba(0,0,0,0.2)'; e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)'; }}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
