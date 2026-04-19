/* eslint-disable no-unused-vars */
import { setUser, setLoading, setError } from "../state/auth.slice"
import { getMe, login, register } from "../services/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister({email, name, password, contact, isSeller=false}) {
        const data = await register({email, name, password, contact, isSeller})
        
        dispatch(setUser(data.user))
        return data.user
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })
        console.log(data.user)
        dispatch(setUser(data.user))
        return data.user
    }

    async function handleGetMe() {
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(err){
            console.log(err)
        }finally{
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin, handleGetMe }
}
