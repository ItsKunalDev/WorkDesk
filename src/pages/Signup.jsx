import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mail, Lock, User, Sparkles, ArrowLeft } from 'lucide-react';

const Signup = () => {
  const { signup, loginWithGoogle } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setFirebaseError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setFirebaseError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseError = (code) => {
    switch (code) {
      case 'auth/email-already-in-use': return 'An account with this email already exists.';
      case 'auth/invalid-email': return 'Please enter a valid email address.';
      case 'auth/weak-password': return 'Password should be at least 6 characters.';
      default: return 'Sign up failed. Please try again.';
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setFirebaseError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Midnight Navy Radial Glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(30, 58, 138, 0.4) 0%, rgba(2,6,23,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(2,6,23,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="card" style={{ width: '100%', maxWidth: '420px', zIndex: 1, position: 'relative', padding: '3rem 2rem' }}>
        {/* Back to Home */}
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

        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Create an account</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Start managing your freelance business</p>

        {/* Firebase Error */}
        {firebaseError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#f87171', fontSize: '0.875rem' }}>
            {firebaseError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder="Alex Taylor" style={{ paddingLeft: '2.5rem', borderColor: errors.name ? '#ef4444' : 'var(--border)' }} />
            </div>
            {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</span>}
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input type="text" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="you@example.com" style={{ paddingLeft: '2.5rem', borderColor: errors.email ? '#ef4444' : 'var(--border)' }} />
            </div>
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</span>}
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} placeholder="••••••••" style={{ paddingLeft: '2.5rem', borderColor: errors.password ? '#ef4444' : 'var(--border)' }} />
            </div>
            {errors.password && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        </div>

        {/* Google Sign-Up */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', transition: 'border-color 0.2s, background 0.2s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(34,211,238,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-dark)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.1l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.5-3-11.2-7.3L6 34c3.3 6.5 9.9 10 18 10z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.2 5.2C41 35.4 44 30.1 44 24c0-1.2-.1-2.5-.4-3.5z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
