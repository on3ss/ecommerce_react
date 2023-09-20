import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import React, { memo } from "react";

type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

type ProductResponse = {
    products: ProductType[];
    total: number;
    skip: number;
    limit: number;
}

const calculateDiscountedPrice = (price: number, percentage: number) => (price - (price * (percentage / 100))).toFixed(2)

const ProductCard = memo(({ product }: { product: ProductType }) => {
    return (
        <a href="#">
            <div className="rounded shadow-sm bg-gray-50">
                <div className="relative">
                    <img className="object-cover min-w-full rounded-t aspect-[4/3]" src={product.thumbnail} alt={product.title} loading="lazy" />
                    <div className="absolute p-1 text-xs text-gray-200 bg-purple-400 rounded top-2 right-2">
                        <span>{product.rating}</span>
                    </div>
                </div>

                <div className="p-2">
                    <h6 className="text-xs text-gray-600 text-ellipsis">{product.brand}</h6>
                    <h5 className="font-semibold line-clamp-1 text-ellipsis">{product.title}</h5>
                    <p className="text-sm line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-start gap-2 my-2">
                        <span className="font-semibold text-purple-400">${calculateDiscountedPrice(product.price, product.discountPercentage)}</span>
                        <span className="text-sm text-gray-600 line-through">${product.price}</span>
                        <span className="text-sm text-green-600">{product.discountPercentage}% off</span>
                    </div>
                </div>
            </div>
        </a>
    )
})

function ProductsList() {

    const LIMIT = 30

    const fetchProducts = async ({ pageParam = 0 }) => {
        const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${pageParam}`);
        return await response.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<ProductResponse>(['products'], fetchProducts, {
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + LIMIT
            return nextSkip > lastPage.total ? undefined : nextSkip
        }
    })

    return status === 'loading' ? (
        <div className="flex items-center justify-center flex-1 min-h-full">
            <Loader />
        </div>
    ) : status === 'error' ? (
        <div className="mx-2 mt-4">
            <p className="text-sm text-center">Something went wrong! Could not fetch products. Please try again later.</p>
        </div>
    ) : (
        <>
            <div className="grid grid-cols-2 gap-4 mx-2 my-4 md:grid-cols-4 xl:grid-cols-6">
                {
                    data && data.pages.map((group, index) => (
                        <React.Fragment key={index}>
                            {
                                group.products.map((product: ProductType) => <ProductCard key={product.id} product={product} />)
                            }
                        </React.Fragment>
                    ))
                }
            </div>
            <div>
                <button className="min-w-full py-4 my-4 text-center" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                    {
                        isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'
                    }
                </button>
            </div>
            <div className="min-w-full text-sm text-center">{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )
}

export default ProductsList