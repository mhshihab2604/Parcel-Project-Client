import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
            path: '/login',
            element: <Login></Login>
            },
            {
            path: '/updateProfile',
            element: <PrivateRoute>
                <UpdateProfile></UpdateProfile>
            </PrivateRoute>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            {
                
            }
        ]
    },
]);