import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  let isAuthenticated = getSelection();
  return isAuthenticated ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
