import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

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

type ProductCardProp = {
    product: ProductType
}

type ProductResponse = {
    products: ProductType[];
    total: number;
    skip: number;
    limit: number;
}

function ProductCard(props: ProductCardProp) {
    const product = props.product
    return (
        <a href="#">
            <div className="rounded shadow-sm bg-gray-50">
                <div className="relative">
                    <img className="object-cover min-w-full rounded-t aspect-[4/3]" src={product.thumbnail} alt={product.title} />
                    <div className="absolute p-1 text-xs text-gray-200 bg-purple-400 rounded top-2 right-2">
                        <span>{product.rating}</span>
                    </div>
                </div>

                <div className="p-2">
                    <h6 className="text-xs text-gray-600 text-ellipsis">{product.brand}</h6>
                    <h5 className="font-semibold line-clamp-1 text-ellipsis">{product.title}</h5>
                    <p className="text-sm line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-start gap-2 my-2">
                        <span className="font-semibold text-purple-400">${product.price}</span>
                        <span className="text-sm text-gray-600 line-through">${product.price}</span>
                        <span className="text-sm text-green-600">{product.discountPercentage}% off</span>
                    </div>
                </div>
            </div>
        </a>
    )
}

function ProductsList() {

    const fetchProducts = async () => {
        const response = await fetch('https://dummyjson.com/products');
        return await response.json()
    }

    const { data, error, isLoading } = useQuery<ProductResponse>({ queryKey: ['products'], queryFn: fetchProducts })

    if (error) {
        return (
            <div className="mx-2 mt-4">
                <p className="text-sm text-center">Something went wrong! Could not fetch products</p>
            </div>
        )
    }

    if (isLoading) {
        <Loader />
    }

    return (
        <div className="grid grid-cols-2 gap-4 mx-2 my-4 md:grid-cols-4 xl:grid-cols-6">
            {
                data && data.products.map((product: ProductType) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
}

export default ProductsList