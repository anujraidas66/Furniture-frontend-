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
import { useSearchParams } from "react-router-dom";
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

  // Update filters when URL search param changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery, page: 1 }));
  }, [searchQuery]);

  const { data, isLoading, error } = useGetProductsQuery(filters);

  const startResult = data?.total === 0 ? 0 : (data?.page - 1) * filters.limit + 1;
  const endResult = data?.page * filters.limit > data?.total ? data?.total : data?.page * filters.limit;

  const handleLimitChange = (e) => setFilters({ ...filters, limit: Number(e.target.value), page: 1 });
  const handleSortChange = (e) => setFilters({ ...filters, sort: e.target.value, page: 1 });
  const handleCategoryChange = (category) => setFilters({ ...filters, category, page: 1 });
  const handlePriceChange = (min, max) => setFilters({ ...filters, minPrice: min, maxPrice: max, page: 1 });
  const goToPage = (page) => setFilters({ ...filters, page });

  return (
    <div className="max-w-7xl mx-auto px-8 mt-10 flex gap-6">
      
      {/* Sidebar Filters */}
      <div className="w-64 border p-4 space-y-6">
        <h2 className="font-semibold text-lg mb-2">Category</h2>
        <ul className="space-y-2">
          {["All", "Table", "Chair", "Bed"].map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategoryChange(cat === "All" ? "" : cat.toLowerCase())}
              className={`cursor-pointer ${filters.category === cat.toLowerCase() ? "font-bold text-blue-500" : ""}`}
            >
              {cat}
            </li>
          ))}
        </ul>

        <h2 className="font-semibold text-lg mb-2">Price Range</h2>
        <div className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange(e.target.value, filters.maxPrice)}
            className="border px-2 py-1"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange(filters.minPrice, e.target.value)}
            className="border px-2 py-1"
          />
        </div>
      </div>

      {/* Products & Controls */}
      <div className="flex-1">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-8 text-sm text-gray-600 gap-4">
          <p>
            Showing {startResult}–{endResult} of {data?.total || 0} results
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <button onClick={() => setView("grid")} className={view === "grid" ? "font-semibold" : "text-gray-500"}>Grid</button>
              <button onClick={() => setView("list")} className={view === "list" ? "font-semibold" : "text-gray-500"}>List</button>
            </div>

            <div className="flex items-center gap-2">
              <span>Show</span>
              <select value={filters.limit} onChange={handleLimitChange} className="border px-2 py-1">
                {[8, 12, 16, 24].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>Sort by</span>
              <select value={filters.sort} onChange={handleSortChange} className="border px-2 py-1">
                <option value="newest">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-4 gap-10">
            {Array(16).fill().map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : error ? (
          <p className="text-red-500">Something went wrong</p>
        ) : (
          <>
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14" : "space-y-8"}>
              {data?.products?.map((product) => <ProductCard key={product._id} product={product} view={view} />)}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-14">
              <button disabled={filters.page === 1} onClick={() => goToPage(filters.page - 1)} className="w-9 h-9 border text-sm disabled:opacity-40">‹</button>
              {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
                <button key={i} onClick={() => goToPage(i + 1)} className={`w-9 h-9 border text-sm ${filters.page === i + 1 ? "bg-yellow-500 text-white border-yellow-500" : "hover:bg-gray-100"}`}>{i + 1}</button>
              ))}
              <button disabled={filters.page === data?.totalPages} onClick={() => goToPage(filters.page + 1)} className="w-9 h-9 border text-sm disabled:opacity-40">›</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
