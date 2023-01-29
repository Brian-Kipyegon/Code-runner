import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context-stores/Authcontext';

const RequiresAuth = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to='/login' state={{ path: location.pathname }} replace={true} />
    }

    return children
}

export default RequiresAuth;
