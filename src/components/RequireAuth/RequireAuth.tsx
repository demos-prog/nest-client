import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validateToken from '../../helpers/validateToken';
import getAccessToken from '../../helpers/getAccessToken';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      validateToken(token).then(isValid => {
        if (!isValid) {
          navigate('/login');
        }
      });
    } else {
      navigate('/');
    }
  }, [navigate]);

  return children
};

export default RequireAuth;