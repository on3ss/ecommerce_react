import { InfiniteData } from "@tanstack/react-query";
import Loader from "./Loader";
import React, { memo } from "react";
import { Products, Product } from "../../types/ProductType";
import { Link } from "react-router-dom"

const calculateDiscountedPrice = (price: number, percentage: number) => (price - (price * (percentage / 100))).toFixed(2)

const ProductCard = memo(({ product }: { product: Product }) => {
    return (
        <Link to={`product/${product.id}`}>
            <div className="min-h-full rounded shadow-sm bg-gray-50">
                <div className="relative">
                    <img className="object-cover min-w-full rounded-t aspect-[4/3]" src={product.thumbnail} alt={product.title} loading="lazy" />
                    <div className="absolute p-1 text-xs text-gray-200 bg-purple-400 rounded top-2 right-2">
                        <span>{product.rating.toFixed(2)}</span>
                    </div>
                </div>

                <div className="p-2">
                    <h6 className="text-xs text-gray-600 text-ellipsis">{product.brand}</h6>
                    <h5 className="font-semibold line-clamp-1 text-ellipsis">{product.title}</h5>
                    <p className="text-sm line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-start gap-2 my-2">
                        <span className="text-sm font-semibold text-purple-400">${calculateDiscountedPrice(product.price, product.discountPercentage)}</span>
                        <span className="text-xs text-gray-600 line-through">${product.price}</span>
                        <span className="text-xs text-green-600">{product.discountPercentage}% off</span>
                    </div>
                </div>
            </div>
        </Link>
    )
})

function ProductsList({ data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status }: {
    data: InfiniteData<Products> | undefined,
    fetchNextPage: Function,
    hasNextPage: boolean | undefined,
    isFetching: boolean | undefined,
    isFetchingNextPage: boolean | undefined,
    status: string
}) {

    return status === 'loading' ? (
        <div className="flex items-center justify-center flex-1 min-h-full">
            <Loader />
        </div>
    ) : status === 'error' ? (
        <div className="mx-2 mt-4">
            <p className="text-sm text-center">Something went wrong! Could not fetch products. Please try again later.</p>
        </div>
    ) : (
        data && data.pages.length > 0 ? (
            <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 mx-2 my-4 md:grid-cols-4 2xl:grid-cols-6">
                    {
                        data && data.pages.map((group, index) => (
                            <React.Fragment key={index}>
                                {
                                    group.products.map((product: Product) => <ProductCard key={product.id} product={product} />)
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
            </div>
        ) : (
            <div className="mx-2 mt-4">
                <p className="text-sm text-center">No products Found!</p>
            </div>
        )
    )
}

export default ProductsList