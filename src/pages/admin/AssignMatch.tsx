import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


const AssignMatch = () => {
  const [mentors, setMentors] = useState<User[]>([]);
  const [mentees, setMentees] = useState<User[]>([]);
  const [mentorId, setMentorId] = useState('');
  const [menteeId, setMenteeId] = useState('');
  const [topic, setTopic] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await api.get('/auth/admin/users');
        const allUsers: User[] = usersRes.data.users;

        const mentorsList = allUsers.filter((u) => u.role === 'MENTOR');
        const menteesList = allUsers.filter((u) => u.role === 'MENTEE');
        setMentors(mentorsList);
        setMentees(menteesList);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/admin/assign-match', { mentorId, menteeId, topic });
      setSuccess('Mentor assigned successfully!');
      setMentorId('');
      setMenteeId('');
      setTopic('');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to assign mentor');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Assign Mentor to Mentee</h2>

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
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name} ({mentor.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Mentee</label>
            <select
              value={menteeId}
              onChange={(e) => setMenteeId(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Choose Mentee --</option>
              {mentees.map((mentee) => (
                <option key={mentee.id} value={mentee.id}>
                  {mentee.name} ({mentee.email})
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
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Introduction to APIs"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Assign Match
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/admin')}
            className="text-blue-500 hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignMatch;
