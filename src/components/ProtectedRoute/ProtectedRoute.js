import { /* Route, */ Navigate } from 'react-router-dom';

/* const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() => (props.loggedIn ? <Component {...props} /> : <Navigate to='/' />)}
    </Route>
  );
}; */

const ProtectedRoute = ({ children }) => {
  let isAuthenticated = getSelection();
  return isAuthenticated ? children : <Navigate to='/' />;
}

export default ProtectedRoute;
