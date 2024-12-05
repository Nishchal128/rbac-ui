import axios from 'axios';

const API = axios.create({ 
    baseURL: window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : 'https://rbac-ui-bay.vercel.app/'
  });

export const getUsers = () => API.get('/users');
export const addUser = (user) => API.post('/users', user);
export const updateUser = (id, user) => API.put(`/users/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const getRoles = () => API.get('/roles');
export const addRole = (role) => API.post('/roles', role);
export const updateRole = (id, role) => API.put(`/roles/${id}`, role);
export const deleteRole = (id) => API.delete(`/roles/${id}`);