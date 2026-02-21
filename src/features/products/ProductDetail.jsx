
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


export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, data } = useGetProductQuery(id);
  const { data: relatedData, isLoading: relatedLoading } = useGetRelatedProductsQuery(id);
  const [mainImage, setMainImage] = useState(null);
  const { user } = useSelector((state) => state.userSlice);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.data?.message || "Error loading product"}</div>;

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
    <div className="max-w-7xl mx-auto mt-25 grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
      {/* Left: Gallery */}
      <div className="flex flex-col gap-4">
        {/* Breadcrumb + Product Title */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-gray-600 text-sm md:text-base">
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
        </div>

        {/* Main Image */}
        <div className="w-full h-[500px]">
          <img
            src={`${base}/${selectedImage}`}
            alt={data.product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-3 mt-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={`${base}/${img}`}
              alt={`Thumbnail ${idx + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                selectedImage === img ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">{data.product.title}</h1>
        <p className="text-xl text-yellow-700">Rs. {data.product.price}</p>
        <p className="text-zinc-500">Stock: {data.product.stock}</p>
        <p className="text-gray-600">{data.product.description}</p>

        {/* Color Selection */}
        <div className="flex items-center gap-3">
          <span className="font-semibold">Color:</span>
          {data.product.colors.map((color, idx) => (
            <button
              key={idx}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 rounded-full border cursor-pointer ${
                selectedColor === color ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        {/* Size Selection */}
        <div className="flex items-center gap-3">
          <span className="font-semibold">Size:</span>
          {data.product.sizes.map((size, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 border rounded hover:bg-gray-100 ${
                selectedSize === size ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* SKU */}
        <p className="text-zinc-500">
          <span className="font-semibold">SKU:</span> {data.product.sku}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="font-semibold text-zinc-500">Tags:</span>
          {data.product.tags?.map((tag, idx) => (
            <span key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <span className="font-semibold">Quantity:</span>
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{qty}</span>
          <button
            onClick={() => qty < data.product.stock && setQty(qty + 1)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          disabled={user?.role === "admin"}
          onClick={handleAddToCart}
          className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Add to Cart
        </button>
      </div>

   

      {/* Related Products */}
      <div className="col-span-2 mt-10">
        <h3 className="text-xl font-bold mb-4">Related Products</h3>

        {relatedLoading ? (
          <p>Loading related products...</p>
        ) : relatedData?.products?.length === 0 ? (
          <p>No related products found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {relatedData.products.map((item) => (
                <div key={item._id} className="border rounded p-2">
                  <img
                    src={`${base}/${item.image[0]}`}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="mt-2 font-semibold">{item.title}</h4>
                  <p className="text-yellow-700">Rs. {item.price}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Link
                to="/shop"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              >
                View More
              </Link>
            </div>
          </>
        )}


       <div className="col-span-2 mt-10 p-5 border-t">
  <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
  {user ? (
    <ReviewForm productId={id} />
  ) : (
    <p className="text-gray-600">
      Please <Link to="/login" className="text-blue-500">login</Link> to add a review.
    </p>
  )}
  <ReviewList productId={id} />
</div>


      </div>


  
    </div>
  );
}


