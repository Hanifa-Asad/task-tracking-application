
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import api from '../api';

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      const response = await api.post('/users/login', {
        email: formData.email,
        password: formData.password,
      });
      login(response.data, response.data.token);
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleSubmit} />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default LoginPage;