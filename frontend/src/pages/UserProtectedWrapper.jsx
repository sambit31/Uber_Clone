import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import { useEffect } from 'react';

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // If there's no token, we don't want to show children until navigate happens
  if (!token) {
    return null; 
  }


  return <>{children}</>;
};


export default UserProtectedWrapper;
