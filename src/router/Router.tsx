import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "./RouterError";
import Root from "./Root";
import ProductsByCategory from "../pages/ProductsByCategory";
import ProductsBySearch from "../pages/ProductsBySearch";
import ProductDetail from "../pages/ProductDetail";

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
            {
                path: 'product/:id',
                element: <ProductDetail />
            },
        ]
    }
])

export default router