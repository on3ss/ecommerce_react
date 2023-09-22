import { useCart } from "../contexts/CartContext"
import { CartItemType } from "../types/CartType"
import calculateDiscountedPrice from "../utils/price_util"

function CartItem({ product }: { product: CartItemType }) {
    return (
        <div className="relative p-2 mx-2 my-4 bg-gray-50">
            <h6>{product.title} <span>&times; {product.quantity}</span></h6>
            <div className="text-sm font-semibold">
                <span className="text-purple-600">${calculateDiscountedPrice(product.price, product.discountPercentage)}</span>
                <span className="mx-2 line-through">${product.price}</span>
            </div>

            <div className="flex items-center justify-between py-2 my-2 text-sm font-semibold border-t">
                <span>Total</span>
                <span className="text-purple-600">${product.discountedPrice}</span>
            </div>

            <div className="absolute top-1 right-1">
                <button className="px-2">&times;</button>
            </div>
        </div>
    )
}

export default function CartPage() {

    const { cartState } = useCart()

    return (
        <>
            <div className="mx-2 my-4">
                {
                    cartState.products.map((product: CartItemType) => <CartItem key={product.id} product={product} />)
                }

                <div className="flex items-center justify-between px-2 mx-2 mb-10 font-semibold">
                    <span>Total</span>
                    <span className="text-purple-600">${cartState.discountedTotal}</span>
                </div>
            </div>

            <div className="h-16"></div>

            <button className="fixed bottom-0 min-w-full py-4 text-white bg-purple-400">
                Checkout
            </button>
        </>
    )
}