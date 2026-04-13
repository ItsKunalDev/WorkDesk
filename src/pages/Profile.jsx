import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Mail, Shield, Save } from 'lucide-react';

const Profile = () => {
  const { profile, updateProfile } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email
  });

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="action-bar flex-between" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Profile Settings</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        <div className="card" style={{ height: 'fit-content', textAlign: 'center' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--accent), #3b82f6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 25px rgba(34, 211, 238, 0.4)'
          }}>
            {profile.name.charAt(0)}
          </div>
          <h2 style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>{profile.name}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{profile.email}</p>
          <span className="badge badge-active" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            <Shield size={14} style={{ marginRight: '0.25rem' }} /> Administrator
          </span>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            Personal Information
          </h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Display Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  required
                  className="form-control" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  required
                  className="form-control" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <div>
                {message && <span style={{ color: '#34d399', fontSize: '0.875rem', fontWeight: '500' }}>{message}</span>}
              </div>
              <button type="submit" className="btn btn-primary">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
