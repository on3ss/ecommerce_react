import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ErrorPage from "./router_error";
import Root from "./root";
import ProductsByCategory from "../pages/products_by_category";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'category/:category',
                element: <ProductsByCategory />
            }
        ]
    }
])

export default router