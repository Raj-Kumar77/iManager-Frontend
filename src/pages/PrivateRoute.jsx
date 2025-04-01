import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';

const PrivateRoute = ({ element }) => {
  const {token} = useProject()

  if (!token) {
    return <Navigate to='/login' />; 
  }

  return element; 
};

export default PrivateRoute;
