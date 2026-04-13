import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Clients = () => {
  const { clients, addClient, editClient, deleteClient } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: ''
  });

  const openModal = (client = null) => {
    if (client) {
      setFormData(client);
      setEditingId(client.id);
    } else {
      setFormData({ name: '', company: '', email: '' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      editClient(editingId, formData);
    } else {
      addClient(formData);
    }
    closeModal();
  };

  return (
    <div>
      <div className="action-bar flex-between">
        <h1 className="page-title" style={{ margin: 0 }}>Clients</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={18} /> Add Client
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Company</th>
                <th>Email</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: '500' }}>{c.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.company || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.email}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-icon" onClick={() => openModal(c)} style={{ color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon" onClick={() => deleteClient(c.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No clients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Client' : 'Add Client'}</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input required type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-control" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="e.g. Acme Corp" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input required type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="e.g. contact@acmecorp.com" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Client'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
