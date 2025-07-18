import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminMatches from './pages/admin/Matches';
import AdminSessions from './pages/admin/Sessions';
import AssignMatch from './pages/admin/AssignMatch';

// Admin Pages
import AdminUsers from './pages/admin/Users'; // create later

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Protected Admin Route */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/matches"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminMatches />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/sessions"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminSessions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/assign"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AssignMatch />
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
