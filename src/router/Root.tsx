import { Outlet, Link, useNavigate } from "react-router-dom";
import CategoriesList from "../pages/components/CategoriesList";
import React, { useState } from "react";

function SearchForm() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate(`search/${query}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-purple-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className="bg-gray-50 border border-purple-300 text-purple-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5" placeholder="Search..." required />
            </div>
        </form>
    )
}

export default function Root() {
    const searchForm = SearchForm()

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 px-2 py-4 bg-white border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/"><h1 className="text-2xl font-bold text-purple-600">EStore</h1></Link>
                    </div>
                    <div className="flex items-center justify-end gap-2">

                        <div className="hidden md:block">
                            {searchForm}
                        </div>

                        <button className="p-2 rounded hover:bg-purple-200">
                            <div className="w-6 h-6 text-purple-800">
                                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>


                <div className="block md:hidden">
                    {searchForm}
                </div>
            </header>
            <main className="flex flex-col flex-1">
                <div className="md:flex">
                    <div className="mt-4">
                        <CategoriesList />
                    </div>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}