import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../features/products/productApi";
import { base } from "../../app/mainApi";
import { FiClock } from "react-icons/fi";

export default function Home() {

  // ✅ Featured products (ONLY 2)
  const { data: featuredData } = useGetProductsQuery({ limit: 2 });
  const featuredProducts = featuredData?.products || [];

  // Top Picks products (limit 4)
  const { data: topData } = useGetProductsQuery({ limit: 4 });
  const topProducts = topData?.products || [];

  // Blog products (limit 3)
  const { data: blogData } = useGetProductsQuery({ limit: 3, sort: "newest" });
  const blogProducts = blogData?.products || [];

  /* Helper to get image */
  const getImage = (product) => {
    if (!product?.image) return "https://via.placeholder.com/800x500";
    return Array.isArray(product.image)
      ? `${base}/${product.image[0]}`
      : `${base}/${product.image}`;
  };

  return (
    <div>

      {/* ================= HERO ================= */}
      <section className="w-full bg-amber-200 flex justify-center">
        <div className="w-[1440px] h-[900px] flex items-center justify-between px-24">
          <div>
            <h1 className=" text-black text-6xl font-medium font-['Poppins']">
              Rocket single <br /> seater
            </h1>
            <Link
              to="/shop"
              className="inline-block mt-10 text-black text-2xl font-medium font-['Poppins'] border-b-2 border-black"
            >
              Shop Now
            </Link>
          </div>
          <img
            src="/image/sofa1.png"
            alt="Rocket"
            className="w-[700px] object-contain rotate-z-180 rotate-x-180"
          />
        </div>
      </section>

      {/* ================= FEATURED (ONLY 2) ================= */}
    
<section className="w-full bg-amber-100 py-28 flex justify-center">
  <div className="w-[1440px] px-24 grid grid-cols-1 md:grid-cols-2 gap-20">
    {featuredProducts.map((product) => (
      <div key={product._id} className="text-center">
        
        {/* Image Only */}
        <img
          src={getImage(product)}
          alt={product.title}
          className="h-[400px] object-contain mx-auto hover:scale-105 transition duration-300"
        />

        <h2 className="text-4xl font-medium mt-6">
          {product.title}
        </h2>

        <Link
          to={`/product/${product._id}`}
          className="inline-block mt-4 text-2xl border-b-2 border-black"
        >
          View More
        </Link>

      </div>
    ))}
  </div>
</section>

      {/* ================= TOP PICKS ================= */}
  <section className="w-full bg-amber-50 py-28 flex justify-center">
  <div className="w-[1440px] px-24 text-center">
    <h2 className="text-4xl text-black  font-medium font-['Poppins']">Top Picks For You</h2>
    <p className="text-neutral-400 text-base font-medium font-['Poppins'] mt-4">
      Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mt-16">
      {topProducts.map((product) => (
        <div key={product._id} className="text-center">

          {/* Image Only */}
          <img
            src={getImage(product)}
            alt={product.title}
            className="h-[220px]  object-contain mx-auto hover:scale-105 transition duration-300"
          />

          <h3 className="mt-6 text-black text-base font-normal font-['Poppins'] ">{product.title}</h3>
          <p className="text-2xl  text-black font-['Poppins'] font-medium mt-2">
            Rs. {product.price}
          </p>

        </div>
      ))}
    </div>

    <Link
      to="/shop"
      className="inline-block mt-16 text-xl border-b-2 border-black"
    >
      View More
    </Link>
  </div>
</section>

     {/* ================= NEW ARRIVAL ================= */}
<section className="w-full bg-amber-100 py-28 flex justify-center">
  <div className="w-[1440px] px-24 flex items-center justify-between">

    <img
      src="/image/newArrival.png"
      alt="Asgaard Sofa"
      className="w-[700px] object-contain"
    />

    {/* Only this part changed */}
    <div className="flex flex-col items-center text-center">
      <p className="text-2xl">New Arrivals</p>
      <h2 className=" text-black text-5xl font-bold font-['Poppins'] mt-4">Asgaard sofa</h2>

      <button className="mt-8 border border-black px-10 py-4 text-black text-xl font-normal font-['Poppins'] hover:bg-black hover:text-white transition">
        Order Now
      </button>
    </div>

  </div>
</section>


      {/* ================= BLOG ================= */}
      <section className="w-full py-28 flex justify-center">
        <div className="w-[1440px] px-24 text-center">
          <h2 className="text-4xl font-medium">Our Blogs</h2>
          <p className="text-neutral-400 mt-4">
            Latest articles from our products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
       {blogProducts.map((product) => (
  <div key={product._id} className="text-center"> {/* Center all content */}

    {/* Product Image */}
    <img
      src={getImage(product)}
      alt={product.title}
      className="rounded-xl h-[300px] w-full object-cover"
    />

    {/* Category */}
    <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">
      {product.category}
    </p>



    {/* Read More Button */}
    <Link
      to={`/product/${product._id}`}
      className="inline-block mt-3 text-sm font-semibold text-black border-b border-black hover:opacity-70 transition"
    >
      Read More
    </Link>

    {/* Date & Time */}
    <div className="flex justify-center gap-6 mt-3 text-gray-500 text-sm">
      
      {/* Calendar */}
      <div className="flex items-center gap-1">
        <span className="text-lg">📅</span>
        <span>{new Date(product.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Clock */}
      <div className="flex items-center gap-1">
        <span className="text-lg">🕒</span>
        <span>
          {new Date(product.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

    </div>
  </div>
))}

          </div>

          <Link
            to="/product-blog"
            className="inline-block mt-20 text-xl border-b-2 border-black"
          >
            View All Post
          </Link>
        </div>
      </section>

   
     {/* ================= INSTAGRAM ================= */}
{/* ================= INSTAGRAM ================= */}
<section className="w-full py-28 relative bg-cover bg-center" style={{ backgroundImage: `url('/image/instagram.jpg')` }}>
  {/* Overlay */}
  <div className="absolute inset-0 bg-amber-200 opacity-40"></div>

  {/* Centered Text & Button */}
  <div className="relative z-10 flex flex-col items-center justify-center h-96 text-center">
    <h2 className=" text-black text-6xl font-bold font-['Poppins']">Our Instagram</h2>
    <p className="mt-6 text-black text-xl font-normal font-['Poppins']">Follow our store on Instagram</p>
    <a
      href="https://instagram.com/yourstore"
      target="_blank"
      className="mt-8 w-64 h-16 bg-amber-100 rounded-[50px] border flex items-center justify-center text-black text-xl font-normal font-['Poppins'] hover:bg-white transition"
    >
      Follow Us
    </a>
  </div>

</section>



    </div>
  );
}
