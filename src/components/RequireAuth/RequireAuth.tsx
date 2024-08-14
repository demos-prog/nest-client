import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validateToken from '../../helpers/validateToken';

interface RequireAuthProps {
  children: ReactNode;
}

interface UsersData {
  email: string,
  access_token: string
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const usersData: UsersData | null = JSON.parse(localStorage.getItem('myAppUsersData') || 'null');
    if (usersData) {
      const access_token = usersData.access_token;
      validateToken(access_token).then(isValid => {
        if (!isValid) {
          navigate('/login')
        }
      });
    } else {
      navigate('/')
    }
  }, [navigate]);

  return children
};

export default RequireAuth;