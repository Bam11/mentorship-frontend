import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

interface Match {
  id: string;
  mentor: {
    id: string;
    name: string;
    email: string;
  };
}

const RequestSession = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [mentorId, setMentorId] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get('/auth/matches');
        setMatches(res.data.matches);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Failed to fetch mentors');
      }
    };

    fetchMatches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/sessions/request', {
        mentorId,
        topic,
        description
      });
      setSuccess('Session request sent successfully!');
      setMentorId('');
      setTopic('');
      setDescription('');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to send session request');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Request a Session</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Mentor</label>
            <select
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Choose Mentor --</option>
              {matches.map((match) => (
                <option key={match.id} value={match.mentor.id}>
                  {match.mentor.name} ({match.mentor.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              placeholder="e.g. Git & GitHub Basics"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Briefly describe the session goal..."
              className="w-full border px-3 py-2 rounded"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/mentee/dashboard')}
            className="text-blue-500 hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestSession;
