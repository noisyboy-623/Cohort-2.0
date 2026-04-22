/* eslint-disable no-unused-vars */
import { addItem as addItemApi, getCart, removeItem as removeItemApi, updateQuantity as updateQuantityApi } from "../services/cart.api"
import { addItem as addItemToCart, setItems, removeItem as removeItemFromCart, updateItem, setLoading } from "../state/cart.slice"
import { useDispatch, useSelector } from "react-redux"

export const useCart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)

    async function handleAddItem({ productId, variantId }) {
        const data = await addItemApi({ productId, variantId })
        return data
    }

    async function handleGetCart() {
        dispatch(setLoading(true))
        try {
            const data = await getCart()
            dispatch(setItems(data.cart?.items || []))
            return data.cart
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleRemoveItem(itemId) {
        dispatch(removeItemFromCart(itemId))
        const data = await removeItemApi(itemId)
        dispatch(setItems(data.cart?.items || []))
        return data
    }

    async function handleUpdateQuantity(itemId, quantity) {
        dispatch(updateItem({ itemId, quantity }))
        const data = await updateQuantityApi(itemId, quantity)
        dispatch(setItems(data.cart?.items || []))
        return data
    }

    return { handleAddItem, handleGetCart, handleRemoveItem, handleUpdateQuantity, cartItems }
}