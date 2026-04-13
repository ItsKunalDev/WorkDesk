import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Mail, Lock, Sparkles } from 'lucide-react';

const Login = () => {
  const { login, loginWithGoogle } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found': return 'No account found with this email.';
      case 'auth/wrong-password': return 'Incorrect password. Please try again.';
      case 'auth/invalid-email': return 'Please enter a valid email address.';
      case 'auth/too-many-requests': return 'Too many failed attempts. Please try again later.';
      case 'auth/invalid-credential': return 'Invalid email or password.';
      default: return 'Login failed. Please check your credentials.';
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Midnight Navy Radial Glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(30, 58, 138, 0.4) 0%, rgba(2,6,23,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(2,6,23,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
      
      <div className="card" style={{ width: '100%', maxWidth: '420px', zIndex: 1, position: 'relative', padding: '3rem 2rem' }}>
        {/* Back */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.75rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={15} /> Back
        </Link>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            <Sparkles className="text-accent" size={28} />
            <span>Lumina</span>
          </div>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Welcome back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Sign in to your dashboard</p>

        {/* Error message */}
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#f87171', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                required 
                className="form-control" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" 
                style={{ paddingLeft: '2.5rem' }} 
              />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="form-label">Password</label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                required 
                className="form-control" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ paddingLeft: '2.5rem' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              style={{ accentColor: 'var(--accent)', width: '1rem', height: '1rem', cursor: 'pointer' }} 
            />
            <label htmlFor="remember" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', transition: 'border-color 0.2s, background 0.2s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(34,211,238,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-dark)'; }}
        >
          {/* Google SVG Icon */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.1l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.5-3-11.2-7.3L6 34c3.3 6.5 9.9 10 18 10z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.2 5.2C41 35.4 44 30.1 44 24c0-1.2-.1-2.5-.4-3.5z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
