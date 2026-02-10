
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownProfile from "./DropDownProfile";
import { FaCartArrowDown } from "react-icons/fa";
import { Button } from "./ui/button";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const { carts } = useSelector((state) => state.cartSlice);
  const totalQty = carts.reduce((sum, item) => sum + item.qty, 0);

  // Show cart for guests and normal users, hide only for admin
  const showCart = user?.role !== "admin";

  return (
    <div className="bg-amber-100 w-full p-3 ">
      <div className="flex items-center justify-between px-10">

        {/* Center Menu */}
        <div className="flex gap-10 mx-auto font-medium">
          <NavLink to="/" className="text-black">
            Home
          </NavLink>

          <NavLink to="/shop" className="text-black">
            Shop
          </NavLink>

          <NavLink to="/account" className="text-black">
            Account
          </NavLink>

          <NavLink to="/contact" className="text-black">
            Contact
          </NavLink>


           {showCart && (
            <NavLink to="/cart" className="relative text-black">
              <FaCartArrowDown size={25} />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQty}
                </span>
              )}
            </NavLink>
          )}

          {/* {showCart && (
            <NavLink to="/cart" className="text-black">
              <FaCartArrowDown size={25} />
            </NavLink>
          )} */}
          
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <input
            type="text"
            placeholder="Search"
            className="border bg-white rounded-md px-2 py-1 text-sm"
          />

          {!user ? (
            <NavLink to="/login">
              <Button variant="link">Login</Button>
            </NavLink>
          ) : (
            <DropDownProfile user={user} />
          )}
        </div>
      </div>
    </div>
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




