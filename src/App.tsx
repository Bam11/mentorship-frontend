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

import MenteeLayout from './pages/mentee/MenteeLayout';
import MenteeDashboard from './pages/mentee/MenteeDashboard';
import RequestSession from './pages/mentee/RequestSession';
import MenteeSessions from './pages/mentee/Sessions';
import Feedback from './pages/mentee/Feedback';
import MenteeProfile from './pages/mentee/Profile';


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


        {/* Protected Mentee Route */}
        <Route
          path="/mentee"
          element={
            <ProtectedRoute allowedRoles={['MENTEE']}>
              <MenteeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<MenteeDashboard />} />
          <Route path="sessions" element={<MenteeSessions />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="profile" element={<MenteeProfile />} />
          <Route path="request-session" element={<RequestSession />} />
        </Route>

        

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
