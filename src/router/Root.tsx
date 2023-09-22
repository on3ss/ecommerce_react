import { Outlet, Link, useNavigate } from "react-router-dom";
import CategoriesList from "../pages/components/CategoriesList";
import React, { useEffect, useState } from "react";
import CartWithBadgeIcon from "../pages/components/CartWithBadgeIcon";
import { useCart } from "../contexts/CartContext";

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

    const { dispatch } = useCart()
    useEffect(() => {
        fetch('https://dummyjson.com/carts/1')
            .then((response) => response.json())
            .then((initialCartState) => {
                dispatch({ type: 'SET_CART', payload: initialCartState });
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });
    }, [dispatch])

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
                        <CartWithBadgeIcon />
                    </div>
                </div>

                <div className="block my-2 md:hidden">
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