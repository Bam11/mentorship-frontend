import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

//Define the interface for a match
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

//Define the interface for a match
interface Match {
  id: string;
  topic: string;
  mentor: User;
  mentee: User;
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get('/auth/admin/matches');
        const fetchedMatches: Match[] = res.data.matches;
        setMatches(fetchedMatches);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Failed to fetch matches');
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Accepted Matches</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {matches.length === 0 ? (
          <p className="text-center text-gray-600">No accepted matches yet.</p>
        ) : (
          <ul className="space-y-4">
            {matches.map((match) => (
              <li key={match.id} className="border rounded p-4">
                <p><strong>Mentor:</strong> {match.mentor.name} ({match.mentor.email})</p>
                <p><strong>Mentee:</strong> {match.mentee.name} ({match.mentee.email})</p>
                <p><strong>Topic:</strong> {match.topic}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/admin')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matches;
