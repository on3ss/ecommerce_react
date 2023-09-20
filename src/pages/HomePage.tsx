import { useInfiniteQuery } from "@tanstack/react-query";
import ProductsList from "./components/ProductsList";
import { Products } from "../types/ProductType";

export default function HomePage() {
    const LIMIT = 30

    const fetchProducts = async ({ pageParam = 0 }): Promise<Products> => {
        const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${pageParam}`);
        return await response.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<Products>(['products'], fetchProducts, {
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + LIMIT
            return nextSkip > lastPage.total ? undefined : nextSkip
        }
    })

    return (
        <ProductsList data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} status={status} />
    )
}