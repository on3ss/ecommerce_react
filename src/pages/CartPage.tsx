import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { CartItemType } from "../types/CartType"
import calculateDiscountedPrice from "../utils/price_util"

function CartItem({ product }: { product: CartItemType }) {

    const { dispatch } = useCart()

    return (
        <div className="relative p-2 mx-2 my-4 bg-gray-50">
            <div className="flex items-start justify-between gap-2">
                <Link to={`/product/${product.id}`}>
                    <h6>{product.title} <span>&times; {product.quantity}</span></h6>
                </Link>
                <div className="w-4 mr-2">
                    <button className="px-2 text-xl text-red-600" onClick={() => {
                        dispatch({ type: 'REMOVE_FROM_CART', payload: { product, quantity: 1 } });
                    }}>&times;</button>
                </div>
            </div>
            <div className="text-sm font-semibold">
                <span className="text-purple-600">${calculateDiscountedPrice(product.price, product.discountPercentage)}</span>
                <span className="mx-2 line-through">${product.price}</span>
            </div>

            <div className="flex items-center justify-between py-2 my-2 text-sm font-semibold border-t">
                <span>Total</span>
                <span className="text-purple-600">${product.discountedPrice}</span>
            </div>
        </div>
    )
}

export default function CartPage() {

    const { cartState, dispatch } = useCart()

    const cartLength = cartState.products.length

    return (
        <>
            <div className="mx-2 my-4">

                {
                    cartLength > 0 && (
                        <div className="text-right">
                            <button className="text-sm font-semibold text-red-600" onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear</button>
                        </div>
                    )
                }
                {
                    cartLength > 0 ? cartState.products.map((product: CartItemType) => <CartItem key={product.id} product={product} />) : (
                        <div className="my-4 text-center">
                            <p>No items in cart!</p>
                        </div>
                    )
                }

                {
                    cartLength > 0 && (
                        <div className="flex items-center justify-between px-2 mx-2 mb-10 font-semibold">
                            <span>Total</span>
                            <span className="text-purple-600">${cartState.discountedTotal}</span>
                        </div>
                    )
                }
            </div>

            <div className="h-16"></div>

            <button className="fixed bottom-0 min-w-full py-4 text-white bg-purple-400">
                Checkout
            </button>
        </>
    )
}