import { useState } from 'react';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setloading(true);
      const response = await api.post( '/auth/login',{ email, password });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'ADMIN') window.location.href = '/admin';
      else if (user.role === 'MENTOR') window.location.href = '/mentor/dashboard';
      else if (user.role === 'MENTEE') window.location.href = '/mentee/dashboard';
      else window.location.href = '/dashboard';
    } catch (err: unknown) {
      const error = err as {response?: {data?: {message?: string}}};
      setError(error.response?.data?.message || 'Login failed');
    } finally{
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 text-gray-800">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" disabled={loading}
        >
          {loading ? "Processing" : "Registered"} Login
        </button>

        <p className="text-center text-sm mt-4 text-gray-700">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>

  );

};

export default Login;
