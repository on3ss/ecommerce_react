import { useQuery } from "@tanstack/react-query"
import Loader from "../components/Loader"

export default function CategoriesList() {
    const fetchCategories = async () => {
        const response = await fetch('https://dummyjson.com/products/categories')
        return await response.json()
    }
    const { data, error, isLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories })

    if (error) {
        return (
            <p>Something went wrong! Could not fetch categories</p>
        )
    }

    if (isLoading) {
        <Loader />
    }

    return (
        <div className="mt-4">
            <h5 className="mx-2 font-semibold text-md">Categories</h5>
            <ul className="flex justify-start gap-1 py-2 mt-1 overflow-x-scroll">
                {
                    data && data.map((category: string) => {
                        return (
                            <li key={category} className="first:ml-2 last:mr-2">
                                <button className="p-2 text-sm bg-purple-200 rounded whitespace-nowrap hover:bg-purple-400">
                                    {category}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}