import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Projects = () => {
  const { projects, clients, addProject, editProject, deleteProject } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    deadline: '',
    status: 'Active'
  });

  const openModal = (project = null) => {
    if (project) {
      setFormData(project);
      setEditingId(project.id);
    } else {
      setFormData({ name: '', client: clients[0]?.name || '', deadline: '', status: 'Active' });
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
      editProject(editingId, formData);
    } else {
      addProject(formData);
    }
    closeModal();
  };

  return (
    <div>
      <div className="action-bar flex-between">
        <h1 className="page-title" style={{ margin: 0 }}>Projects</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Deadline</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '500' }}>{p.name}</td>
                  <td>{p.client}</td>
                  <td>{p.deadline}</td>
                  <td>
                    <span className={`badge ${p.status === 'Completed' ? 'badge-done' : 'badge-active'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-icon" onClick={() => openModal(p)} style={{ color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon" onClick={() => deleteProject(p.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No projects found.</td>
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
              <h2>{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input required type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Website Redesign" />
              </div>
              <div className="form-group">
                <label className="form-label">Client</label>
                <select required className="form-control" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})}>
                  <option value="">Select a client</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input required type="date" className="form-control" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} style={{ colorScheme: 'dark' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
