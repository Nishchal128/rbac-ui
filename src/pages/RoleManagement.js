import React, { useEffect, useState } from 'react';
import { getRoles, addRole, deleteRole } from '../services/api';

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState('');
  
  const fetchRoles = async () => {
    const { data } = await getRoles();
    setRoles(data);
  };

  const handleAddRole = async () => {
    if (!roleName || !permissions) {
      alert('Please enter a role name and permissions');
      return;
    }
    const newRole = {
      name: roleName,
      permissions: permissions.split(',').map(permission => permission.trim())
    };
    await addRole(newRole);
    fetchRoles();
    setRoleName(''); 
    setPermissions('');
  };

  const handleDeleteRole = async (id) => {
    await deleteRole(id);
    fetchRoles();
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>Role Management</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input
          type="text"
          placeholder="Enter permissions (comma separated)"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button
          onClick={handleAddRole}
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
          Add Role
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#4A90E2', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Permissions</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{role.name}</td>
              <td style={{ padding: '10px' }}>{role.permissions.join(', ')}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleDeleteRole(role.id)}
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

export default RoleManagement;