import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Trash2 } from 'lucide-react';

const Invoices = () => {
  const { invoices, addInvoice, deleteInvoice } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    status: 'Unpaid',
    date: ''
  });

  const openModal = () => {
    setFormData({ title: `INV-2026-0${invoices.length + 1}`, amount: '', status: 'Unpaid', date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInvoice({ ...formData, amount: parseFloat(formData.amount) });
    closeModal();
  };

  return (
    <div>
      <div className="action-bar flex-between">
        <h1 className="page-title" style={{ margin: 0 }}>Invoices</h1>
        <button className="btn btn-primary" onClick={openModal}>
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: '500' }}>{inv.title}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inv.date}</td>
                  <td style={{ fontWeight: '600' }}>${inv.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${inv.status === 'Paid' ? 'badge-done' : 'badge-unpaid'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-icon" onClick={() => deleteInvoice(inv.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No invoices found.</td>
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
              <h2>Create Invoice</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Invoice Number</label>
                <input required type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Amount ($)</label>
                <input required type="number" min="0" step="0.01" className="form-control" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input required type="date" className="form-control" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ colorScheme: 'dark' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem', fontStyle: 'italic' }}>Note: This is for demonstration purposes only. Payments are not processed.</p>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
