import { useQuery } from "@tanstack/react-query"
import Loader from "../components/Loader"

export default function CategoriesList() {
    const fetchCategories = async (): Promise<string[]> => {
        const response = await fetch('https://dummyjson.com/products/categories')
        const data: Promise<string[]> = await response.json()
        return data
    }
    const { data, error, isLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories })

    return error ? (
        <p>Something went wrong! Could not fetch categories</p>
    ) : isLoading ? <Loader /> : (
        <>
            <h5 className="mx-2 font-semibold text-md">Categories</h5>
            <ul className="flex justify-start gap-1 py-2 mt-1 overflow-x-scroll md:w-44 md:overflow-x-auto md:flex-col md:mx-2">
                {
                    data && data.map((category: string) => {
                        return (
                            <li key={category} className="first:ml-2 last:mr-2 md:first:ml-0 md:last:mr-0">
                                <button className="p-2 text-sm bg-purple-200 rounded md:bg-transparent whitespace-nowrap hover:bg-purple-400">
                                    {category}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )


}