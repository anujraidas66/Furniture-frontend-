import { useSelector } from "react-redux";
import ProductCard from "../products/ProductCard";

export default function WishlistProduct() {
  const { wishlist } = useSelector((state) => state.wishlistSlice);

  return (
    <div className="font-['Poppins'] max-w-7xl mx-auto px-6 py-16">

      {/* Page Header */}
      <div className="flex justify-between items-center mt-24 mb-10">
        <h1 className="text-4xl font-semibold text-black">
          My Wishlist
        </h1>

        <span className="text-lg text-gray-600">
          {wishlist.length} Products
        </span>
      </div>

      {/* If Empty */}
      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-3 text-black">
            Your wishlist is empty 💔
          </h2>
          <p className="text-lg text-gray-500">
            Start adding products you love.
          </p>
        </div>
      ) : (
        /* Grid Layout (Same as Shop) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
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