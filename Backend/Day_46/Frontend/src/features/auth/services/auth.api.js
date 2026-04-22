import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const authApiInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/auth`,
    withCredentials: true,
});

export async function register({email, name, password, contact, isSeller}) {
    const response = await authApiInstance.post("/register", {
        email,
        name,
        password,
        contact,
        isSeller
    })
    return response.data
}

export async function login({ email, password}){
    const response = await authApiInstance.post("/login", {
        email,
        password
    })
    return response.data
}

export async function getMe() {
    const response = await authApiInstance.get("/me")
    return response.data
}