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
import Profile from "../Pages/Dashboard/Profile/Profile";
import BookParcel from "../Pages/Dashboard/UserDetails/BookParcel";
import MyParcel from "../Pages/Dashboard/UserDetails/MyParcel/MyParcel";
import UpdateParcel from '../Pages/Dashboard/UserDetails/MyParcel/UpdateParcel';
import AllUsers from "../Pages/Dashboard/AdminDetails/AllUsers/AllUsers";
import AllParcel from "../Pages/Dashboard/AdminDetails/AllParcel/AllParcel";
import MyDeliveryList from "../Pages/Dashboard/DeliveryDetails/MyDeliveryList/MyDeliveryList";
import MyReviews from "../Pages/Dashboard/DeliveryDetails/MyReviews/MyReviews";
import AllDeliveryMan from "../Pages/Dashboard/AdminDetails/AllDeliveryMan/AllDeliveryMan";

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
            
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            // Users Section
            {
                path: "bookParcel",
                element: <BookParcel></BookParcel>

            },
            {
                path: "myParcel",
                element: <MyParcel></MyParcel>

            },
            {
                path: "updateParcel/:id",
                element: <UpdateParcel></UpdateParcel>,
                loader: ({params}) => fetch(`http://localhost:5000/parcel/g/${params.id}`)

            },
            {
                path: "profile",
                element: <Profile></Profile>

            },
            {
                path: 'updateProfile',
                element: <UpdateProfile></UpdateProfile>
            },
            // Admin Section
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "allParcel",
                element: <AllParcel></AllParcel>
            },
            {
                path: "allDeliveryMan",
                element: <AllDeliveryMan></AllDeliveryMan>
            },
            // Delivery Section
            {
                path: "myDeliveryList",
                element: <MyDeliveryList></MyDeliveryList>
            },
            {
                path: "myReviews",
                element: <MyReviews></MyReviews>
            },

        ]
    },
]);