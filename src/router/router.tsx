import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "./router_error";
import Root from "./root";
import ProductsByCategory from "../pages/products_by_category";
import ProductsBySearch from "../pages/products_by_search";

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
            },
            {
                path: 'search/:query',
                element: <ProductsBySearch />
            },
        ]
    }
])

export default router