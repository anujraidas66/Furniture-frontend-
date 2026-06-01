import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";

export default function WishlistProduct() {
  const { wishlist } = useSelector((state) => state.wishlistSlice);

  return (
    <div className="font-['Poppins'] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-16 sm:mt-20 mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black text-center sm:text-left">
          My Wishlist
        </h1>

        <span className="text-sm sm:text-base md:text-lg text-gray-600 text-center sm:text-right">
          {wishlist.length} {wishlist.length === 1 ? "Product" : "Products"}
        </span>
      </div>

      {/* If Empty */}
      {wishlist.length === 0 ? (
        <div className="text-center py-16 sm:py-20 px-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-black">
            Your wishlist is empty 💔
          </h2>
          <p className="text-base sm:text-lg text-gray-500">
            Start adding products you love.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        /* Responsive Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {wishlist.map((item) => (
            <ProductCard
              key={item.id}
              product={{
                _id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}