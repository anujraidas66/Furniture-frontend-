// for responsive


import { useSelector, useDispatch } from "react-redux";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { setCart, removeCart } from "./CartSlice";
import { useNavigate, Link } from "react-router-dom";
import { base } from "../../app/mainApi";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function CartPage() {
  const { carts } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const increaseQty = (item) => {
    if (item.qty < item.stock) dispatch(setCart({ ...item, qty: item.qty + 1 }));
  };

  const decreaseQty = (item) => {
    if (item.qty > 1) dispatch(setCart({ ...item, qty: item.qty - 1 }));
  };

  const cartTotal = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="font-['Poppins']">

      {/* ================= BANNER ================= */}
      <div className="relative mt-16 w-full h-80 overflow-hidden">
        <img
          src="/image/checkout.jpg"
          alt="Cart Banner"
          className="absolute inset-0 w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="/image/meubalhouse.png" alt="Logo" className="w-20 h-20 mb-4" />
          <h1 className="text-5xl font-medium text-black">Cart</h1>
          <div className="flex items-center gap-3 mt-4">
            <Link to="/" className="text-black text-base font-medium">Home</Link>
            <span className="text-2xl font-medium">›</span>
            <span className="text-black text-base font-light">Cart</span>
          </div>
        </div>
      </div>

      {/* ================= CART SECTION ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {carts.length === 0 ? (
          <p className="text-center text-lg text-gray-500 py-20">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full text-center border-collapse text-base">
                <thead className="bg-yellow-200">
                  <tr className="text-black text-lg font-medium">
                    <th className="p-4">Image</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Subtotal</th>
                    <th className="p-4">Remove</th>
                  </tr>
                </thead>
                <tbody className="text-black text-base">
                  {carts.map((item) => {
                    const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;
                    return (
                      <tr key={`${item.id}-${item.color}-${item.size}`} className="border-b">
                        <td className="p-4">
                          <img
                            src={`${base}/${imgSrc}`}
                            className="w-16 h-16 mx-auto object-cover rounded"
                            alt={item.title}
                          />
                        </td>
                        <td className="text-lg">{item.title}</td>
                        <td className="text-lg">Rs. {item.price}</td>
                        <td>
                          <div className="flex justify-center items-center gap-2 text-lg">
                            <button onClick={() => decreaseQty(item)} className="border px-2 py-1 rounded">
                              <MinusIcon size={14} />
                            </button>
                            <span>{item.qty}</span>
                            <button onClick={() => increaseQty(item)} className="border px-2 py-1 rounded">
                              <PlusIcon size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="text-lg">Rs. {item.price * item.qty}</td>
                        <td>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="text-red-500 hover:text-red-700">
                                <Trash2 size={18} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Product?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove <strong>{item.title}</strong> from your cart?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    dispatch(removeCart({ id: item.id, color: item.color, size: item.size }))
                                  }
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-6">
              {carts.map((item) => {
                const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;
                return (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="border p-4 rounded-lg flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <img src={`${base}/${imgSrc}`} alt={item.title} className="w-24 h-24 object-cover rounded" />
                      <button onClick={() => dispatch(removeCart({ id: item.id, color: item.color, size: item.size }))} className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="text-yellow-700 font-medium">Rs. {item.price}</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => decreaseQty(item)} className="border px-2 py-1 rounded"><MinusIcon size={16} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item)} className="border px-2 py-1 rounded"><PlusIcon size={16} /></button>
                    </div>
                    <p className="text-gray-700 font-medium">Subtotal: Rs. {item.price * item.qty}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ================= CART TOTAL ================= */}
        {carts.length > 0 && (
          <div className="flex flex-col md:flex-row justify-end mt-10 gap-6">
            <div className="bg-yellow-50 w-full md:w-80 p-6 rounded-md shadow-sm">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-black">Cart Totals</h2>
              <div className="flex justify-between mb-3 text-lg">
                <span>Subtotal</span>
                <span className="text-neutral-400">Rs. {cartTotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between font-semibold text-xl text-yellow-700 mb-6">
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}.00</span>
              </div>
              <button
                disabled={carts.length === 0}
                onClick={() => nav("/checkout")}
                className="w-full border border-black py-3 rounded-2xl font-medium text-lg hover:bg-black hover:text-white transition"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <div className="bg-[#F9F1E7] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-black text-3xl font-medium mb-4">Free Delivery</h3>
            <p className="text-neutral-400 text-xl">For all orders over $50.</p>
          </div>
          <div>
            <h3 className="text-black text-3xl font-medium mb-4">90 Days Return</h3>
            <p className="text-neutral-400 text-xl">If goods have problems.</p>
          </div>
          <div>
            <h3 className="text-black text-3xl font-medium mb-4">Secure Payment</h3>
            <p className="text-neutral-400 text-xl">100% secure payment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



// import { useSelector, useDispatch } from "react-redux";
// import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
// import { setCart, removeCart } from "./CartSlice";
// import { useNavigate, Link } from "react-router-dom";
// import { base } from "../../app/mainApi";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// export default function CartPage() {
//   const { carts } = useSelector((state) => state.cartSlice);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const increaseQty = (item) => {
//     if (item.qty < item.stock) dispatch(setCart({ ...item, qty: item.qty + 1 }));
//   };

//   const decreaseQty = (item) => {
//     if (item.qty > 1) dispatch(setCart({ ...item, qty: item.qty - 1 }));
//   };

//   const cartTotal = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <div className="font-['Poppins']">

//       {/* ================= BANNER ================= */}
//       <div className="relative mt-16 w-full h-80 overflow-hidden">
//         <img
//           src="/image/checkout.jpg"
//           alt="Cart Banner"
//           className="absolute inset-0 w-full h-full object-cover blur-[3px]"
//         />
//         <div className="absolute inset-0 bg-white/40"></div>

//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
//           <img src="/image/meubalhouse.png" alt="Logo" className="w-20 h-20 mb-4" />
//           <h1 className="text-5xl font-medium text-black">Cart</h1>

//           <div className="flex items-center gap-3 mt-4">
//             <Link to="/" className="text-black text-base font-medium">Home</Link>
//             <span className="text-2xl font-medium">›</span>
//             <span className="text-black text-base font-light">Cart</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= CART SECTION ================= */}
//       <div className="max-w-6xl mx-auto px-6 mt-16">

//         {carts.length === 0 ? (
//           <p className="text-center text-lg text-gray-500 py-20">
//             Your cart is empty
//           </p>
//         ) : (
//           <table className="w-full text-center border-collapse text-base">
//             <thead className="bg-yellow-200">
//               <tr className="text-black text-lg font-medium">
//                 <th className="p-4">Image</th>
//                 <th className="p-4">Title</th>
//                 <th className="p-4">Price</th>
//                 <th className="p-4">Quantity</th>
//                 <th className="p-4">Subtotal</th>
//                 <th className="p-4">Remove</th>
//               </tr>
//             </thead>

//             <tbody className="text-black text-base">
//               {carts.map((item) => {
//                 const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;

//                 return (
//                   <tr key={`${item.id}-${item.color}-${item.size}`} className="border-b">
//                     <td className="p-4">
//                       <img
//                         src={`${base}/${imgSrc}`}
//                         className="w-16 h-16 mx-auto object-cover rounded"
//                         alt={item.title}
//                       />
//                     </td>

//                     <td className="text-lg">{item.title}</td>
//                     <td className="text-lg">Rs. {item.price}</td>

//                     <td>
//                       <div className="flex justify-center items-center gap-2 text-lg">
//                         <button onClick={() => decreaseQty(item)} className="border px-2 py-1 rounded">
//                           <MinusIcon size={14} />
//                         </button>
//                         <span>{item.qty}</span>
//                         <button onClick={() => increaseQty(item)} className="border px-2 py-1 rounded">
//                           <PlusIcon size={14} />
//                         </button>
//                       </div>
//                     </td>

//                     <td className="text-lg">Rs. {item.price * item.qty}</td>

//                     <td>
//                       <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                           <button className="text-red-500 hover:text-red-700">
//                             <Trash2 size={18} />
//                           </button>
//                         </AlertDialogTrigger>

//                         <AlertDialogContent>
//                           <AlertDialogHeader>
//                             <AlertDialogTitle>Remove Product?</AlertDialogTitle>
//                             <AlertDialogDescription>
//                               Are you sure you want to remove <strong>{item.title}</strong> from your cart?
//                             </AlertDialogDescription>
//                           </AlertDialogHeader>
//                           <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction
//                               onClick={() =>
//                                 dispatch(removeCart({ id: item.id, color: item.color, size: item.size }))
//                               }
//                             >
//                               Remove
//                             </AlertDialogAction>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialog>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}

//         {/* ================= CART TOTAL ================= */}
//         {carts.length > 0 && (
//           <div className="flex justify-end mt-10">
//             <div className="bg-yellow-50 w-80 p-8 rounded-md shadow-sm">
//               <h2 className="text-3xl font-semibold mb-6 text-center text-black">Cart Totals</h2>

//               <div className="flex justify-between mb-3 text-lg">
//                 <span>Subtotal</span>
//                 <span className="text-neutral-400">Rs. {cartTotal.toLocaleString()}.00</span>
//               </div>

//               <div className="flex justify-between font-semibold text-xl text-yellow-700 mb-6">
//                 <span>Total</span>
//                 <span>Rs. {cartTotal.toLocaleString()}.00</span>
//               </div>

//               <button
//                 disabled={carts.length === 0}
//                 onClick={() => nav("/checkout")}
//                 className="w-full border border-black py-3 rounded-2xl font-medium text-lg hover:bg-black hover:text-white transition"
//               >
//                 Check Out
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ================= FEATURES SECTION ================= */}
//       <div className="bg-[#F9F1E7] py-20">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
//           <div>
//             <h3 className="text-black text-3xl font-medium mb-4">Free Delivery</h3>
//             <p className="text-neutral-400 text-xl">For all orders over $50.</p>
//           </div>
//           <div>
//             <h3 className="text-black text-3xl font-medium mb-4">90 Days Return</h3>
//             <p className="text-neutral-400 text-xl">If goods have problems.</p>
//           </div>
//           <div>
//             <h3 className="text-black text-3xl font-medium mb-4">Secure Payment</h3>
//             <p className="text-neutral-400 text-xl">100% secure payment.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }