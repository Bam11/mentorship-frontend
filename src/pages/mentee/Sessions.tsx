import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

interface Session {
  id: string;
  topic: string;
  status: string;
  createdAt: string;
  mentor: {
    name: string;
    email: string;
  };
}

const MenteeSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await api.get('/auth/sessions/mentee');
      setSessions(res.data.sessions);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to load sessions');
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Session History</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {sessions.length === 0 ? (
        <p className="text-gray-600">No sessions yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.id} className="border rounded p-4 shadow">
              <p><strong>Topic:</strong> {session.topic}</p>
              <p><strong>Mentor:</strong> {session.mentor.name} ({session.mentor.email})</p>
              <p><strong>Status:</strong> {session.status}</p>
              <p><strong>Date:</strong> {new Date(session.createdAt).toLocaleString()}</p>

              <button
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                onClick={() => navigate(`/mentee/feedback?sessionId=${session.id}`)}
              >
                Give Feedback
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenteeSessions;
