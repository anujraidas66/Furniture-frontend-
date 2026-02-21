import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownProfile from "./DropDownProfile";
import { FaCartArrowDown } from "react-icons/fa";
import { Button } from "./ui/button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const { carts } = useSelector((state) => state.cartSlice);
  const totalQty = carts.reduce((sum, item) => sum + item.qty, 0);
  const showCart = user?.role !== "admin";

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      const query = new URLSearchParams({ search: searchTerm });
      navigate(`/shop?${query.toString()}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-yellow-100 z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-24 h-16 flex items-center justify-between">

        {/* Navigation Links */}
        <nav className="flex gap-10 text-base font-medium text-black">
          <NavLink className="text-black text-base font-medium font-['Poppins']" to="/">Home</NavLink>
          <NavLink className="text-black text-base font-medium font-['Poppins']" to="/shop">Shop</NavLink>
          <NavLink className="text-black text-base font-medium font-['Poppins']" to="/my-account">Account</NavLink>
          <NavLink className="text-black text-base font-medium font-['Poppins']" to="/product-blog">Blog</NavLink>
          {user?.role !== "admin" && (
            <NavLink className="text-black text-base font-medium font-['Poppins']" to="/contact">Contact</NavLink>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKey}
            className="bg-white rounded-md px-3 py-1 text-sm w-52 outline-none "
          />

          {/* Wishlist */}
          <NavLink to="/wishlist">
            <FontAwesomeIcon
              icon={farHeart}
              className="text-xl hover:text-red-500 transition text-black text-base font-medium font-['Poppins']"
            />
          </NavLink>

          {/* Cart */}
          {showCart && (
            <NavLink to="/cart" className="relative">
              <FaCartArrowDown size={22} />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQty}
                </span>
              )}
            </NavLink>
          )}

          {/* Login / Profile */}
          {!user ? (
            <NavLink to="/login">
              <Button variant="link">Login</Button>
            </NavLink>
          ) : (
            <DropDownProfile user={user} />
          )}
        </div>
      </div>
    </header>
  );
}



// import { NavLink } from "react-router-dom";
// import DropDownProfile from "./DropDownProfile";
// import { Button } from "./ui/button";
// import { useSelector } from "react-redux";

// export default function Header() {
//   const { user } = useSelector((state) => state.userSlice);

//   const showCart = !user || (user && user.role !== "admin");

//   return (
//     <div className="bg-amber-100 w-full py-3 fixed top-0 left-0 z-50">
//       <div className="flex items-center justify-between px-10">

//         {/* Center Menu */}
//         <div className="flex gap-10 mx-auto font-medium">
//           <NavLink to="/" className="text-black">Home</NavLink>
//           <NavLink to="/shop" className="text-black">Shop</NavLink>
//           <NavLink to="/account" className="text-black">Account</NavLink>
//           <NavLink to="/contact" className="text-black">Contact</NavLink>

//           {showCart && (
//             <NavLink to="/cart" className="text-black">
//               Cart
//             </NavLink>
//           )}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-6">
//           <input
//             type="text"
//             placeholder="Search"
//             className="border bg-white rounded-md px-2 py-1 text-sm"
//           />

//           {!user ? (
//             <NavLink to="/login">
//               <Button variant="link">Login</Button>
//             </NavLink>
//           ) : (
//             <DropDownProfile user={user} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




