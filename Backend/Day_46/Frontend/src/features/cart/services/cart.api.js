import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL;

const cartApiInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/cart`,
    withCredentials: true
})

export async function addItem({ productId, variantId }) {
    const response = await cartApiInstance.post(`/add/${productId}/${variantId}`, { quantity: 1 })
    return response.data
}

export async function getCart() {
    const response = await cartApiInstance.get("/")
    return response.data
}

export async function removeItem(itemId) {
    const response = await cartApiInstance.delete(`/${itemId}`)
    return response.data
}

export async function updateQuantity(itemId, quantity) {
    console.log(itemId, quantity)
    const response = await cartApiInstance.patch(`/${itemId}`, { quantity })
    return response.data
}