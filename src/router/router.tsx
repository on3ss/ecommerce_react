import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ErrorPage from "./router_error";
import Root from "./root";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />
            }
        ]
    }
])

export default router