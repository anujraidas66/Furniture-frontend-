import { useNavigate } from "react-router";

export default function About() {
  const nav = useNavigate();

  return (
    <div className="w-full font-['Poppins']">

      {/* ================= HERO SECTION (Same as Contact Page) ================= */}
      <div className="relative w-full mt-16 h-80 overflow-hidden">
        <img
          src="./image/checkout.jpg"
          alt="About Banner"
          className="absolute inset-0 w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img
            src="./image/meubalhouse.png"
            alt="Logo"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-5xl font-semibold text-black">
            About Us
          </h1>

          <div className="flex items-center gap-2 mt-4 text-base">
            <span
              onClick={() => nav("/")}
              className="font-medium text-black cursor-pointer hover:underline"
            >
              Home
            </span>
            <span>›</span>
            <span className="font-light text-black">
              About
            </span>
          </div>
        </div>
      </div>

      {/* ================= OUR STORY ================= */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          alt="Furniture"
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-4xl font-semibold mb-6 text-black">
            Our Story
          </h2>
          <p className="text-base font-normal text-gray-700 mb-6 leading-7">
            Founded with a passion for design and comfort, our furniture store
            started with a simple goal — to make premium furniture accessible
            to everyone.
          </p>
          <p className="text-base font-normal text-gray-700 leading-7">
            From handcrafted wooden pieces to modern minimal designs, we ensure
            every product reflects quality, durability, and timeless style.
          </p>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-black">
              Our Mission
            </h2>
            <p className="text-base font-normal text-gray-700 leading-7">
              To provide high-quality, stylish, and affordable furniture
              that transforms houses into homes.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-black">
              Our Vision
            </h2>
            <p className="text-base font-normal text-gray-700 leading-7">
              To become the most trusted online furniture brand known
              for innovation, customer satisfaction, and sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-12 text-black">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 shadow-md rounded-xl bg-white">
            <h3 className="text-xl font-semibold mb-3 text-black">
              Premium Quality
            </h3>
            <p className="text-base text-gray-600">
              We use the finest materials to ensure long-lasting durability.
            </p>
          </div>

          <div className="p-8 shadow-md rounded-xl bg-white">
            <h3 className="text-xl font-semibold mb-3 text-black">
              Affordable Pricing
            </h3>
            <p className="text-base text-gray-600">
              Get modern furniture designs without breaking your budget.
            </p>
          </div>

          <div className="p-8 shadow-md rounded-xl bg-white">
            <h3 className="text-xl font-semibold mb-3 text-black">
              Fast Delivery
            </h3>
            <p className="text-base text-gray-600">
              Safe and quick delivery right to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="bg-[#F9F1E7] py-20 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-4xl font-bold text-black">
              10K+
            </h3>
            <p className="text-base text-gray-700 mt-2">
              Happy Customers
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-black">
              500+
            </h3>
            <p className="text-base text-gray-700 mt-2">
              Products
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-black">
              5+
            </h3>
            <p className="text-base text-gray-700 mt-2">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-black">
              24/7
            </h3>
            <p className="text-base text-gray-700 mt-2">
              Customer Support
            </p>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Ready to Upgrade Your Home?
        </h2>
        <p className="mb-8 text-gray-300 text-base">
          Explore our collection and find the perfect furniture today.
        </p>
        <button
          onClick={() => nav("/shop")}
          className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Shop Now
        </button>
      </section>

    </div>
  );
}