import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="space-y-4">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/admin/users')}
          >
            Manage Users
          </button>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/admin/assign-match')}
          >
            Assign Match
          </button>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/admin/matches')}
          >
            View Matches
          </button>

          <button
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/admin/sessions')}
          >
            View Sessions
          </button>


          <button
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
