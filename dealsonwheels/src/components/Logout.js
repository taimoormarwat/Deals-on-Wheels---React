import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/auth';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('token', '');
    navigate('/');
    window.location.reload();
  }, [navigate]);

  // You can render a loading state here if needed while the redirect is happening.
  return (
    <div>
      Logging out...
    </div>
  );
}
