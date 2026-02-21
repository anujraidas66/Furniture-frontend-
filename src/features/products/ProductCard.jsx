// import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
// import { base } from '../../app/mainApi'
// import { useNavigate } from 'react-router'
// export default function ProductCard({product}) {
//   const nav = useNavigate();
//     return (
//       <div 
//       onClick={()=>nav(`/products/${product._id}`)}
//       className='hover:scale-[103%] transition cursor-pointer duration-75 ease-in delay-300' >
//          <Card className='pt-0'>
//       <CardContent className='px-0'>
//         <img
//           src={`${base}/${product.image}`}
//           alt='Banner'
//           className='aspect-video h-70 rounded-t-xl object-cover'
//         />
//       </CardContent>
//       <CardHeader>
//         <CardTitle>{product.title}</CardTitle>
//         <CardDescription> Rs.{product.price}</CardDescription>
//       </CardHeader>
//     </Card>
//     </div>
//     )
// }
import { useNavigate } from "react-router";
import { base } from "../../app/mainApi";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { toggleWishlist } from "../wishlist/WishListSlice";

export default function ProductCard({ product, view = "grid" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wishlist } = useSelector(
    (state) => state.wishlistSlice
  );

  const imageSrc = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  const isWishlisted = wishlist.some(
    (item) => item.id === product._id
  );

  const handleWishlist = (e) => {
    e.stopPropagation(); // prevent navigate

    dispatch(
      toggleWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        image: imageSrc,
      })
    );
  };

  /* =========================================================
      LIST VIEW
  ========================================================== */
  if (view === "list") {
    return (
      <div
        onClick={() => navigate(`/products/${product._id}`)}
        className="flex gap-6 border-b pb-6 cursor-pointer group hover:bg-gray-50 transition relative"
      >
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
        >
          <FaHeart
            className={`${
              isWishlisted ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Image */}
        <div className="w-64 h-48 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={`${base}/${imageSrc}`}
            alt={product.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black transition">
              {product.title}
            </h3>

            <p className="text-gray-500 mt-2 line-clamp-3">
              {product.description}
            </p>
          </div>

          <p className="text-lg font-medium text-gray-800 mt-4">
            Rs. {Number(product.price).toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
      GRID VIEW (Default)
  ========================================================== */
  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <img
          src={`${base}/${imageSrc}`}
          alt={product.title}
          className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
        >
          <FaHeart
            className={`${
              isWishlisted ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-black transition">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500">
          Rs. {Number(product.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}


