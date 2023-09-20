import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Loader from "./components/Loader"
import { Product } from "../types/ProductType"

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
        // TODO: Design product details card
        <div>
            {
                data && (
                    <div>
                        <p>{data?.title}</p>
                    </div>
                )
            }
        </div>
    )
}