import CategoriesList from "./CategoriesList";
import ProductsList from "./ProductsList";

export default function Home() {

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between px-2 py-4 border-b">
                <div>
                    <h1 className="text-2xl font-bold text-purple-600">EStore</h1>
                </div>
                <div className="flex items-center justify-end">
                    <button className="p-2 rounded hover:bg-purple-200">
                        <div className="w-6 h-6 text-purple-800">
                            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                    </button>
                    <button className="p-2 rounded hover:bg-purple-200">
                        <div className="w-6 h-6 text-purple-800">
                            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </header>
            <main className="flex flex-col flex-1">
                <div className="mt-4">
                    <CategoriesList />
                </div>
                <ProductsList />
            </main>
        </div>
    )
}