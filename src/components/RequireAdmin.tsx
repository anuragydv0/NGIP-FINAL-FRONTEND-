import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { currentUser } = useUser();

  if (currentUser.role !== 'Admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
