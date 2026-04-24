import { addProductVariant, createProduct, getAllProducts, getProductById, getSellerProducts, deleteProductVariant } from "../services/product.api";
import { useDispatch } from "react-redux";
import { setAllProducts, setSellerProducts } from "../state/product.slice";

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product
    }

    async function handleGetSellerProducts() {
        const data = await getSellerProducts()
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    async function handleGetAllProducts(){
        const data = await getAllProducts()
        dispatch(setAllProducts(data.products))
        return data.products
    }

    async function handleGetProductById(productId){
        const data = await getProductById(productId)
        return data.product
    }

    async function handleAddProductVariant(productId, newProductVariant) {
        const data = await addProductVariant(productId, newProductVariant)
        return data
    }

    async function handleDeleteProductVariant(productId, variantId) {
        const data = await deleteProductVariant(productId, variantId)
        return data
    }

    return { handleCreateProduct, handleGetSellerProducts, handleGetAllProducts, handleGetProductById, handleAddProductVariant, handleDeleteProductVariant }
}

