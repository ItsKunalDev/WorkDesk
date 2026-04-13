import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FolderKanban, Users, CheckSquare, Receipt, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const chartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const Dashboard = () => {
  const { projects, clients, tasks, invoices } = useAppContext();

  const metrics = [
    { title: 'Total Projects', value: projects.length, icon: <FolderKanban size={24} />, link: '/projects' },
    { title: 'Total Clients', value: clients.length, icon: <Users size={24} />, link: '/clients' },
    { title: 'Active Tasks', value: tasks.filter(t => t.status !== 'Done').length, icon: <CheckSquare size={24} />, link: '/tasks' },
    { title: 'Total Invoices', value: invoices.length, icon: <Receipt size={24} />, link: '/invoices' },
  ];

  return (
    <div>
      <div className="action-bar flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="text-primary" style={{ fontSize: '1.5rem' }}>Welcome back!</h1>
          <p className="text-secondary">Here's your freelance business overview.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/projects"><button className="btn btn-primary">Add Project</button></Link>
          <Link to="/invoices"><button className="btn btn-secondary">Create Invoice</button></Link>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((m, i) => (
          <div key={i} className="card metric-card">
            <div className="metric-icon">{m.icon}</div>
            <div>
              <div className="metric-title">{m.title}</div>
              <div className="metric-value">{m.value}</div>
            </div>
            <Link to={m.link} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--accent)', fontWeight: '500' }}>
              View Details <ArrowUpRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Revenue Overview</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', borderRadius: '0.5rem' }}
                  itemStyle={{ color: 'var(--accent)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22D3EE" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Tasks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{task.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Due: {task.dueDate}</div>
                </div>
                <span className={`badge ${task.status === 'Done' ? 'badge-done' : 'badge-todo'}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Projects</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 4).map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '500' }}>{p.name}</td>
                  <td>{p.client}</td>
                  <td>{p.deadline}</td>
                  <td>
                    <span className={`badge ${p.status === 'Completed' ? 'badge-done' : 'badge-active'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
