// import { useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useGetProductsQuery } from "../products/productApi";
// import { base } from "../../app/mainApi";

// export default function ProductBlog() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");

//   const { data, isLoading, isError } = useGetProductsQuery({
//     page,
//     limit: 3,
//     search,
//     category,
//     sort: "newest",
//   });

//   const categories = ["Craft", "Design", "Handmade", "Interior", "Wood"];

//   /* ================= IMAGE HELPER ================= */
//   const getImage = (product) => {
//     if (!product?.image) {
//       return "https://via.placeholder.com/800x500";
//     }

//     const imageSrc = Array.isArray(product.image)
//       ? product.image[0]
//       : product.image;

//     return `${base}/${imageSrc}`;
//   };

//   /* ================= CATEGORY COUNT ================= */
//   const categoryCounts = useMemo(() => {
//     const counts = {};
//     data?.products?.forEach((product) => {
//       if (product.category) {
//         counts[product.category] =
//           (counts[product.category] || 0) + 1;
//       }
//     });
//     return counts;
//   }, [data]);

//   if (isLoading)
//     return <p className="text-center py-20 text-lg">Loading...</p>;

//   if (isError)
//     return (
//       <p className="text-center py-20 text-red-500">
//         Something went wrong
//       </p>
//     );

//   return (
//     <div>

//       {/* ================= BANNER ================= */}
//       <div className="relative w-full mt-16 h-80 overflow-hidden">
//         <img
//           src="/image/checkout.jpg"
//           alt="Blog Banner"
//           className="absolute inset-0 w-full h-full object-cover blur-[3px]"
//         />
//         <div className="absolute inset-0 bg-white/40"></div>

//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
//           <img
//             src="/image/meubalhouse.png"
//             alt="Logo"
//             className="w-20 h-20"
//           />
//           <h1 className="text-black text-5xl font-medium font-['Poppins']">Blog</h1>

//           <div className="flex items-center gap-2 mt-4 text-base">
//             <Link to="/" className="text-black text-base font-medium font-['Poppins']">
//               Home
//             </Link>
//             <span>›</span>
//             <span className="text-black text-base font-light font-['Poppins']">Blog</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= BLOG SECTION ================= */}
//       <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

//         {/* ================= LEFT: BLOG POSTS ================= */}
//         <div className="md:col-span-3 space-y-16">
//           {data?.products?.map((product) => (
//             <div key={product._id} className="space-y-6">

//               <img
//                 src={getImage(product)}
//                 alt={product.title}
//                 className="w-full h-[420px] object-cover rounded-lg"
//               />

//               <p className="text-xs uppercase tracking-widest text-gray-400">
//                 {product.category}
//               </p>

//               <h2 className="text-3xl font-semibold text-gray-800">
//                 {product.title}
//               </h2>

//               <div className="text-sm text-gray-400 flex gap-6">
//                 <span>{new Date(product.createdAt).toDateString()}</span>
//               </div>

//               <p className="text-gray-600 leading-relaxed">
//                 {product.description?.slice(0, 250)}...
//               </p>

//               <Link
//                 to={`/products/${product._id}`}
//                 className="inline-block text-sm font-semibold text-black border-b border-black hover:opacity-70 transition"
//               >
//                 Read more
//               </Link>

//               <hr />
//             </div>
//           ))}

//           {/* ================= PAGINATION ================= */}
//           {data?.totalPages > 1 && (
//             <div className="flex justify-center gap-3 pt-10">
//               {Array.from({ length: data.totalPages }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setPage(index + 1)}
//                   className={`w-10 h-10 rounded ${
//                     page === index + 1
//                       ? "bg-yellow-500 text-white"
//                       : "bg-gray-200 hover:bg-gray-300"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ================= RIGHT: SIDEBAR ================= */}
//         <div className="space-y-12">

//           {/* Search */}
//           <div>
//             <h3 className="font-semibold mb-4">Search</h3>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="text-black text-2xl font-medium font-['Poppins']">Categories</h3>
//             <ul className="space-y-3 text-gray-600">
//               {categories.map((cat) => (
//                 <li
//                   key={cat}
//                   onClick={() => {
//                     setCategory(cat);
//                     setPage(1);
//                   }}
//                   className={`flex justify-between cursor-pointer hover:text-black ${
//                     category === cat ? "font-semibold text-black" : ""
//                   }`}
//                 >
//                   <span>{cat}</span>
//                   <span className="text-sm text-gray-400">
//                     ({categoryCounts[cat] || 0})
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Recent Posts */}
//           <div>
//             <h3 className="font-semibold mb-6">Recent Posts</h3>
//             {data?.products?.slice(0, 3).map((product) => (
//               <Link
//                 key={product._id}
//                 to={`/products/${product._id}`}
//                 className="flex gap-4 mb-4"
//               >
//                 <img
//                   src={getImage(product)}
//                   alt={product.title}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     {product.title}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {new Date(product.createdAt).toDateString()}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>

//         </div>
//       </div>

//       {/* ================= FEATURES SECTION ================= */}
//       <div className="bg-[#F9F1E7] py-16">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
//           <div>
//             <h3 className="text-xl font-semibold mb-3">Free Delivery</h3>
//             <p className="text-gray-500 text-sm">
//               For all orders over $50.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">90 Days Return</h3>
//             <p className="text-gray-500 text-sm">
//               If goods have problems.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
//             <p className="text-gray-500 text-sm">
//               100% secure payment.
//             </p>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }



import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../products/productApi";
import { base } from "../../app/mainApi";

export default function ProductBlog() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data, isLoading, isError } = useGetProductsQuery({
    page,
    limit: 3,
    search,
    category,
    sort: "newest",
  });

  const categories = ["Craft", "Design", "Handmade", "Interior", "Wood"];

  const getImage = (product) => {
    if (!product?.image) {
      return "https://via.placeholder.com/800x500";
    }

    const imageSrc = Array.isArray(product.image)
      ? product.image[0]
      : product.image;

    return `${base}/${imageSrc}`;
  };

  const categoryCounts = useMemo(() => {
    const counts = {};
    data?.products?.forEach((product) => {
      if (product.category) {
        counts[product.category] =
          (counts[product.category] || 0) + 1;
      }
    });
    return counts;
  }, [data]);

  if (isLoading)
    return <p className="text-center py-20 text-lg">Loading...</p>;

  if (isError)
    return (
      <p className="text-center py-20 text-red-500">
        Something went wrong
      </p>
    );

  return (
    <div className="font-['Poppins']">

      {/* ================= BANNER ================= */}
      <div className="relative w-full mt-16 h-80 overflow-hidden">
        <img
          src="/image/checkout.jpg"
          alt="Blog Banner"
          className="absolute inset-0 w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img
            src="/image/meubalhouse.png"
            alt="Logo"
            className="w-20 h-20"
          />

          {/* Figma size */}
          <h1 className="text-black text-5xl font-medium">
            Blog
          </h1>

          <div className="flex items-center gap-3 mt-4">
            <Link to="/" className="text-black text-base font-medium">
              Home
            </Link>

            {/* Increased arrow size */}
            <span className="text-2xl font-medium">›</span>

            <span className="text-black text-base font-light">
              Blog
            </span>
          </div>
        </div>
      </div>

      {/* ================= BLOG SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* ================= LEFT ================= */}
        <div className="md:col-span-3 space-y-20">
          {data?.products?.map((product) => (
            <div key={product._id} className="space-y-7">

              <img
                src={getImage(product)}
                alt={product.title}
                className="w-full h-[420px] object-cover rounded-lg"
              />

              {/* Category */}
              <p className="text-neutral-400 text-sm uppercase tracking-widest">
                {product.category}
              </p>

              {/* Figma Title */}
              <h2 className="text-black text-3xl font-medium leading-10">
                {product.title}
              </h2>

              {/* Date */}
              <div className="text-neutral-400 text-sm flex gap-6">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>

              {/* Figma Description */}
              <p className="text-neutral-400 text-base leading-7">
                {product.description?.slice(0, 250)}...
              </p>

              <Link
                to={`/products/${product._id}`}
                className="inline-block text-black text-base font-medium border-b border-black pb-1 hover:opacity-70 transition"
              >
                Read more
              </Link>

              <hr />
            </div>
          ))}

          {/* ================= PAGINATION ================= */}
          {data?.totalPages > 1 && (
            <div className="flex justify-center gap-3 pt-10">
              {Array.from({ length: data.totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`w-10 h-10 rounded ${
                    page === index + 1
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="space-y-14">

          {/* Search */}
          <div>
            <h3 className="text-black text-2xl font-medium mb-6">
              Search
            </h3>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-black text-2xl font-medium mb-8">
              Categories
            </h3>

            <ul className="space-y-6">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setPage(1);
                  }}
                  className={`flex justify-between cursor-pointer ${
                    category === cat
                      ? "text-black font-medium"
                      : "text-neutral-400"
                  }`}
                >
                  <span className="text-base">
                    {cat}
                  </span>
                  <span className="text-base">
                    {categoryCounts[cat] || 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-black text-2xl font-medium mb-8">
              Recent Posts
            </h3>

            {data?.products?.slice(0, 3).map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="flex gap-4 mb-6"
              >
                <img
                  src={getImage(product)}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="text-black text-sm font-normal leading-5">
                    {product.title}
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">
                    {new Date(product.createdAt).toDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="bg-[#F9F1E7] py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          <div>
            <h3 className="text-black text-3xl font-medium mb-4">
              Free Delivery
            </h3>
            <p className="text-neutral-400 text-xl">
              For all orders over $50.
            </p>
          </div>

          <div>
            <h3 className="text-black text-3xl font-medium mb-4">
              90 Days Return
            </h3>
            <p className="text-neutral-400 text-xl">
              If goods have problems.
            </p>
          </div>

          <div>
            <h3 className="text-black text-3xl font-medium mb-4">
              Secure Payment
            </h3>
            <p className="text-neutral-400 text-xl">
              100% secure payment.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}