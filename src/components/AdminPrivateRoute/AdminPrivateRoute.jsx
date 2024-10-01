import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const AdminPrivateRoute = ({ children }) => {
    const infoUser = useSelector((state) => state.authSlide.infoUser);

    if (!infoUser || infoUser.user.role !== 'ADMIN') {
        return <Navigate to="/admin-login" />; 
    }

    return children;
};

export default AdminPrivateRoute;
