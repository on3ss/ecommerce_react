import { useInfiniteQuery } from "@tanstack/react-query";
import ProductsList, { ProductResponse } from "../components/ProductsList";

export default function HomePage() {
    const LIMIT = 30

    const fetchProducts = async ({ pageParam = 0 }): Promise<ProductResponse> => {
        const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${pageParam}`);
        return await response.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<ProductResponse>(['products'], fetchProducts, {
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + LIMIT
            return nextSkip > lastPage.total ? undefined : nextSkip
        }
    })

    return (
        <ProductsList data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} status={status} />
    )
}