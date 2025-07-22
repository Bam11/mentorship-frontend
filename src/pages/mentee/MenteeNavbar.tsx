import { NavLink, useNavigate } from 'react-router-dom';

const MenteeNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `hover:underline ${
      isActive ? 'text-yellow-300 font-semibold' : ''
    }`;

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
      <div className="text-xl font-bold">Mentee Dashboard</div>

      <ul className="flex space-x-6 text-sm">
        <li>
          <NavLink to="/mentee/dashboard" className={linkClasses}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/mentee/request-session" className={linkClasses}>
            Request Session
          </NavLink>
        </li>
        <li>
          <NavLink to="/mentee/sessions" className={linkClasses}>
            Session History
          </NavLink>
        </li>
        <li>
          <NavLink to="/mentee/feedback" className={linkClasses}>
            Feedback
          </NavLink>
        </li>
        <li>
          <NavLink to="/mentee/profile" className={linkClasses}>
            Profile
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="hover:underline text-red-200"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MenteeNavbar;
