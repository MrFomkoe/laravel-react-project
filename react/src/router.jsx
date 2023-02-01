import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaulLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/DashBoard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";

// React app routes
const router = createBrowserRouter([
    // Not found route
    {
        path: "*",
        element: <NotFound />,
    },

    // Default layout
    {
        path: "/",
        element: <DefaulLayout />,
        children: [
            // Users page route
            {
                path: "/users",
                element: <Users />,
            },

            // New user creation form route
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },

            // Select single user
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },

            // Dashboard page route
            {
                path: "/dashboard",
                element: <Dashboard />,
            },

            // Default navigation to dashboard
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
        ],
    },

    // Guest layout
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            // Login page route
            {
                path: "/login",
                element: <Login />,
            },

            // Signup page route
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;
