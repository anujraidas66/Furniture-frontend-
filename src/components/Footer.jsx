import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateSubscribeMutation } from "../features/footer/footerApi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false); // Track if user subscribed
  const [createSubscribe] = useCreateSubscribeMutation();

  const handleSubscribe = async () => {
    if (!email) return toast.error("Please enter your email");

    try {
      await createSubscribe(email).unwrap();
      toast.success("Subscribed successfully!");
      setSubscribed(true); // Change state to subscribed
      setEmail("");
    } catch (err) {
      toast.error(err?.data?.message || "Subscribe failed");
    }
  };

  return (
    <footer className="w-full bg-white border-t">
      {/* Footer Top */}
      <div className="max-w-[1440px] mx-auto px-24 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Company Info */}
        <div>
          <h2 className="text-black text-base font-medium font-['Poppins'] mb-4">Meubel House</h2>
          <p className="text-neutral-400  text-base font-medium font-['Poppins']text-sm leading-relaxed">
            400 University Drive Suite 200 Coral Gables,
            <br />FL 33134 USA
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-neutral-400 text-base font-medium font-['Poppins'] mb-4">Links</h3>
          <ul className="space-y-6 text-black text-base  font-['Poppins'] font-medium">
            <li>
              <Link to="/" className="hover:text-gray-700 transition text-black text-base font-medium font-['Poppins']">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gray-700 transition text-black text-base font-medium font-['Poppins']">Shop</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-700 transition text-black text-base font-medium font-['Poppins'] ">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-700 transition text-black text-base font-medium font-['Poppins']">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-neutral-400  text-base font-medium font-['Poppins'] mb-4">Help</h3>
          <ul className="space-y-6 text-black text-base font-medium font-['Poppins']">
            <li>
              <Link className="hover:text-gray-700 transition text-black text-base font-medium font-['Poppins']">Payment Options</Link>
            </li>
            <li>
              <Link className="hover:text-gray-700 transition text-black text-base font-medium font-['Poppins']">Returns</Link>
            </li>
            <li>
              <Link className="hover:text-gray-700 transition text-black text-base font-medium font-['Poppins']">Privacy Policies</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-neutral-400 text-base font-medium mb-4">Newsletter</h3>
          <div className="flex items-center border-b border-black">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-1 outline-none text-sm py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className={`ml-2 text-sm font-medium transition px-4 py-2 rounded ${
                subscribed ? "bg-red-500 text-white hover:bg-red-600" : "text-black hover:text-gray-700"
              }`}
            >
              {subscribed ? "Subscribed" : "SUBSCRIBE"}
            </button>
          </div>
        </div>

      </div>

      {/* Footer Divider */}
      <div className="w-[1240px] h-px mx-auto bg-zinc-300"></div>

      {/* Footer Bottom */}
      <div className="max-w-[1440px] mx-auto text-black text-base text-left px-24 py-6">
        2026 Meubel House. All rights reserved
      </div>
    </footer>
  );
}
