import { Outlet, Link } from "react-router-dom";
import CategoriesList from "../pages/home/CategoriesList";

export default function Root() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 flex items-center justify-between px-2 py-4 bg-white border-b">
                <div>
                    <Link to="/"><h1 className="text-2xl font-bold text-purple-600">EStore</h1></Link>
                </div>
                <div className="flex items-center justify-end">
                    <button className="p-2 rounded hover:bg-purple-200">
                        <div className="w-6 h-6 text-purple-800">
                            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
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