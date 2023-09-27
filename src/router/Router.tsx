import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "./RouterError";
import AuthenticatedRoot from "./AuthenticatedRoot";
import ProductsByCategoryPage from "../pages/ProductsByCategoryPage";
import ProductsBySearchPage from "../pages/ProductsBySearchPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import { CartProvider } from "../contexts/CartContext";

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <CartProvider>
                <AuthenticatedRoot />
            </CartProvider>
        ),
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
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />
    }
])

export default router