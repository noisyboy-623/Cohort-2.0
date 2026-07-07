"use client"
import { useAuth } from '@/app/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ProtectedRoute = ({children}) => {
    
    let router = useRouter()
    let {user, loading} = useAuth()
    
    useEffect(() => {
        if(!user){
            router.replace('/login')
        }
    }, [user, router, loading])
    if(loading ) return <h1>Loading...</h1>
    if(!user) return null
    return children

}

export default ProtectedRoute