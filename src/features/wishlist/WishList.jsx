import { useSelector, useDispatch } from "react-redux";
import { removeWishlist } from "../features/wishlist/WishlistSlice";
import { base } from "../app/mainApi";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlistSlice);
  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20 font-['Poppins']">
        <h2 className="text-3xl font-semibold text-black">
          Your wishlist is empty 💔
        </h2>
        <p className="text-lg text-gray-500 mt-2">
          Start adding products you love.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 font-['Poppins']">

      <h2 className="text-4xl font-semibold text-black mb-10">
        My Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={`${base}/${item.image}`}
              alt={item.title}
              className="w-full h-56 object-cover rounded"
            />

            <h3 className="mt-4 text-xl font-medium text-black">
              {item.title}
            </h3>

            <p className="text-yellow-600 text-lg mt-1">
              Rs. {item.price}
            </p>

            <div className="flex justify-between mt-4 text-base">
              <Link
                to={`/products/${item.id}`}
                className="text-blue-600 font-medium hover:underline"
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