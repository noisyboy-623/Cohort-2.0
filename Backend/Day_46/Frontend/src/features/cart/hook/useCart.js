/* eslint-disable no-unused-vars */
import { addItem } from "../services/cart.api"
import { addItem as addItemToCart } from "../state/cart.slice"
import { useDispatch } from "react-redux"

export const useCart = () => {
    const dispatch = useDispatch()

    async function handleAddItem({productId, variantId}) {
        const data = await addItem({productId, variantId})
        return data
    }

    return {handleAddItem}
}