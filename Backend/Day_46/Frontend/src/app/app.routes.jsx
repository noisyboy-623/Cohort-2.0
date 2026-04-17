import { createBrowserRouter } from "react-router"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import CreateProducts from "../features/products/pages/CreateProducts"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home Page</h1>
    },
    {   
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/seller/create-product",
        element: <CreateProducts />
    }
])