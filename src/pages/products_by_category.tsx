import { useInfiniteQuery } from "@tanstack/react-query";
import ProductsList, { ProductResponse } from "./home/ProductsList";
import { useParams } from "react-router-dom"

export default function ProductsByCategory() {
    const { category } = useParams()

    const LIMIT = 30

    const fetchProducts = async ({ pageParam = 0 }): Promise<ProductResponse> => {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${pageParam}`);
        return await response.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<ProductResponse>([`products-${category}`], fetchProducts, {
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + LIMIT
            return nextSkip > lastPage.total ? undefined : nextSkip
        }
    })

    return (
        <div>
            <h5 className="mx-2 my-4 text-lg">Showing products for <span className="font-semibold">{category}</span></h5>
            <ProductsList data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} status={status} />
        </div>
    )
}