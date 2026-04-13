import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Tasks = () => {
  const { tasks, addTask, editTask, deleteTask } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    status: 'To Do',
    dueDate: ''
  });

  const openModal = (task = null) => {
    if (task) {
      setFormData(task);
      setEditingId(task.id);
    } else {
      setFormData({ title: '', status: 'To Do', dueDate: '' });
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
      editTask(editingId, formData);
    } else {
      addTask(formData);
    }
    closeModal();
  };

  const toggleStatus = (task) => {
    editTask(task.id, { ...task, status: task.status === 'Done' ? 'To Do' : 'Done' });
  };

  return (
    <div>
      <div className="action-bar flex-between">
        <h1 className="page-title" style={{ margin: 0 }}>Tasks</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={18} /> Add Task
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="checkbox" 
                  checked={t.status === 'Done'} 
                  onChange={() => toggleStatus(t)}
                  style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '500', color: t.status === 'Done' ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: t.status === 'Done' ? 'line-through' : 'none' }}>
                    {t.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Due: {t.dueDate}</div>
                </div>
              </div>
              <div>
                <button className="btn-icon" onClick={() => openModal(t)} style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                  <Edit2 size={16} />
                </button>
                <button className="btn-icon" onClick={() => deleteTask(t.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No tasks found.</div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Task' : 'Add Task'}</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input required type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Update logo" />
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input required type="date" className="form-control" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} style={{ colorScheme: 'dark' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="To Do">To Do</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
