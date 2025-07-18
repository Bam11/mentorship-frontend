import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Sessions = () => {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/session-stats');
        setStats(res.data);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Failed to fetch session stats');
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-xl bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Session Stats</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 border rounded">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-2xl">{stats.total}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="text-lg font-semibold">Accepted</p>
            <p className="text-2xl text-green-600">{stats.accepted}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="text-lg font-semibold">Pending</p>
            <p className="text-2xl text-yellow-600">{stats.pending}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="text-lg font-semibold">Rejected</p>
            <p className="text-2xl text-red-500">{stats.rejected}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
