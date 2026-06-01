// import { useSelector, useDispatch } from "react-redux";
// import { removeWishlist } from "../features/wishlist/WishlistSlice";
// import { base } from "../app/mainApi";
// import { Link } from "react-router-dom";

// export default function Wishlist() {
//   const { wishlist } = useSelector((state) => state.wishlistSlice);
//   const dispatch = useDispatch();

//   if (wishlist.length === 0) {
//     return (
//       <div className="text-center py-20 font-['Poppins']">
//         <h2 className="text-3xl font-semibold text-black">
//           Your wishlist is empty 💔
//         </h2>
//         <p className="text-lg text-gray-500 mt-2">
//           Start adding products you love.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto py-16 px-6 font-['Poppins']">

//       <h2 className="text-4xl font-semibold text-black mb-10">
//         My Wishlist
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {wishlist.map((item) => (
//           <div
//             key={item.id}
//             className="border rounded-lg p-4 hover:shadow-lg transition"
//           >
//             <img
//               src={`${base}/${item.image}`}
//               alt={item.title}
//               className="w-full h-56 object-cover rounded"
//             />

//             <h3 className="mt-4 text-xl font-medium text-black">
//               {item.title}
//             </h3>

//             <p className="text-yellow-600 text-lg mt-1">
//               Rs. {item.price}
//             </p>

//             <div className="flex justify-between mt-4 text-base">
//               <Link
//                 to={`/products/${item.id}`}
//                 className="text-blue-600 font-medium hover:underline"
//               >
//                 View
//               </Link>

//               <button
//                 onClick={() => dispatch(removeWishlist(item.id))}
//                 className="text-red-500 font-medium hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useSelector, useDispatch } from "react-redux";
import { removeWishlist } from "../features/wishlist/wishlistSlice";
// import { removeWishlist } from "../features/wishlist/WishlistSlice";
import { base } from "../app/mainApi";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlistSlice);
  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-['Poppins']">
        <h2 className="text-2xl sm:text-3xl font-semibold text-black">
          Your wishlist is empty 💔
        </h2>
        <p className="text-base sm:text-lg text-gray-500 mt-2">
          Start adding products you love.
        </p>

        <Link
          to="/shop"
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 sm:py-14 px-4 sm:px-6 font-['Poppins']">

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-8 sm:mb-10 text-center sm:text-left">
        My Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 hover:shadow-xl transition duration-300 bg-white"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={`${base}/${item.image}`}
                alt={item.title}
                className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <h3 className="mt-4 text-lg sm:text-xl font-medium text-black line-clamp-1">
              {item.title}
            </h3>

            <p className="text-yellow-600 text-base sm:text-lg mt-1 font-semibold">
              Rs. {item.price}
            </p>

            <div className="flex justify-between items-center mt-4 text-sm sm:text-base">
              <Link
                to={`/products/${item.id}`}
                className="text-indigo-600 font-medium hover:underline"
              >
                View
              </Link>

              <button
                onClick={() => dispatch(removeWishlist(item.id))}
                className="text-red-500 font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}