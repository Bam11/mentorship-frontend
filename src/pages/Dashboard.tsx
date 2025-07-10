import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        {user && (
          <>
            <p className="text-lg mb-2">Hello, <span className="font-semibold">{user.name}</span></p>
            <p className="text-sm mb-4">
              Role: <span className="uppercase text-blue-600">{user.role}</span>
            </p>
          </>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default Dashboard;
