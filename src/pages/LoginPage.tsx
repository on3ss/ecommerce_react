import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { User } from "../types/UserType";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

type ServerError = {
    message: string
}

export default function LoginPage() {
    const { user, login } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    const [username, setUsername] = useState("kminchelle")
    const [password, setPassword] = useState("0lelplR")

    const attemptLogin = async () => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        if (!response.ok) {
            const error: ServerError = await response.json()
            throw new Error(error.message)
        }
        const user: User = await response.json()
        return user
    }

    const loginMutatation = useMutation({
        mutationFn: attemptLogin,
        onError: (error) => {
            alert(error)
        },
        onSuccess: (user: User) => {
            login(user)
            navigate('/')
        }
    })

    return (
        <>
            <div className="flex flex-col justify-center min-h-screen bg-gray-100 sm:py-12">
                <div className="p-10 mx-auto xs:p-0 md:w-full md:max-w-md">
                    <h1 className="mb-5 text-2xl font-bold text-center">EStore</h1>
                    <form className="w-full bg-white divide-y divide-gray-200 rounded-lg shadow" onSubmit={(event) => {
                        event.preventDefault()
                        loginMutatation.mutateAsync()
                    }}>
                        <div className="px-5 py-7">
                            <label className="block pb-1 text-sm font-semibold text-gray-600">Username</label>
                            <input type="text" value={username} onChange={(e) => {
                                setUsername(e.currentTarget.value)
                            }} className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg" required />
                            <label className="block pb-1 text-sm font-semibold text-gray-600">Password</label>
                            <input type="password" value={password} onChange={(e) => {
                                setPassword(e.currentTarget.value)
                            }} className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg" required />
                            <button type="submit" className="transition duration-200 bg-purple-500 hover:bg-purple-600 focus:bg-purple-700 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span className="inline-block mr-2">Login</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}