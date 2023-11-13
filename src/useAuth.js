// useAuth.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // Redirect to login page if not logged in
        navigate('/login');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return isLoggedIn;
};

export default useAuth;
