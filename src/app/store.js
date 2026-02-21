import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";
import { userSlice } from "../features/user/userSlice";
import { cartSlice } from "../features/cart/CartSlice";
import wishlistReducer from "../features/wishlist/WishlistSlice";

export const store = configureStore({
    reducer:{
        [mainApi.reducerPath] : mainApi.reducer,

        [userSlice.name] : userSlice.reducer,

        [cartSlice.name] : cartSlice.reducer,

        wishlistSlice: wishlistReducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
            mainApi.middleware])
})