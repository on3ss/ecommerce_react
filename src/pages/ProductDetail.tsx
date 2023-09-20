import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Loader from "./components/Loader"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Product } from "../types/ProductType"

const calculateDiscountedPrice = (price: number, percentage: number) => (price - (price * (percentage / 100))).toFixed(2)

export default function ProductDetail() {
    const { id } = useParams()

    const fetchProduct = async (): Promise<Product> => {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data: Product = await response.json()
        return data
    }
    const { data, error, isLoading } = useQuery({ queryKey: [`product-${id}`], queryFn: fetchProduct })

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
                    <div className="flex flex-col md:flex-row">
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
                            <h5 className="text-2xl font-bold line-clamp-1 text-ellipsis">{data.title}</h5>
                            <p className="text-sm text-gray-600">{data.description}</p>
                            <div className="flex items-center justify-start gap-2 my-2">
                                <span className="font-semibold text-purple-400">${calculateDiscountedPrice(data.price, data.discountPercentage)}</span>
                                <span className="text-sm text-gray-600 line-through">${data.price}</span>
                                <span className="text-sm text-green-600">{data.discountPercentage}% off</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}