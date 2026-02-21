// import { useGetProductsQuery } from "../products/productApi";
// import ProductCard from "../products/ProductCard";
// import ProductSkeleton from "./ProductSkeleton";

// export default function Shop() {
//     const {isLoading,error,data} = useGetProductsQuery();
// if(isLoading) return  <div className="grid grid-cols-4 gap-4 mt-4 items-start"  >
// <ProductSkeleton/>
// <ProductSkeleton/>
// <ProductSkeleton/>
// <ProductSkeleton/>
// <ProductSkeleton/>
// <ProductSkeleton/>
// <ProductSkeleton/>
// <ProductSkeleton/>

//  </div>
//     if(error) return <div>{error.message}</div>;
//     console.log(data);
//     return (
// <div>
        
//         <div className="grid grid-cols-4 gap-7 mt-4 items-start"  >
//            {data.products.map((product)=> {
//             return  <ProductCard key={product._id} product = {product} />
//            })}
//         </div>

//         </div>
//     )
// }

import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../products/productApi";
import ProductCard from "../products/ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function Shop() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 16,
    sort: "newest",
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  const [view, setView] = useState("grid");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery, page: 1 }));
  }, [searchQuery]);

  const { data, isLoading, error } = useGetProductsQuery(filters);

  const startResult =
    data?.total === 0 ? 0 : (data?.page - 1) * filters.limit + 1;

  const endResult =
    data?.page * filters.limit > data?.total
      ? data?.total
      : data?.page * filters.limit;

  const handleLimitChange = (e) =>
    setFilters({ ...filters, limit: Number(e.target.value), page: 1 });

  const handleSortChange = (e) =>
    setFilters({ ...filters, sort: e.target.value, page: 1 });

  const handleCategoryChange = (category) =>
    setFilters({ ...filters, category, page: 1 });

  const handlePriceChange = (min, max) =>
    setFilters({ ...filters, minPrice: min, maxPrice: max, page: 1 });

  const goToPage = (page) => setFilters({ ...filters, page });

  return (
    <div className="font-['Poppins']">

      {/* ================= BANNER ================= */}
      <div className="relative w-full mt-16 h-80 overflow-hidden">
        <img
          src="/image/checkout.jpg"
          alt="Shop Banner"
          className="absolute inset-0 w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img
            src="/image/meubalhouse.png"
            alt="Logo"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-5xl font-medium text-black">Shop</h1>

          <div className="flex items-center gap-3 mt-4 text-base">
            <Link to="/" className="font-medium text-black">
              Home
            </Link>
            <span className="text-2xl font-medium">›</span>
            <span className="font-light text-black">Shop</span>
          </div>
        </div>
      </div>

      {/* ================= SHOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-8 mt-16 flex gap-6">

        {/* Sidebar */}
        <div className="w-64 border p-4 space-y-6">
          <h2 className="font-medium text-xl mb-2 text-black">Category</h2>
          <ul className="space-y-2 text-base text-black">
            {["All", "Table", "Chair", "Bed"].map((cat) => (
              <li
                key={cat}
                onClick={() =>
                  handleCategoryChange(cat === "All" ? "" : cat.toLowerCase())
                }
                className={`cursor-pointer ${
                  filters.category === cat.toLowerCase()
                    ? "font-semibold text-yellow-600"
                    : ""
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>

          <h2 className="font-medium text-xl mb-2 text-black">Price Range</h2>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                handlePriceChange(e.target.value, filters.maxPrice)
              }
              className="border px-3 py-2 text-base text-black rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                handlePriceChange(filters.minPrice, e.target.value)
              }
              className="border px-3 py-2 text-base text-black rounded"
            />
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">

          {/* Top Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-8 text-base text-gray-700 gap-4">
            <p>
              Showing {startResult}–{endResult} of {data?.total || 0} results
            </p>

            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <button
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "font-semibold" : "text-gray-500"}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={view === "list" ? "font-semibold" : "text-gray-500"}
                >
                  List
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={filters.limit}
                  onChange={handleLimitChange}
                  className="border px-3 py-2 text-base text-black rounded"
                >
                  {[8, 12, 16, 24].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>Sort by</span>
                <select
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="border px-3 py-2 text-base text-black rounded"
                >
                  <option value="newest">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {isLoading ? (
            <div className="grid grid-cols-4 gap-10">
              {Array(16)
                .fill()
                .map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
            </div>
          ) : error ? (
            <p className="text-red-500 text-base">Something went wrong</p>
          ) : (
            <>
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14"
                    : "space-y-8"
                }
              >
                {data?.products?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    view={view}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-14">
                <button
                  disabled={filters.page === 1}
                  onClick={() => goToPage(filters.page - 1)}
                  className="w-9 h-9 border text-base disabled:opacity-40"
                >
                  ‹
                </button>

                {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`w-9 h-9 border text-base ${
                      filters.page === i + 1
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={filters.page === data?.totalPages}
                  onClick={() => goToPage(filters.page + 1)}
                  className="w-9 h-9 border text-base disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <div className="bg-[#F9F1E7] py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-medium mb-4 text-black">Free Delivery</h3>
            <p className="text-xl text-neutral-400">For all orders over $50.</p>
          </div>
          <div>
            <h3 className="text-3xl font-medium mb-4 text-black">90 Days Return</h3>
            <p className="text-xl text-neutral-400">If goods have problems.</p>
          </div>
          <div>
            <h3 className="text-3xl font-medium mb-4 text-black">Secure Payment</h3>
            <p className="text-xl text-neutral-400">100% secure payment.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { useGetProductsQuery } from "../products/productApi";
// import ProductCard from "../products/ProductCard";
// import ProductSkeleton from "./ProductSkeleton";

// export default function Shop() {
//   const [showFilter, setShowFilter] = useState(false);

//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 16,
//     sort: "newest",
//     category: "",
//     minPrice: "",
//     maxPrice: "",
//     search: "",
//   });

//   const [searchParams] = useSearchParams();
//   const searchQuery = searchParams.get("search") || "";

//   useEffect(() => {
//     setFilters((prev) => ({ ...prev, search: searchQuery, page: 1 }));
//   }, [searchQuery]);

//   const { data, isLoading, error } = useGetProductsQuery(filters);

//   const startResult =
//     data?.total === 0 ? 0 : (data?.page - 1) * filters.limit + 1;

//   const endResult =
//     data?.page * filters.limit > data?.total
//       ? data?.total
//       : data?.page * filters.limit;

//   const goToPage = (page) => setFilters({ ...filters, page });

//   return (
//     <div className="bg-white">

//       {/* ================= HERO / BANNER ================= */}
//       <div className="relative mt-24 w-full h-80 overflow-hidden">
//         <img
//           src="/image/checkout.jpg"
//           alt="Shop Banner"
//           className="absolute inset-0 w-full h-full object-cover blur-[3px]"
//         />
//         <div className="absolute inset-0 bg-white/40"></div>

//         {/* Logo + nav links inside hero */}
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
//           <img src="/image/meubalhouse.png" alt="Logo" className="w-16 h-16 mb-4" />
//           <h1 className="text-5xl font-medium text-black">Shop</h1>

//           <div className="flex items-center gap-2 mt-4 text-base">
//             <Link to="/" className="font-medium text-black">Home</Link>
//             <span>›</span>
//             <span className="font-light text-black">Shop</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= FILTER + TOP CONTROLS ================= */}
//       <div className="max-w-7xl mx-auto px-8 mt-10 flex gap-6">

//         {/* Sidebar Filter (conditionally visible) */}
//         {showFilter && (
//           <div className="w-64 border p-4 space-y-6">
//             <h2 className="font-semibold text-lg mb-2">Category</h2>
//             <ul className="space-y-2">
//               {["All", "Table", "Chair", "Bed"].map((cat) => (
//                 <li
//                   key={cat}
//                   onClick={() =>
//                     setFilters({
//                       ...filters,
//                       category: cat === "All" ? "" : cat.toLowerCase(),
//                       page: 1,
//                     })
//                   }
//                   className={`cursor-pointer ${
//                     filters.category === cat.toLowerCase() ? "font-bold text-yellow-600" : ""
//                   }`}
//                 >
//                   {cat}
//                 </li>
//               ))}
//             </ul>

//             <h2 className="font-semibold text-lg mb-2">Price Range</h2>
//             <div className="flex flex-col gap-2">
//               <input
//                 type="number"
//                 placeholder="Min"
//                 value={filters.minPrice}
//                 onChange={(e) =>
//                   setFilters({ ...filters, minPrice: e.target.value, page: 1 })
//                 }
//                 className="border px-2 py-1"
//               />
//               <input
//                 type="number"
//                 placeholder="Max"
//                 value={filters.maxPrice}
//                 onChange={(e) =>
//                   setFilters({ ...filters, maxPrice: e.target.value, page: 1 })
//                 }
//                 className="border px-2 py-1"
//               />
//             </div>
//           </div>
//         )}

//         {/* Products + Controls */}
//         <div className="flex-1">
          
//           {/* Top Controls */}
//           <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-8 text-sm text-gray-600 gap-4">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className="px-3 py-1 border rounded"
//               >
//                 Filter
//               </button>
//               <p>
//                 Showing {startResult}–{endResult} of {data?.total || 0} results
//               </p>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex gap-3">
//                 <button
//                   className="font-semibold"
//                   // optional: view toggle logic here
//                 >
//                   Grid
//                 </button>
//                 <button className="text-gray-500">List</button>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span>Show</span>
//                 <select
//                   value={filters.limit}
//                   onChange={(e) =>
//                     setFilters({ ...filters, limit: Number(e.target.value), page: 1 })
//                   }
//                   className="border px-2 py-1"
//                 >
//                   {[8, 12, 16, 24].map((n) => (
//                     <option key={n} value={n}>{n}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span>Sort by</span>
//                 <select
//                   value={filters.sort}
//                   onChange={(e) =>
//                     setFilters({ ...filters, sort: e.target.value, page: 1 })
//                   }
//                   className="border px-2 py-1"
//                 >
//                   <option value="newest">Default</option>
//                   <option value="price-asc">Price: Low to High</option>
//                   <option value="price-desc">Price: High to Low</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Products */}
//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-10">
//               {Array(16).fill().map((_, i) => <ProductSkeleton key={i} />)}
//             </div>
//           ) : error ? (
//             <p className="text-red-500">Something went wrong</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14">
//               {data?.products?.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }
