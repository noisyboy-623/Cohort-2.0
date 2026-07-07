"use client"

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { useState, createContext, useEffect, useContext } from "react";

let Auth = createContext();

export let AuthProvider = ({children}) => {
    let router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    let hydrateUser = async() => {
        try {
            const res = await api.get("/api/auth/me")
            setUser(res.data.user)
            router.push("/layout/home")
        } catch (error) {
            setUser(null)
            console.log("Error in hydrating user", error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        hydrateUser()
    }, [])

    return <Auth.Provider value={{user, setUser, loading, hydrateUser}}>{children}</ Auth.Provider>
}

export let useAuth = () => useContext(Auth);