import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api/axios';

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await api.post(`/auth/sessions/${sessionId}/feedback`, {
        rating,
        comment,
      });
      setSuccess('Feedback submitted successfully!');
      setRating(5);
      setComment('');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to submit feedback');
    }
  };

  if (!sessionId) {
    return <p className="text-red-500">Invalid session ID</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow rounded p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Session Feedback</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Rating (1–5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Comments (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/mentee/sessions')}
            className="text-blue-500 hover:underline"
          >
            Back to Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
