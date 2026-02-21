import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlistFromLocal,
  setWishlistToLocal,
} from "../local/local";

export const wishlistSlice = createSlice({
  name: "wishlistSlice",

  initialState: {
    wishlist: getWishlistFromLocal(),
  },

  reducers: {
    // Toggle wishlist (add/remove)
    toggleWishlist: (state, action) => {
      const { id } = action.payload;

      const isExist = state.wishlist.find(
        (item) => item.id === id
      );

      if (isExist) {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== id
        );
      } else {
        state.wishlist.push(action.payload);
      }

      setWishlistToLocal(state.wishlist);
    },

    // Remove specific item
    removeWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );

      setWishlistToLocal(state.wishlist);
    },

    // Clear all
    clearWishlist: (state) => {
      state.wishlist = [];
      setWishlistToLocal([]);
    },
  },
});

export const {
  toggleWishlist,
  removeWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
