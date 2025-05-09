import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/auth/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token is invalid or expired');
      }

      const data = await response.json();
      console.log(data.message);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkTokenValidity = async () => {
    const isValid = await verifyToken();
    if (!isValid) {
      // Handle token expiration (e.g., redirect to login)
      localStorage.clear();
      navigate('/');
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);
};

export default useAuth;
