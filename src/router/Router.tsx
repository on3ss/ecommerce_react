import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "./RouterError";
import Root from "./Root";
import ProductsByCategoryPage from "../pages/ProductsByCategoryPage";
import ProductsBySearchPage from "../pages/ProductsBySearchPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";

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
                element: <ProductsByCategoryPage />
            },
            {
                path: 'search/:query',
                element: <ProductsBySearchPage />
            },
            {
                path: 'product/:id',
                element: <ProductDetailPage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
        ]
    }
])

export default router