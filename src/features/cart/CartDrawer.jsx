import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { X, Trash2 } from "lucide-react";
import { removeCart, toggleCart } from "./CartSlice"; // ✅ import removeCart
import { base } from "../../app/mainApi";

export default function CartDrawer() {
  const { carts, isOpen } = useSelector(state => state.cartSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => dispatch(toggleCart(false))}
        />
      )}

      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white z-50 transform transition-transform
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <X
            className="cursor-pointer"
            onClick={() => dispatch(toggleCart(false))}
          />
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[65%]">
          {carts.map(item => (
            <div key={item.id} className="flex gap-3 border p-2 rounded items-center">
              <img src={`${base}/${item.image}`} className="w-16 h-16 object-cover" />

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p>Qty: {item.qty}</p>
                <p>Rs. {item.price * item.qty}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-3">
          <p className="font-bold">Total: Rs. {total}</p>

          {/* View Cart */}
          <Link
            to="/cart"
            onClick={() => dispatch(toggleCart(false))}
            className="block text-center bg-gray-200 py-2 rounded"
          >
            View Cart
          </Link>

          {/* Direct Checkout */}
          <button
            onClick={() => {
              dispatch(toggleCart(false));
              nav("/checkout");
            }}
            className="w-full bg-yellow-400 py-2 rounded font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}




// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { X, Trash2 } from "lucide-react";
// import { removeCart, toggleCart } from "./CartSlice"; // ✅ import removeCart
// import { base } from "../../app/mainApi";

// export default function CartDrawer() {
//   const { carts, isOpen } = useSelector(state => state.cartSlice);
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
//         className={`fixed top-0 right-0 w-96 h-full bg-white z-50 transform transition-transform
//         ${isOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="p-4 flex justify-between items-center border-b">
//           <h2 className="text-lg font-bold">Your Cart</h2>
//           <X
//             className="cursor-pointer"
//             onClick={() => dispatch(toggleCart(false))}
//           />
//         </div>

//         <div className="p-4 space-y-4 overflow-y-auto h-[65%]">
//           {carts.map(item => (
//             <div key={item.id} className="flex gap-3 border p-2 rounded items-center">
//               <img src={`${base}/${item.image}`} className="w-16 h-16 object-cover" />

//               <div className="flex-1">
//                 <p className="font-semibold">{item.title}</p>
//                 <p>Qty: {item.qty}</p>
//                 <p>Rs. {item.price * item.qty}</p>
//               </div>

//               {/* Remove Button */}
//               <button
//                 onClick={() => dispatch(removeCart(item.id))}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <Trash2 size={18} />
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="p-4 border-t space-y-3">
//           <p className="font-bold">Total: Rs. {total}</p>

//           {/* View Cart */}
//           <Link
//             to="/cart"
//             onClick={() => dispatch(toggleCart(false))}
//             className="block text-center bg-gray-200 py-2 rounded"
//           >
//             View Cart
//           </Link>

//           {/* Direct Checkout */}
//           <button
//             onClick={() => {
//               dispatch(toggleCart(false));
//               nav("/checkout");
//             }}
//             className="w-full bg-yellow-400 py-2 rounded font-semibold"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

