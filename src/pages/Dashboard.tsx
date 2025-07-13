import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full text-center text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
        <p className="mb-2"><strong>Role:</strong> <span className="uppercase text-blue-600">{user.role}</span></p>
        <p className="mb-6"><strong>Email:</strong> {user.email}</p>

        <button
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
