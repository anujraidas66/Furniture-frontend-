import { useState } from "react";
import { useParams, Link as RouterLink, Link } from "react-router-dom";
import { useGetProductQuery, useGetRelatedProductsQuery } from "./productApi";
import { base } from "../../app/mainApi";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../cart/CartSlice";
import toast from "react-hot-toast";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ReviewList from "../review/ReviewList";
import ReviewForm from "../review/ReviewForm";
import ProductCard from "../products/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  const { isLoading, error, data } = useGetProductQuery(id);
  const { data: relatedData, isLoading: relatedLoading } = useGetRelatedProductsQuery(id);

  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.data?.message || "Error loading product"}</p>;

  const images = Array.isArray(data.product.image) ? data.product.image : [data.product.image];
  const selectedImage = mainImage || images[0];

  const handleAddToCart = () => {
    if (!selectedColor) return toast.error("Please select a color");
    if (!selectedSize) return toast.error("Please select a size");

    const productToAdd = {
      id: data.product._id,
      title: data.product.title,
      price: data.product.price,
      image: images,
      stock: data.product.stock,
      color: selectedColor,
      size: selectedSize,
      qty,
    };

    dispatch(setCart(productToAdd));
    toast.success("Product added to cart!");
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">

        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <RouterLink to="/">Home</RouterLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <RouterLink to="/shop">Shop</RouterLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="font-bold text-black">{data.product.title}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="w-full h-[400px] sm:h-[500px] overflow-hidden rounded-lg">
            <img
              src={`${base}/${selectedImage}`}
              alt={data.product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={`${base}/${img}`}
                alt=""
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-200"}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{data.product.title}</h1>
          <p className="text-xl sm:text-2xl text-yellow-700">Rs. {data.product.price}</p>
          <p className="text-gray-600">{data.product.shortDescription || data.product.description}</p>

          {/* Color */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">Color:</span>
            {data.product.colors.map((color, idx) => (
              <button
                key={idx}
                style={{ backgroundColor: color }}
                className={`w-6 h-6 rounded-full border ${selectedColor === color ? "border-black" : "border-gray-300"}`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          {/* Size */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">Size:</span>
            {data.product.sizes.map((size, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-gray-200" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">Quantity:</span>
            <button onClick={() => qty > 1 && setQty(qty - 1)} className="px-3 py-1 border rounded">-</button>
            <span>{qty}</span>
            <button onClick={() => qty < data.product.stock && setQty(qty + 1)} className="px-3 py-1 border rounded">+</button>
          </div>

          <button
            disabled={user?.role === "admin"}
            onClick={handleAddToCart}
            className="bg-yellow-400 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-10">
        <div className="flex gap-4 border-b pb-2 overflow-x-auto">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-semibold whitespace-nowrap ${
                activeTab === tab ? "text-black border-b-2 border-black" : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {activeTab === "description" && (
            <>
              <p className="text-gray-600">{data.product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.slice(0, 2).map((img, idx) => (
                  <img
                    key={idx}
                    src={`${base}/${img}`}
                    alt=""
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </>
          )}
          {activeTab === "additional" && (
            <p className="text-gray-600">{data.product.additionalInfo || "No additional information."}</p>
          )}
          {activeTab === "reviews" && (
            <div>
              {user ? <ReviewForm productId={id} /> : <p>Please <Link to="/login" className="text-blue-500">login</Link> to review.</p>}
              <ReviewList productId={id} />
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        {relatedLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedData?.products?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useParams, Link as RouterLink, Link } from "react-router-dom";
// import { useGetProductQuery, useGetRelatedProductsQuery } from "./productApi";
// import { base } from "../../app/mainApi";
// import { useDispatch, useSelector } from "react-redux";
// import { setCart } from "../cart/CartSlice";
// import toast from "react-hot-toast";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// import ReviewList from "../review/ReviewList";
// import ReviewForm from "../review/ReviewForm";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { isLoading, error, data } = useGetProductQuery(id);
//   const { data: relatedData, isLoading: relatedLoading } =
//     useGetRelatedProductsQuery(id);

//   const [mainImage, setMainImage] = useState(null);
//   const [activeTab, setActiveTab] = useState("description");
//   const { user } = useSelector((state) => state.userSlice);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [qty, setQty] = useState(1);

//   if (isLoading) return <div>Loading...</div>;
//   if (error)
//     return <div>{error.data?.message || "Error loading product"}</div>;

//   const images = Array.isArray(data.product.image)
//     ? data.product.image
//     : [data.product.image];

//   const selectedImage = mainImage || images[0];

//   const handleAddToCart = () => {
//     if (!selectedColor) return toast.error("Please select a color");
//     if (!selectedSize) return toast.error("Please select a size");

//     const productToAdd = {
//       id: data.product._id,
//       title: data.product.title,
//       price: data.product.price,
//       image: images,
//       stock: data.product.stock,
//       color: selectedColor,
//       size: selectedSize,
//       qty,
//     };

//     dispatch(setCart(productToAdd));
//     toast.success("Product added to cart!");
//   };

//   return (
//     <div className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

//       {/* LEFT SIDE */}
//       <div className="flex flex-col gap-4">

//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <RouterLink to="/">Home</RouterLink>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <RouterLink to="/shop">Shop</RouterLink>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <span className="font-bold text-black">
//                 {data.product.title}
//               </span>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>

//         {/* Main Image */}
//         <div className="w-full h-[500px]">
//           <img
//             src={`${base}/${selectedImage}`}
//             alt={data.product.title}
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>

//         {/* Thumbnails */}
//         <div className="flex gap-3">
//           {images.map((img, idx) => (
//             <img
//               key={idx}
//               src={`${base}/${img}`}
//               alt=""
//               className={`w-20 h-20 object-cover rounded cursor-pointer border ${
//                 selectedImage === img
//                   ? "border-black"
//                   : "border-gray-200"
//               }`}
//               onClick={() => setMainImage(img)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="space-y-5">
//         <h1 className="text-3xl font-bold">
//           {data.product.title}
//         </h1>

//         <p className="text-2xl text-yellow-700">
//           Rs. {data.product.price}
//         </p>

//         <p className="text-gray-600">
//           {data.product.shortDescription || data.product.description}
//         </p>

//         {/* Color */}
//         <div className="flex items-center gap-3">
//           <span className="font-semibold">Color:</span>
//           {data.product.colors.map((color, idx) => (
//             <button
//               key={idx}
//               style={{ backgroundColor: color }}
//               className={`w-6 h-6 rounded-full border ${
//                 selectedColor === color
//                   ? "border-black"
//                   : "border-gray-300"
//               }`}
//               onClick={() => setSelectedColor(color)}
//             />
//           ))}
//         </div>

//         {/* Size */}
//         <div className="flex items-center gap-3">
//           <span className="font-semibold">Size:</span>
//           {data.product.sizes.map((size, idx) => (
//             <button
//               key={idx}
//               className={`px-3 py-1 border rounded ${
//                 selectedSize === size ? "bg-gray-200" : ""
//               }`}
//               onClick={() => setSelectedSize(size)}
//             >
//               {size}
//             </button>
//           ))}
//         </div>

//         {/* Quantity */}
//         <div className="flex items-center gap-3">
//           <span className="font-semibold">Quantity:</span>
//           <button
//             onClick={() => qty > 1 && setQty(qty - 1)}
//             className="px-3 py-1 border rounded"
//           >
//             -
//           </button>
//           <span>{qty}</span>
//           <button
//             onClick={() =>
//               qty < data.product.stock && setQty(qty + 1)
//             }
//             className="px-3 py-1 border rounded"
//           >
//             +
//           </button>
//         </div>

//         <button
//           disabled={user?.role === "admin"}
//           onClick={handleAddToCart}
//           className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
//         >
//           Add to Cart
//         </button>
//       </div>

//       {/* TABS SECTION */}
//       <div className="col-span-2 mt-16">

//         {/* Tab Buttons */}
//         <div className="flex gap-10 border-b pb-3">
//           <button
//             onClick={() => setActiveTab("description")}
//             className={`font-semibold ${
//               activeTab === "description"
//                 ? "text-black border-b-2 border-black"
//                 : "text-gray-500"
//             }`}
//           >
//             Description
//           </button>

//           <button
//             onClick={() => setActiveTab("additional")}
//             className={`font-semibold ${
//               activeTab === "additional"
//                 ? "text-black border-b-2 border-black"
//                 : "text-gray-500"
//             }`}
//           >
//             Additional Information
//           </button>

//           <button
//             onClick={() => setActiveTab("reviews")}
//             className={`font-semibold ${
//               activeTab === "reviews"
//                 ? "text-black border-b-2 border-black"
//                 : "text-gray-500"
//             }`}
//           >
//             Reviews
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="mt-8">

//           {/* DESCRIPTION TAB */}
//           {activeTab === "description" && (
//             <div>
//               <p className="text-gray-600 max-w-4xl mb-6">
//                 {data.product.description}
//               </p>

//               {/* Two Images */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {images.slice(0, 2).map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={`${base}/${img}`}
//                     alt=""
//                     className="w-full h-[350px] object-cover rounded-lg"
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ADDITIONAL INFO TAB */}
//           {activeTab === "additional" && (
//             <p className="text-gray-600 max-w-4xl">
//               {data.product.additionalInfo ||
//                 "Crafted with premium materials and designed for durability, this product offers both functionality and timeless style."}
//             </p>
//           )}

//           {/* REVIEWS TAB */}
//           {activeTab === "reviews" && (
//             <div>
//               {user ? (
//                 <ReviewForm productId={id} />
//               ) : (
//                 <p className="text-gray-600 mb-4">
//                   Please{" "}
//                   <Link to="/login" className="text-blue-500">
//                     login
//                   </Link>{" "}
//                   to add a review.
//                 </p>
//               )}
//               <ReviewList productId={id} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* RELATED PRODUCTS */}
//       <div className="col-span-2 mt-16">
//         <h3 className="text-2xl font-bold mb-6">
//           Related Products
//         </h3>

//         {relatedLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {relatedData?.products?.map((item) => (
//               <div key={item._id} className="border rounded p-3">
//                 <img
//                   src={`${base}/${item.image[0]}`}
//                   alt=""
//                   className="w-full h-40 object-cover rounded"
//                 />
//                 <h4 className="mt-2 font-semibold">
//                   {item.title}
//                 </h4>
//                 <p className="text-yellow-700">
//                   Rs. {item.price}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

