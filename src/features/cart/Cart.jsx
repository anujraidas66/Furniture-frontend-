
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSelector, useDispatch } from "react-redux";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react"; // 🆕 Trash2
import { setCart, removeCart } from "../cart/CartSlice"; // 🆕 import removeCart
import { useNavigate } from "react-router";
import { base } from "../../app/mainApi";
import { Button } from "../../components/ui/button";

export default function CartPage() {
  const { carts } = useSelector(state => state.cartSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();

 

  //update qty (...item) matlab object cart ma j j xha tehi tehi rakh dine but qty lai update garne
  const increaseQty = (item) => {
    if (item.qty < item.stock) {
      dispatch(
        setCart({
          ...item,
          qty: item.qty + 1
        })
      );
    }
  };

  const decreaseQty = (item) => {
    if (item.qty > 1) {
      dispatch(
        setCart({
          ...item,
          qty: item.qty - 1
        })
      );
    }
  };

  const removeItem = (id) => {
    dispatch(removeCart(id));
  };

  const cartTotal = carts.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {carts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Category</th>
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2">Action</th> {/* 🆕 Action column */}
              </tr>
            </thead>

            <tbody>

              {carts.map(item => (
                <tr key={item.id} className="border-t text-center">
                  <td className="p-2">
                    <img
                      src={`${base}/${item.image}`}
                      className="w-16 h-16 mx-auto object-cover"
                    />
                  </td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">Rs. {item.price}</td>

                  {/* Qty buttons */}
                  <td className="p-2">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item)}
                        disabled={item.qty === 1}
                        className="border px-2 py-1 rounded"
                      >
                        <MinusIcon size={14} />
                      </button>

                      <span className="font-semibold">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item)}
                        disabled={item.qty === item.stock}
                        className="border px-2 py-1 rounded"
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>
                  </td>

                  <td className="p-2 font-semibold">
                    Rs. {item.price * item.qty}
                  </td>

                  {/* 🆕 Remove button */}
                  <td className="p-2">

      <AlertDialog>
      <AlertDialogTrigger asChild>

          <button
          className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
          </button>      

        </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={() => removeItem(item.id)} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>


  <div className="flex justify-end mt-10">
  <div className="bg-[#E8E0CF] w-80 p-6 rounded-md shadow-md">
    
    <h2 className="text-2xl font-bold mb-6 text-black">
      Cart Totals
    </h2>

    <div className="flex justify-between text-gray-600 mb-3">
      <span>Subtotal</span>
      <span>Rs. {cartTotal.toLocaleString()}.00</span>
    </div>

    <div className="flex justify-between font-semibold text-lg text-yellow-700 mb-6">
      <span>Total</span>
      <span>Rs. {cartTotal.toLocaleString()}.00</span>
    </div>

    <button
      onClick={() => nav("/checkout")}
      className="w-full border border-black py-3 rounded-lg font-medium hover:bg-black hover:text-white transition"
    >
      Check Out
    </button>

  </div>
</div>


        </>
      )}
    </div>
  );
}






// import { useSelector, useDispatch } from "react-redux";
// import { MinusIcon, PlusIcon, Trash2 } from "lucide-react"; // 🆕 Trash2
// import { setCart, removeCart } from "../cart/CartSlice"; // 🆕 import removeCart
// import { useNavigate } from "react-router";
// import { base } from "../../app/mainApi";

// export default function CartPage() {
//   const { carts } = useSelector(state => state.cartSlice);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const increaseQty = (item) => {
//     if (item.qty < item.stock) {
//       dispatch(
//         setCart({
//           ...item,
//           qty: item.qty + 1
//         })
//       );
//     }
//   };

//   const decreaseQty = (item) => {
//     if (item.qty > 1) {
//       dispatch(
//         setCart({
//           ...item,
//           qty: item.qty - 1
//         })
//       );
//     }
//   };

//   const removeItem = (id) => {
//     dispatch(removeCart(id));
//   };

//   const cartTotal = carts.reduce(
//     (total, item) => total + item.price * item.qty,
//     0
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

//       {carts.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2">Image</th>
//                 <th className="p-2">Title</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Quantity</th>
//                 <th className="p-2">Subtotal</th>
//                 <th className="p-2">Action</th> {/* 🆕 Action column */}
//               </tr>
//             </thead>

//             <tbody>
//               {carts.map(item => (
//                 <tr key={item.id} className="border-t text-center">
//                   <td className="p-2">
//                     <img
//                       src={`${base}/${item.image}`}
//                       className="w-16 h-16 mx-auto object-cover"
//                     />
//                   </td>

//                   <td className="p-2">{item.title}</td>
//                   <td className="p-2">Rs. {item.price}</td>

//                   {/* Qty buttons */}
//                   <td className="p-2">
//                     <div className="flex justify-center items-center gap-2">
//                       <button
//                         onClick={() => decreaseQty(item)}
//                         disabled={item.qty === 1}
//                         className="border px-2 py-1 rounded"
//                       >
//                         <MinusIcon size={14} />
//                       </button>

//                       <span className="font-semibold">{item.qty}</span>

//                       <button
//                         onClick={() => increaseQty(item)}
//                         disabled={item.qty === item.stock}
//                         className="border px-2 py-1 rounded"
//                       >
//                         <PlusIcon size={14} />
//                       </button>
//                     </div>
//                   </td>

//                   <td className="p-2 font-semibold">
//                     Rs. {item.price * item.qty}
//                   </td>

//                   {/* 🆕 Remove button */}
//                   <td className="p-2">
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Cart total + checkout */}
//           <div className="flex justify-end mt-6">
//             <div className="text-right space-y-3">
//               <p className="text-xl font-bold">
//                 Cart Total: Rs. {cartTotal}
//               </p>

//               <button
//                 onClick={() => nav("/checkout")}
//                 className="bg-yellow-400 px-6 py-2 rounded font-semibold"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
