import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../../components/common/Components';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
   const user = await login(email, password);
   navigate('/dashboard');
  } catch (err) {
   setError(err.response?.data?.message || 'Failed to login');
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="flex justify-center items-center h-[80vh]">
   <Card className="w-full max-w-md">
    <h2 className="text-2xl font-bold text-center mb-6">Login to IdeaWaves</h2>
    {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</div>}
    <form onSubmit={handleSubmit}>
     <Input
      label="Email"
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
     />
     <Input
      label="Password"
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
     />
     <Button
      type="submit"
      variant="primary"
      className="w-full mt-2"
      disabled={isSubmitting}
     >
      {isSubmitting ? 'Logging in...' : 'Login'}
     </Button>
    </form>
    <p className="mt-4 text-center text-sm text-gray-600">
     Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
    </p>
   </Card>
  </div>
 );
};

export default Login;
