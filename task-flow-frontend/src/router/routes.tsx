import { RouteObject } from "react-router";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRoute from "./AuthRoute";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";


export const appRoutes: RouteObject[] = [
    {
        element: <AuthRoute />,
        children: [
            {
                path: '/login',
                element: <LoginPage />
            }]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomePage />
            }]
    },
    {
        path: "/*"
        ,
        element: <NotFoundPage />
    }
]