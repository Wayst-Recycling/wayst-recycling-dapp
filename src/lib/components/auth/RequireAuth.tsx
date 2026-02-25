import { Navigate } from 'react-router-dom';

import { getCookie } from '@/lib/utils/cookies';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({ children, redirectTo = '/' }: PrivateRouteProps) => {
  // use the actual authentication logic
  const isAuthenticated = !!getCookie('accessToken');

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
