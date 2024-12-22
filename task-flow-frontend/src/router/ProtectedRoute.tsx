import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const ProtectedRoute: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;