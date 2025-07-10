import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MENTEE', // default
    bio: '',
    skills: '',
    goals: '',
    industry: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://mentorship-backend-kgfs.onrender.com/auth/register', {
        ...form,
        skills: form.skills.split(',').map(skill => skill.trim())
      });

      setSuccess('Registration successful! Please login.');
      setForm({
        name: '',
        email: '',
        password: '',
        role: 'MENTEE',
        bio: '',
        skills: '',
        goals: '',
        industry: ''
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="MENTEE">Mentee</option>
            <option value="MENTOR">Mentor</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g. JavaScript, UI/UX, Python"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Goals</label>
          <input
            type="text"
            name="goals"
            value={form.goals}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Industry</label>
          <input
            type="text"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
