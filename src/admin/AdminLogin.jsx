import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiSend } from '../lib/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@ctr.org');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiSend('/auth/login', 'POST', { email, password });
      navigate('/admin');
    } catch (err) {
      const message = String(err.message || '');
      setError(
        /failed to fetch|network|econnrefused|502|504/i.test(message)
          ? 'The CMS API is not running. Start the site with npm run dev, then try again.'
          : message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        <div className="mb-8">
          <img
            src="/uploads/rdc-logo.png?v=2"
            alt="CTR"
            className="w-full h-auto object-contain mx-auto"
          />
        </div>
        {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
        <label className="block text-sm font-medium text-ink-800 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-navy-500"
          required
        />
        <label className="block text-sm font-medium text-ink-800 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-navy-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-navy-800 text-white font-semibold hover:bg-navy-700"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <Link to="/" className="block text-center text-sm text-ink-500 mt-4 hover:text-ink-800">
          Back to website
        </Link>
      </form>
    </div>
  );
}
