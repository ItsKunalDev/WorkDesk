import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Shield, LayoutDashboard, LineChart } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)', overflowX: 'hidden' }}>

      {/* Background Glow Layer - Fixed behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse at top, rgba(34, 211, 238, 0.12) 0%, transparent 65%)' }}></div>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 60%)', filter: 'blur(40px)' }}></div>
      </div>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 8%', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          <Sparkles size={24} style={{ color: 'var(--accent)' }} />
          <span>Lumina</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/login" style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.9rem', transition: 'color 0.2s' }}>Log in</Link>
          <Link to="/signup" className="btn btn-primary" style={{ fontSize: '0.875rem', boxShadow: '0 4px 15px rgba(34, 211, 238, 0.25)' }}>Sign Up Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <section style={{ padding: '5rem 8% 5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(34, 211, 238, 0.08)', border: '1px solid rgba(34, 211, 238, 0.25)', borderRadius: '999px', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '600', marginBottom: '2rem' }}>
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}></span>
            Lumina 2.0 is now live
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.02em', maxWidth: '800px' }}>
            Success is yours{' '}
            <span style={{ background: 'linear-gradient(135deg, #22D3EE, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              through hard work.
            </span>
          </h1>

          {/* Description */}
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.7' }}>
            The all-in-one freelance dashboard to manage clients, track tasks, and handle invoices from one beautifully designed workspace.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem', borderRadius: '0.75rem', gap: '0.5rem', display: 'inline-flex', alignItems: 'center', boxShadow: '0 10px 30px rgba(34, 211, 238, 0.25)' }}>
              Start for free <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem', borderRadius: '0.75rem' }}>
              Explore Features
            </a>
          </div>


        </section>

        {/* Dashboard Mockup */}
        <section style={{ padding: '0 8% 6rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '960px', borderRadius: '1.25rem', border: '1px solid var(--border)', background: 'var(--card-bg)', boxShadow: '0 30px 60px -10px rgba(0,0,0,0.6), 0 0 40px rgba(34,211,238,0.05)', overflow: 'hidden' }}>
            {/* Mock Top Bar */}
            <div style={{ height: '44px', background: 'rgba(2,6,23,0.7)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.25rem', gap: '0.5rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
              <div style={{ marginLeft: '0.75rem', height: '18px', width: '200px', background: 'var(--border)', borderRadius: '4px', opacity: 0.5 }}></div>
            </div>
            {/* Mock Body */}
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: '340px' }}>
              {/* Sidebar */}
              <div style={{ borderRight: '1px solid var(--border)', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(2,6,23,0.3)' }}>
                {['Dashboard', 'Projects', 'Clients', 'Tasks', 'Invoices'].map((item, i) => (
                  <div key={i} style={{ height: '20px', width: i === 0 ? '80%' : `${50 + (i * 10) % 40}%`, background: i === 0 ? 'rgba(34, 211, 238, 0.25)' : 'var(--border)', borderRadius: '4px', opacity: i === 0 ? 1 : 0.6 }}></div>
                ))}
              </div>
              {/* Content */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <div style={{ height: '80px', borderRadius: '0.5rem', background: 'linear-gradient(135deg, rgba(34,211,238,0.12), transparent)', border: '1px solid var(--border)' }}></div>
                  <div style={{ height: '80px', borderRadius: '0.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), transparent)', border: '1px solid var(--border)' }}></div>
                  <div style={{ height: '80px', borderRadius: '0.5rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.12), transparent)', border: '1px solid var(--border)' }}></div>
                </div>
                <div style={{ flex: 1, borderRadius: '0.5rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2,6,23,0.3)' }}>
                  <LineChart size={56} style={{ color: 'var(--border)', opacity: 0.4 }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" style={{ padding: '5rem 8%', borderTop: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.4)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: '700', textAlign: 'center', marginBottom: '3.5rem', color: 'var(--text-primary)' }}>
              Everything you need,{' '}
              <span style={{ color: 'var(--accent)' }}>at your fingertips.</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: <LayoutDashboard size={22} />, label: 'Unified Overview', desc: 'Track projects, invoices, and clients in one stunning summary dashboard.', color: 'var(--accent)', bg: 'rgba(34, 211, 238, 0.08)' },
                { icon: <Zap size={22} />, label: 'Lightning Fast', desc: 'Optimized workflows so you spend less time managing and more doing.', color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
                { icon: <Shield size={22} />, label: 'Secure & Private', desc: 'Your data is sandboxed per user — financial and project metrics stay safe.', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' },
              ].map((f, i) => (
                <div key={i} className="card" style={{ padding: '2rem' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '0.875rem', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: '1.25rem' }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{f.label}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.9rem' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '1.75rem 8%', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', fontSize: '0.8rem', background: 'var(--card-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'var(--text-primary)' }}>
          <Sparkles size={16} style={{ color: 'var(--accent)' }} /> Lumina
        </div>
        <span>© 2026 Lumina OS. Built with the Cyber-Slate design system.</span>
      </footer>
    </div>
  );
};

export default Home;
