import axios from "axios"

const authApiInstance = axios.create ({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register(email, name, password, contact, isSeller) {
    const response = await authApiInstance.post("/register", {
        email,
        name,
        password,
        contact,
        isSeller
    })
    return response.data
}
