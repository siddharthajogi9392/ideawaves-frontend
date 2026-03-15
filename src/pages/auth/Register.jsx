import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../../components/common/Components';

const Register = () => {
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
 });
 const [error, setError] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { register } = useAuth();
 const navigate = useNavigate();

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
   await register(formData.name, formData.email, formData.password);
   navigate('/login');
  } catch (err) {
   setError(err.response?.data?.message || 'Failed to register');
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="flex justify-center items-center py-12">
   <Card className="w-full max-w-md">
    <h2 className="text-2xl font-bold text-center mb-6">Join IdeaWaves</h2>
    {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</div>}
    <form onSubmit={handleSubmit}>
     <Input
      label="Full Name"
      id="name"
      value={formData.name}
      onChange={handleChange}
      required
     />
     <Input
      label="Email"
      type="email"
      id="email"
      value={formData.email}
      onChange={handleChange}
      required
     />
     <Input
      label="Password"
      type="password"
      id="password"
      value={formData.password}
      onChange={handleChange}
      required
     />

     <Button
      type="submit"
      variant="primary"
      className="w-full mt-6"
      disabled={isSubmitting}
     >
      {isSubmitting ? 'Creating Account...' : 'Register'}
     </Button>
    </form>
    <p className="mt-4 text-center text-sm text-gray-600">
     Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
    </p>
   </Card>
  </div>
 );
};

export default Register;
