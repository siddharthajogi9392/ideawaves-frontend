import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const checkLoggedIn = async () => {
   const token = localStorage.getItem('token');
   const storedUser = localStorage.getItem('user');

   if (token && storedUser) {
    setUser(JSON.parse(storedUser));
    // Optional: Validate token with backend here if needed
   }
   setLoading(false);
  };

  checkLoggedIn();
 }, []);

 const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const data = response.data;

  const token = data.token;
  const user = {
   _id: data._id,
   name: data.name,
   email: data.email
  };

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  setUser(user);
  return user; // Return user for redirection logic
 };

 const register = async (name, email, password) => {
  await api.post('/auth/register', { name, email, password });
  // After register, user usually needs to login or is auto-logged in. 
  // For now, we'll let them login manually or can implement auto-login.
  // Let's return true to indicate success.
 };

 const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  window.location.href = '/login'; // Force redirect
 };

 const updateUser = (updatedUser) => {
  localStorage.setItem('user', JSON.stringify(updatedUser));
  setUser(updatedUser);
 };

 const value = {
  user,
  login,
  register,
  logout,
  updateUser,
  loading
 };

 return (
  <AuthContext.Provider value={value}>
   {!loading && children}
  </AuthContext.Provider>
 );
};
