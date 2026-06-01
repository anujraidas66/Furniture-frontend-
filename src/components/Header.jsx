import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownProfile from "./DropDownProfile";
import { FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const { carts } = useSelector((state) => state.cartSlice);
  const totalQty = carts.reduce((sum, item) => sum + item.qty, 0);
  const showCart = user?.role !== "admin";

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchKey = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      const query = new URLSearchParams({ search: searchTerm });
      navigate(`/shop?${query.toString()}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-yellow-100 z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex gap-10 items-center text-base font-medium text-black">
          <NavLink className="hover:text-gray-700 transition font-['Poppins']" to="/">
            Home
          </NavLink>

          <NavLink className="hover:text-gray-700 transition font-['Poppins']" to="/shop">
            Shop
          </NavLink>

          <NavLink className="hover:text-gray-700 transition font-['Poppins']" to="/about">
            About
          </NavLink>

          {user?.role !== "admin" && (
            <NavLink className="hover:text-gray-700 transition font-['Poppins']" to="/contact">
              Contact
            </NavLink>
          )}

          <NavLink className="hover:text-gray-700 transition font-['Poppins']" to="/product-blog">
            Blog
          </NavLink>
        </nav>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink to="/my-account" className="text-2xl hover:text-gray-700 transition">
            <FontAwesomeIcon icon={faCircleUser} />
          </NavLink>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKey}
            className="bg-white rounded-md px-3 py-1 text-sm w-52 outline-none"
          />

          <NavLink to="/wishlist">
            <FontAwesomeIcon
              icon={farHeart}
              className="text-xl hover:text-red-500 transition"
            />
          </NavLink>

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

          {!user ? (
            <NavLink to="/login">
              <Button variant="link">Login</Button>
            </NavLink>
          ) : (
            <DropDownProfile user={user} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-100 px-6 pb-6 space-y-4 shadow-md text-base font-medium text-black">

          <NavLink onClick={() => setMenuOpen(false)} className="block font-['Poppins']" to="/">
            Home
          </NavLink>

          <NavLink onClick={() => setMenuOpen(false)} className="block font-['Poppins']" to="/shop">
            Shop
          </NavLink>

          <NavLink onClick={() => setMenuOpen(false)} className="block font-['Poppins']" to="/about">
            About
          </NavLink>

          {user?.role !== "admin" && (
            <NavLink onClick={() => setMenuOpen(false)} className="block font-['Poppins']" to="/contact">
              Contact
            </NavLink>
          )}

          <NavLink onClick={() => setMenuOpen(false)} className="block font-['Poppins']" to="/product-blog">
            Blog
          </NavLink>

          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKey}
            className="w-full bg-white rounded-md px-3 py-2 text-sm outline-none"
          />

          <div className="flex items-center gap-6 pt-2">
            <NavLink to="/my-account">
              <FontAwesomeIcon icon={faCircleUser} />
            </NavLink>

            <NavLink to="/wishlist">
              <FontAwesomeIcon icon={farHeart} />
            </NavLink>

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
          </div>

          {!user ? (
            <NavLink to="/login">
              <Button className="w-full mt-3">Login</Button>
            </NavLink>
          ) : (
            <DropDownProfile user={user} />
          )}
        </div>
      )}
    </header>
  );
}