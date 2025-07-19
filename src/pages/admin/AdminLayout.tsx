import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block hover:underline">Dashboard</Link>
          <Link to="/admin/users" className="block text-blue-600 hover:underline">Users</Link>
          <Link to="/admin/assign-match" className="block text-blue-600 hover:underline">Assign Match</Link>
          <Link to="/admin/matches" className="block text-blue-600 hover:underline">View Matches</Link>
          <Link to="/admin/sessions" className="block hover:underline">Sessions</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 text-red-600 hover:underline"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
