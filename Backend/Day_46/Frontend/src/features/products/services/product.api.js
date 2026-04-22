import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL;

const productApiInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/products`,
    withCredentials: true
})

export async function createProduct(formData) {
    const response = await productApiInstance.post('/', formData)

    return response.data
}

export async function getSellerProducts() {
    const response = await productApiInstance.get('/seller')
    
    return response.data
}

export async function getAllProducts() {
    const response = await productApiInstance.get('/')
    
    return response.data
}

export async function getProductById(productId) {
    const response = await productApiInstance.get(`/detail/${productId}`)

    return response.data
}

export async function addProductVariant(productId, newProductVariant) {
    console.log(newProductVariant)

    const formData = new FormData()
    newProductVariant.images.forEach((image) => {
        formData.append("images", image.file)
    })

    formData.append("stock", newProductVariant.stock)
    if (newProductVariant.price && newProductVariant.price.amount != null) {
        formData.append("amount", newProductVariant.price.amount)
    }
    formData.append("attributes", JSON.stringify(newProductVariant.attributes))

    const response = await productApiInstance.post(`/${productId}/variants`, formData)
    console.log("sent")
    return response.data
}