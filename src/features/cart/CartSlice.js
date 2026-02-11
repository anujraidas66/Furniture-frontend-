import { createSlice } from "@reduxjs/toolkit";
import { getCartsFromLocal, setCartsToLocal } from "../local/local";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    carts: getCartsFromLocal(),
    isOpen: false, // drawer state
  },

  reducers: {
    // Add or update product in cart
    setCart: (state, action) => {
      const isExist = state.carts.find(
        item => item.id === action.payload.id
      );

      if (isExist) {
        state.carts = state.carts.map(cart =>
          cart.id === action.payload.id ? action.payload : cart
        );
      } else {
        state.carts.push(action.payload);
      }

      setCartsToLocal(state.carts);
      state.isOpen = true; // open drawer on add to cart
    },

    // Toggle drawer
    toggleCart: (state, action) => {
      state.isOpen = action.payload; // true = open, false = close
    },

    // 🆕 Remove product from cart
    removeCart: (state, action) => {
      state.carts = state.carts.filter(cart => cart.id !== action.payload);
      setCartsToLocal(state.carts);
    }
  }
});

export const { setCart, toggleCart, removeCart } = cartSlice.actions;
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

