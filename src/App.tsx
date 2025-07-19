import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/Users';
import AdminMatches from './pages/admin/Matches';
import AdminSessions from './pages/admin/Sessions';
import AssignMatch from './pages/admin/AssignMatch';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Protected Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} /> {/* /admin */}
        <Route path="users" element={<AdminUsers />} /> {/* /admin/users */}
        <Route path="matches" element={<AdminMatches />} />
        <Route path="sessions" element={<AdminSessions />} />
        <Route path="assign-match" element={<AssignMatch />} />
      </Route>

        

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
