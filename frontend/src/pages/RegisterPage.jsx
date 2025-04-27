import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import api from '../api';

const RegisterPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      const response = await api.post('/users/register', formData);
      login(response.data, response.data.token);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div>
      <AuthForm type="register" onSubmit={handleSubmit} />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default RegisterPage;