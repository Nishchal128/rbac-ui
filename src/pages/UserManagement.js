import React, { useEffect, useState } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../services/api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Viewer');
  const [newStatus, setNewStatus] = useState('Active');

  const fetchUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  const handleAddUser = async () => {
    if (!newName) {
      alert('Please enter a name');
      return;
    }
    const newUser = { name: newName, role: newRole, status: newStatus };
    await addUser(newUser);
    fetchUsers();
    setNewName('');
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>User Management</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="Viewer">Viewer</option>
          <option value="Editor">Editor</option>
          <option value="Admin">Admin</option>
        </select>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          onClick={handleAddUser}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4A90E2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Add User
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#4A90E2', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{user.name}</td>
              <td style={{ padding: '10px' }}>{user.role}</td>
              <td style={{ padding: '10px' }}>{user.status}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;