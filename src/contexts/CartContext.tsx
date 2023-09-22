import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Cart, CartItemType } from '../types/CartType';

// Define the initial cart state
const initialCartState: Cart = {
    id: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
};

// Create a context for the cart
const CartContext = createContext<{
    cartState: Cart;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Define cart actions
type CartAction =
    | { type: 'SET_CART'; payload: Cart }
    | { type: 'ADD_TO_CART'; payload: { product: CartItemType; quantity: number } }
    | { type: 'REMOVE_FROM_CART'; payload: { product: CartItemType; quantity: number } }
    | { type: 'CLEAR_CART' };

// Define the cart reducer
function cartReducer(state: Cart, action: CartAction): Cart {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...action.payload,
            };
        case 'ADD_TO_CART':
            const existingProductIndex = state.products.findIndex(
                (product) => product.id === action.payload.product.id
            );

            if (existingProductIndex !== -1) {
                // If the product exists, update its quantity
                const updatedProducts = [...state.products];
                const existingProduct = updatedProducts[existingProductIndex];
                existingProduct.quantity += action.payload.quantity;

                return {
                    ...state,
                    products: updatedProducts,
                    total: state.total + action.payload.product.price * action.payload.quantity,
                    totalQuantity: state.totalQuantity + action.payload.quantity,
                };
            } else {
                // If the product is not in the cart, add it as a new item
                return {
                    ...state,
                    products: [...state.products, { ...action.payload.product, quantity: action.payload.quantity }],
                    total: state.total + action.payload.product.price * action.payload.quantity,
                    totalProducts: state.totalProducts + 1,
                    totalQuantity: state.totalQuantity + action.payload.quantity,
                };
            }
        case 'REMOVE_FROM_CART':
            const updatedProducts = state.products.filter(
                (product) => product.id !== action.payload.product.id
            );
            return {
                ...state,
                products: updatedProducts,
                total: state.total - action.payload.product.price * action.payload.quantity,
                totalProducts: state.totalProducts - 1,
                totalQuantity: state.totalQuantity - action.payload.quantity,
            };
        case 'CLEAR_CART':
            return initialCartState;
        default:
            return state;
    }
}

// Create a CartProvider component
export function CartProvider({ children }: { children: ReactNode }) {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

    return (
        <CartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to access the cart context
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}