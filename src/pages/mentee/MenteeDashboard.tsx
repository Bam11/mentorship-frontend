import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

interface Match {
  id: string;
  mentor: {
    name: string;
    email: string;
  };
  topic: string;
}

const MenteeDashboard = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get('/auth/mentee/matches');
        setMatches(res.data.matches);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Failed to fetch matches');
      }
    };

    fetchMatches();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <div className="w-full max-w-3xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome, {user.name} 
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <h2 className="text-lg font-semibold mb-2">Your Mentor Matches:</h2>
        {matches.length === 0 ? (
          <p>No mentors assigned yet.</p>
        ) : (
          <ul className="space-y-3">
            {matches.map((match) => (
              <li key={match.id} className="border p-4 rounded">
                <p><strong>Mentor:</strong> {match.mentor.name} ({match.mentor.email})</p>
                <p><strong>Topic:</strong> {match.topic}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleLogout}
          >
            Logout
          </button>

          {/* Add feedback button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/feedback')}
          >
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
