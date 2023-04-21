import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import cartItems from '../../cartItems';

const url ="https://course-api.com/react-useReducer-cart-project"
// Replacing import cartItems from '../../cartItems'; with API
const initialState = {
    cartItems: [],
    // cartItems: cartItems,
    amount: 1,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', 
    async(name, thunkAPI)=>{
    try {
        // console.log({name, thunkAPI});
        // console.log(thunkAPI.getState());
        const resp = await axios(url);
        // console.log(resp);
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue('some thing went wrong')
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart : (state) =>{
            state.cartItems = [];
        },
        removeItem: (state, action) =>{
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) =>{
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getCartItems.pending, (state) =>{
            state.isLoading = true
        }).addCase(
            getCartItems.fulfilled, (state,action) =>{
                // console.log(action);
                state.isLoading = false
                state.cartItems = action.payload
            }
        ).addCase(
            getCartItems.rejected, (state, action) =>{
                // console.log(action);
                state.isLoading = false
            },
        )
    },
    // * Secondary approach but you will get build error in console
    // extraReducers :  {
    //     [getCartItems.pending] : (state) =>{
    //         state.isLoading = true
    //     },
    //     [getCartItems.fulfilled] : (state,action) =>{
    //         // console.log(action);
    //         state.isLoading = false
    //         state.cartItems = action.payload
    //     },
    //     [getCartItems.rejected] : (state, action) =>{
    //         // console.log(action);
    //         state.isLoading = false
    //     },
    // }
})

// console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;