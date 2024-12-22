import { RouteObject } from "react-router";
import Home from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";


export const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/*"
        ,
        element: <NotFoundPage />
    }
]