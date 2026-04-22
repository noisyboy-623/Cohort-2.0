import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },
        updateItem: (state, action) => {
            const { itemId, quantity } = action.payload
            const item = state.items.find(i => i._id === itemId)
            if (item) item.quantity = quantity
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setItems, addItem, removeItem, updateItem, setLoading } = cartSlice.actions
export default cartSlice.reducer