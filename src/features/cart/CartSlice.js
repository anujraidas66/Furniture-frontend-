import { createSlice } from "@reduxjs/toolkit";
import { getCartsFromLocal, setCartsToLocal } from "../local/local";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    carts: getCartsFromLocal(),
    isOpen: false,
  },
  reducers: {
    // Add or update product in cart
    setCart: (state, action) => {
      const { id, color, size } = action.payload;

      const isExist = state.carts.find(
        (item) => item.id === id && item.color === color && item.size === size
      );

      if (isExist) {
        state.carts = state.carts.map((cart) =>
          cart.id === id && cart.color === color && cart.size === size
            ? action.payload
            : cart
        );
      } else {
        state.carts.push(action.payload);
      }

      setCartsToLocal(state.carts);
      state.isOpen = true;
    },

    // Open/close cart drawer
    toggleCart: (state, action) => {
      state.isOpen = action.payload;
    },

    // Remove single item
    removeCart: (state, action) => {
      const { id, color, size } = action.payload;
      state.carts = state.carts.filter(
        (cart) => !(cart.id === id && cart.color === color && cart.size === size)
      );
      setCartsToLocal(state.carts);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.carts = [];
      setCartsToLocal([]);
    },
  },
});

export const { setCart, toggleCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;







// import { createSlice } from "@reduxjs/toolkit";
// import { getCartsFromLocal, setCartsToLocal } from "../local/local";

// export const cartSlice = createSlice({
//   name: 'cartSlice',
//   initialState: {
//     carts: getCartsFromLocal(),
//   },

//   reducers: {
//     setCart: (state, action) => {
//       // isExist means send gareko id ra pahile dekhi save bhaye ko product id match xha bane bujhi halne tiye id pahila nai addtocart bhai sake ko xha
//       const isExist = state.carts.find(item => item.id === action.payload.id);
//       // xha bhane update garnu pariyeo
//       if(isExist){
//         state.carts = state.carts.map((cart) => {
//           //pathaye ko id ra cart ma bhaye ko id match bayeo bhane update garne natra tehi hunxha
//           return cart.id === action.payload.id ? action.payload: cart;
//         });
//         setCartsToLocal(state.carts);
//       }else{
//       state.carts = [...state.carts, action.payload];
//       setCartsToLocal(state.carts)
//       }
     
//     }
//   }
// });

// export const { setCart } = cartSlice.actions;

