// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { X, Trash2 } from "lucide-react";
// import { removeCart, toggleCart } from "./CartSlice";
// import { base } from "../../app/mainApi";

// export default function CartDrawer() {
//   // caets means current cart item
//   const { carts, isOpen } = useSelector((state) => state.cartSlice);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const total = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => dispatch(toggleCart(false))}
//         />
//       )}

//       <div
//         className={`fixed top-0 right-0 w-96 h-full bg-white z-50 transform transition-transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } font-['Poppins']`}
//       >
//         {/* HEADER */}
//         <div className="p-4 flex justify-between items-center border-b">
//           <h2 className="text-2xl font-medium text-black">Your Cart</h2>
//           <X
//             className="cursor-pointer text-black"
//             onClick={() => dispatch(toggleCart(false))}
//           />
//         </div>

//         {/* CART ITEMS */}
//         <div className="p-4 space-y-4 overflow-y-auto h-[65%]">
//           {carts.map((item) => {
//             const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;

//             return (
//               <div
//                 key={`${item.id}-${item.color}-${item.size}`}
//                 className="flex gap-3 border p-2 rounded items-center"
//               >
//                 <img
//                   src={`${base}/${imgSrc}`}
//                   alt={item.title}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <p className="text-black text-lg font-medium">{item.title}</p>
//                   <p className="text-neutral-400 text-base">Qty: {item.qty}</p>
//                   <p className="text-black text-base font-medium">
//                     Rs. {item.price * item.qty}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() =>
//                     dispatch(removeCart({ id: item.id, color: item.color, size: item.size }))
//                   }
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* TOTAL & ACTIONS */}
//         <div className="p-4 border-t space-y-3">
//           <p className="text-black text-lg font-semibold">
//             Total: Rs. {total.toLocaleString()}.00
//           </p>

//           <Link
//             to="/cart"
//             onClick={() => dispatch(toggleCart(false))}
//             className="block text-center text-black text-base font-medium bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
//           >
//             View Cart
//           </Link>

//           <button
//             disabled={carts.length === 0}
//             onClick={() => {
//               dispatch(toggleCart(false));
//               nav("/checkout");
//             }}
//             className="w-full bg-yellow-400 py-2 rounded text-black font-semibold text-base hover:bg-yellow-500 transition"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


// for responsive

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { X, Trash2 } from "lucide-react";
import { removeCart, toggleCart } from "./CartSlice";
import { base } from "../../app/mainApi";

export default function CartDrawer() {
  const { carts, isOpen } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => dispatch(toggleCart(false))}
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 transform transition-transform
          w-full sm:w-96 font-['Poppins'] shadow-lg
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl sm:text-2xl font-medium text-black">Your Cart</h2>
          <X
            className="cursor-pointer text-black"
            onClick={() => dispatch(toggleCart(false))}
          />
        </div>

        {/* CART ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[60%] sm:h-[65%]">
          {carts.length === 0 && (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          )}
          {carts.map((item) => {
            const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;

            return (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex flex-col sm:flex-row gap-3 border p-2 rounded items-start sm:items-center"
              >
                <img
                  src={`${base}/${imgSrc}`}
                  alt={item.title}
                  className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded"
                />
                <div className="flex-1 flex flex-col justify-between w-full">
                  <p className="text-black text-lg font-medium truncate">{item.title}</p>
                  <p className="text-neutral-400 text-sm">Qty: {item.qty}</p>
                  <p className="text-black text-base font-medium">
                    Rs. {item.price * item.qty}
                  </p>
                </div>
                <button
                  onClick={() =>
                    dispatch(removeCart({ id: item.id, color: item.color, size: item.size }))
                  }
                  className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* TOTAL & ACTIONS */}
        <div className="p-4 border-t space-y-3">
          <p className="text-black text-lg font-semibold">
            Total: Rs. {total.toLocaleString()}.00
          </p>

          <Link
            to="/cart"
            onClick={() => dispatch(toggleCart(false))}
            className="block text-center text-black text-base font-medium bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
          >
            View Cart
          </Link>

          <button
            disabled={carts.length === 0}
            onClick={() => {
              dispatch(toggleCart(false));
              nav("/checkout");
            }}
            className="w-full bg-yellow-400 py-2 rounded text-black font-semibold text-base hover:bg-yellow-500 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}