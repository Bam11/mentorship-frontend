import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-700'
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/admin" end className={linkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={linkClasses}>
            Manage Users
          </NavLink>
          <NavLink to="/admin/assign-match" className={linkClasses}>
            Assign Match
          </NavLink>
          <NavLink to="/admin/matches" className={linkClasses}>
            View Matches
          </NavLink>
          <NavLink to="/admin/sessions" className={linkClasses}>
            Sessions
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
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
