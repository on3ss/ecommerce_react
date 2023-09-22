import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Loader from "./components/Loader"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Product } from "../types/ProductType"
import { useState } from "react";
import calculateDiscountedPrice from "../utils/price_util";

export default function ProductDetailPage() {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)

    const fetchProduct = async (): Promise<Product> => {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data: Product = await response.json()
        return data
    }
    const { data, error, isLoading } = useQuery({ queryKey: [`product-${id}`], queryFn: fetchProduct })

    const incrementQuantity = () => {
        if (quantity === data?.stock) {
            return
        }
        setQuantity(quantity + 1)
    }

    const decrementQuantity = () => {
        if (quantity <= 1) {
            return
        }
        setQuantity(quantity - 1)
    }

    return isLoading ? (
        <div className="flex items-center justify-center flex-1 min-h-full">
            <Loader />
        </div>
    ) : error ? (
        <div className="mx-2 mt-4">
            <p className="text-sm text-center">Something went wrong! Could not fetch product. Please try again later.</p>
        </div>
    ) : (
        <div className="mx-2 my-4">
            {
                data && (
                    <>
                        <div className="flex flex-col mb-20 md:flex-row">
                            <Carousel className="max-w-4xl" dynamicHeight={true}>
                                {
                                    data.images.map((item, index) => (
                                        <div key={index}>
                                            <img src={item} alt={data.title + index} loading="lazy" className="aspect-[4/3]" />
                                        </div>
                                    ))
                                }
                            </Carousel>
                            <div className="flex-1 mx-4">
                                <h6 className="text-xs text-gray-600 text-ellipsis">{data.brand}</h6>
                                <h5 className="text-2xl font-bold text-ellipsis">{data.title}</h5>
                                <p className="text-sm text-gray-600">{data.description}</p>
                                <div className="flex items-center justify-start gap-2 my-2">
                                    <span className="font-semibold text-purple-400">${calculateDiscountedPrice(data.price, data.discountPercentage)}</span>
                                    <span className="text-sm text-gray-600 line-through">${data.price}</span>
                                    <span className="text-sm text-green-600">{data.discountPercentage}% off</span>
                                </div>
                                {/* Product Actions */}
                                <div className="fixed bottom-0 left-0 z-10 flex items-center justify-between h-16 min-w-full gap-2 bg-purple-200 md:items-start md:bg-transparent md:flex-col md:static md:mt-4">
                                    <div className="mx-4 md:ml-0">
                                        <button className="px-3 py-1 font-semibold text-white bg-purple-600 rounded" onClick={decrementQuantity} disabled={quantity <= 1}>&#8722;</button>
                                        <span className="mx-4 font-semibold text-gray-800">{quantity}/{data.stock}</span>
                                        <button className="px-3 py-1 font-semibold text-white bg-purple-600 rounded" onClick={incrementQuantity} disabled={quantity >= data.stock}>&#43;</button>
                                    </div>
                                    <div className="mx-2 md:ml-0">
                                        <button className="p-2 text-sm font-semibold text-gray-800 border-2 border-purple-600 rounded-lg focus:bg-purple-600 focus:text-white">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}