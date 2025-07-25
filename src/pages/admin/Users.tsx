import { useEffect, useState } from 'react';
import api from '../../api/axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/auth/admin/users');
      setUsers(res.data.users);
    } catch (err: unknown) {
      const error = err as {response?: {data?: {message?: string}}};
      setError(error.response?.data?.message || 'Failed to load users');
    }
  };

  // Track role changes for each user
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string }>({});

  // Handle dropdown changes
  const handleSelectChange = (userId: string, role: string) => {
    setSelectedRoles((prev) => ({ ...prev, [userId]: role }));
  };

    // Confirm and update role
  const handleUpdateRole = async (userId: string) => {
    const newRole = selectedRoles[userId];
    const confirmUpdate = window.confirm(`Are you sure you want to change this user's role to ${newRole}?`);
    if (!confirmUpdate) return;

    try {
      await api.put(`/auth/admin/users/${userId}/role`, { role: newRole });
      fetchUsers(); // Refresh list
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/auth/admin/users/${userId}`);
      fetchUsers(); // refresh list
    } catch (err: unknown) {
      const error = err as {response?: {data?: {message?: string}}};
      setError(error.response?.data?.message || 'Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedRoles[user.id] || user.role}
                        onChange={(e) => handleSelectChange(user.id, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="MENTOR">Mentor</option>
                        <option value="MENTEE">Mentee</option>
                      </select>
                      <button
                        onClick={() => handleUpdateRole(user.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Update Role
                      </button>
                    </div>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
