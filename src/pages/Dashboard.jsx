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
  const { projects, clients, tasks, invoices, profile } = useAppContext();

  const metrics = [
    { title: 'Total Projects', value: projects.length, icon: <FolderKanban size={20} />, change: '+12%', isPositive: true, link: '/projects' },
    { title: 'Total Clients', value: clients.length, icon: <Users size={20} />, change: '+5%', isPositive: true, link: '/clients' },
    { title: 'Total Tasks', value: tasks.length, icon: <CheckSquare size={20} />, change: '-2%', isPositive: false, link: '/tasks' },
    { title: 'Total Invoices', value: invoices.length, icon: <Receipt size={20} />, change: '+8%', isPositive: true, link: '/invoices' },
  ];

  return (
    <div>
      <div className="animate-fade-in-up" style={{ marginBottom: '2.5rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #ffffff, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>Welcome back, {profile?.name || 'User'}!</h1>
        <p className="text-secondary" style={{ fontSize: '1rem' }}>Here's what's happening with your business today.</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((m, i) => (
          <div key={i} className={`card metric-card animate-fade-in-up delay-${(i+1)*100}`} style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div className="metric-icon" style={{ background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.15))', color: 'var(--accent)', padding: '0.6rem', borderRadius: '0.75rem', margin: 0, boxShadow: 'inset 0 0 12px rgba(34, 211, 238, 0.1)' }}>
                {m.icon}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '1rem', background: m.isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: m.isPositive ? '#10b981' : '#ef4444' }}>
                {m.change}
              </div>
            </div>
            <div>
              <div className="metric-title" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: '500' }}>{m.title}</div>
              <div className="metric-value" style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>{m.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid-top">
        <div className="card animate-fade-in-up delay-300">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>Revenue Overview</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Monthly earnings performance</p>
            </div>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '0.25rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
              <button style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: '0.25rem', fontWeight: '600' }}>6M</button>
              <button style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: 'transparent', color: 'var(--text-secondary)', border: 'none' }}>1Y</button>
              <button style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: 'transparent', color: 'var(--text-secondary)', border: 'none' }}>ALL</button>
            </div>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderColor: 'var(--border)', borderRadius: '0.5rem', color: '#fff' }}
                  itemStyle={{ color: 'var(--accent)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22D3EE" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card animate-fade-in-up delay-400">
          <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>Quick Actions</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Fast-track your workflow</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Add Project', icon: <FolderKanban size={18} />, link: '/projects' },
              { label: 'Add Client', icon: <Users size={18} />, link: '/clients' },
              { label: 'Add Task', icon: <CheckSquare size={18} />, link: '/tasks' },
              { label: 'Create Invoice', icon: <Receipt size={18} />, link: '/invoices' },
            ].map((action, i) => (
              <Link key={i} to={action.link} className="quick-action-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem', transition: 'all 0.2s', border: '1px solid transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'transparent'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(34, 211, 238, 0.1)', color: 'var(--accent)', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
                    {action.icon}
                  </div>
                  <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>{action.label}</span>
                </div>
                <ArrowUpRight size={16} color="var(--text-secondary)" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid-bottom">
        <div className="card animate-fade-in-up delay-500">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>Recent Projects</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Your latest active work</p>
            </div>
            <Link to="/projects" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: '500' }}>View All →</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 3).map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: '500' }}>{p.name}</td>
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

        <div className="card animate-fade-in-up delay-600">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>Pending Tasks</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Upcoming deadlines</p>
            </div>
            <Link to="/tasks" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: '500' }}>View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.filter(t => t.status !== 'Done').slice(0, 3).map((task, i) => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: i !== Math.min(3, tasks.filter(t => t.status !== 'Done').length) - 1 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{task.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Due: {task.dueDate}</div>
                </div>
                <span className={`badge badge-todo`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
