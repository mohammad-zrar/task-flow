import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const AuthRoute: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return !isLoggedIn ? <Outlet /> : <Navigate to='/' replace />;
};

export default AuthRoute;