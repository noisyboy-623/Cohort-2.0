/* eslint-disable no-unused-vars */
import { setUser, setLoading, setError } from "../state/auth.slice"
import { login, register } from "../services/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister({email, name, password, contact, isSeller=false}) {
        const data = await register({email, name, password, contact, isSeller})

        dispatch(setUser(data.user))
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })

        dispatch(setUser(data.user))
    }

    return { handleRegister, handleLogin }
}
