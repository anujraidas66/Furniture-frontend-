// for responsve


import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../orders/OrderApi";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { clearCart } from "../cart/CartSlice";

export default function CheckOut() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const totalAmount = carts.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    streetAddress: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Phone must be valid")
      .required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string().required("ZIP code is required"),
    province: Yup.string().required("Province is required"),
    paymentMethod: Yup.string().required("Select payment method"),
  });

  return (
    <div className="m-0 p-0 font-['Poppins']">
      
      {/* ================= BANNER ================= */}
      <div className="relative mt-16 w-full h-72 sm:h-80 overflow-hidden">
        <img
          src="./image/checkout.jpg"
          alt="Checkout Banner"
          className="absolute inset-0 w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <img
            src="./image/meubalhouse.png"
            alt="Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 mb-4"
          />
          <h1 className="text-3xl sm:text-5xl font-medium text-black">
            Checkout
          </h1>

          <div className="flex items-center gap-3 mt-4 text-sm sm:text-base">
            <span className="font-medium text-black cursor-pointer">
              Home
            </span>
            <span className="text-xl sm:text-2xl font-medium">›</span>
            <span className="font-light text-black">Checkout</span>
          </div>
        </div>
      </div>

      {/* ================= CHECKOUT FORM ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            companyName: "",
            country: "",
            streetAddress: "",
            city: "",
            phone: "",
            province: "",
            zipCode: "",
            email: user?.email || "",
            comment: "",
            paymentMethod: "Direct Bank Transfer",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (carts.length === 0) return toast.error("Cart is empty!");
            if (!user?.token) return toast.error("You must be logged in!");

            try {
              await createOrder({
                token: user.token,
                body: {
                  totalAmount,
                  products: carts.map((item) => ({
                    productId: item.id,
                    quantity: item.qty,
                    color: item.color,
                    size: item.size,
                  })),
                  billingDetails: values,
                  paymentMethod: values.paymentMethod,
                },
              }).unwrap();

              dispatch(clearCart());
              toast.success("Order placed successfully!");
              nav("/");
            } catch (err) {
              toast.error(err?.data?.message || "Order failed!");
            }
          }}
        >
          {({ handleSubmit, handleChange, values}) => (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                
                {/* LEFT SIDE */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-black">
                    Billing details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                      value={values.firstName}
                      className="border p-4 w-full rounded text-base text-black"
                    />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={values.lastName}
                      className="border p-4 w-full rounded text-base text-black"
                    />
                  </div>

                  <input name="companyName" placeholder="Company Name (optional)" onChange={handleChange} value={values.companyName} className="border p-4 w-full rounded mt-4 text-base text-black" />
                  <input name="country" placeholder="Country / Region" onChange={handleChange} value={values.country} className="border p-4 w-full rounded mt-4 text-base text-black" />
                  <input name="streetAddress" placeholder="Street address" onChange={handleChange} value={values.streetAddress} className="border p-4 w-full rounded mt-4 text-base text-black" />
                  <input name="city" placeholder="Town / City" onChange={handleChange} value={values.city} className="border p-4 w-full rounded mt-4 text-base text-black" />

                  <select name="province" value={values.province} onChange={handleChange} className="border p-4 w-full rounded mt-4 text-base text-black">
                    <option value="">Select Province</option>
                    <option value="koshi">Koshi</option>
                    <option value="baghmati">Baghmati</option>
                    <option value="madesh">Madesh</option>
                    <option value="lumbini">Lumbini</option>
                    <option value="sudurpachhim">Sudurpachhim</option>
                    <option value="gandaki">Gandaki</option>
                    <option value="karnali">Karnali</option>
                  </select>

                  <input name="zipCode" placeholder="ZIP Code" onChange={handleChange} value={values.zipCode} className="border p-4 w-full rounded mt-4 text-base text-black" />
                  <input name="phone" placeholder="Phone" onChange={handleChange} value={values.phone} className="border p-4 w-full rounded mt-4 text-base text-black" />
                  <input name="email" placeholder="Email address" onChange={handleChange} value={values.email} className="border p-4 w-full rounded mt-4 text-base text-black" />
                  <textarea name="comment" placeholder="Additional information" onChange={handleChange} value={values.comment} className="border p-4 w-full rounded mt-4 text-base text-black" />
                </div>

                {/* RIGHT SIDE */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-black">
                    Your Order
                  </h2>

                  <div className="border-b pb-4">
                    {carts.map((item) => (
                      <div
                        key={`${item.id}-${item.color}-${item.size}`}
                        className="flex justify-between text-base mb-2 text-black gap-4"
                      >
                        <span className="wrap-break-word">
                          {item.title} × {item.qty}
                        </span>
                        <span className="whitespace-nowrap">
                          Rs. {item.price * item.qty}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 text-base text-black">
                    <span>Subtotal</span>
                    <span>Rs. {totalAmount}</span>
                  </div>

                  <div className="flex justify-between mt-2 font-semibold text-lg text-yellow-600">
                    <span>Total</span>
                    <span>Rs. {totalAmount}</span>
                  </div>

                  <div className="mt-6 space-y-3 text-base text-black">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="paymentMethod" value="Direct Bank Transfer" checked={values.paymentMethod === "Direct Bank Transfer"} onChange={handleChange} />
                      Direct Bank Transfer
                    </label>

                    <label className="flex items-center gap-2">
                      <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={values.paymentMethod === "Cash on Delivery"} onChange={handleChange} />
                      Cash On Delivery
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-8 w-full border border-black py-3 rounded hover:bg-black hover:text-white transition disabled:opacity-50 text-base font-semibold"
                  >
                    {isLoading ? "Placing Order..." : "Place order"}
                  </button>
                </div>

              </div>
            </form>
          )}
        </Formik>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="bg-[#F9F1E7] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-black text-2xl sm:text-3xl font-medium mb-4">Free Delivery</h3>
            <p className="text-neutral-400 text-lg sm:text-xl">For all orders over $50.</p>
          </div>
          <div>
            <h3 className="text-black text-2xl sm:text-3xl font-medium mb-4">90 Days Return</h3>
            <p className="text-neutral-400 text-lg sm:text-xl">If goods have problems.</p>
          </div>
          <div>
            <h3 className="text-black text-2xl sm:text-3xl font-medium mb-4">Secure Payment</h3>
            <p className="text-neutral-400 text-lg sm:text-xl">100% secure payment.</p>
          </div>
        </div>
      </div>

    </div>
  );
}


// // only change layout


// import { useSelector, useDispatch } from "react-redux";
// import { useCreateOrderMutation } from "../orders/OrderApi";
// import { useNavigate } from "react-router";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";
// import { clearCart } from "../cart/CartSlice";

// export default function CheckOut() {
//   const dispatch = useDispatch();
//   const { carts } = useSelector((state) => state.cartSlice);
//   const { user } = useSelector((state) => state.userSlice);
//   const nav = useNavigate();
//   const [createOrder, { isLoading }] = useCreateOrderMutation();

//   const totalAmount = carts.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First name is required"),
//     lastName: Yup.string().required("Last name is required"),
//     streetAddress: Yup.string().required("Street address is required"),
//     city: Yup.string().required("City is required"),
//     phone: Yup.string()
//       .matches(/^[0-9]{7,15}$/, "Phone must be valid")
//       .required("Phone is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     country: Yup.string().required("Country is required"),
//     zipCode: Yup.string().required("ZIP code is required"),
//     province: Yup.string().required("Province is required"),
//     paymentMethod: Yup.string().required("Select payment method"),
//   });

//   return (
//     <div className="m-0 p-0 font-['Poppins']">
//       {/* ================= BANNER ================= */}
//       <div className="relative mt-16 w-full h-80 overflow-hidden">
//         <img
//           src="./image/checkout.jpg"
//           alt="Checkout Banner"
//           className="absolute inset-0 w-full h-full object-cover blur-[3px]"
//         />
//         <div className="absolute inset-0 bg-white/40"></div>
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
//           <img
//             src="./image/meubalhouse.png"
//             alt="Logo"
//             className="w-20 h-20 mb-4"
//           />
//           <h1 className="text-5xl font-medium text-black">Checkout</h1>
//           <div className="flex items-center gap-3 mt-4 text-base">
//             <span className="font-medium text-black cursor-pointer">Home</span>
//             <span className="text-2xl font-medium">›</span>
//             <span className="font-light text-black">Checkout</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= CHECKOUT FORM ================= */}
//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <Formik
//           initialValues={{
//             firstName: "",
//             lastName: "",
//             companyName: "",
//             country: "",
//             streetAddress: "",
//             city: "",
//             phone: "",
//             province: "",
//             zipCode: "",
//             email: user?.email || "",
//             comment: "",
//             paymentMethod: "Direct Bank Transfer",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={async (values) => {
//             if (carts.length === 0) return toast.error("Cart is empty!");
//             if (!user?.token) return toast.error("You must be logged in!");

//             try {
//               await createOrder({
//                 token: user.token,
//                 body: {
//                   totalAmount,
//                   products: carts.map((item) => ({
//                     productId: item.id,
//                     quantity: item.qty,
//                     color: item.color,
//                     size: item.size,
//                   })),
//                   billingDetails: values,
//                   paymentMethod: values.paymentMethod,
//                 },
//               }).unwrap();

//               dispatch(clearCart());
//               toast.success("Order placed successfully!");
//               nav("/");
//             } catch (err) {
//               toast.error(err?.data?.message || "Order failed!");
//             }
//           }}
//         >
//           {({ handleSubmit, handleChange, values, errors, touched }) => (
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//                 {/* LEFT - BILLING DETAILS */}
//                 <div>
//                   <h2 className="text-3xl font-medium mb-6 text-black">
//                     Billing details
//                   </h2>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <input
//                         name="firstName"
//                         placeholder="First Name"
//                         onChange={handleChange}
//                         value={values.firstName}
//                         className="border p-4 w-full rounded text-base text-black"
//                       />
//                       {touched.firstName && errors.firstName && (
//                         <p className="text-red-500 text-sm">{errors.firstName}</p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="lastName"
//                         placeholder="Last Name"
//                         onChange={handleChange}
//                         value={values.lastName}
//                         className="border p-4 w-full rounded text-base text-black"
//                       />
//                       {touched.lastName && errors.lastName && (
//                         <p className="text-red-500 text-sm">{errors.lastName}</p>
//                       )}
//                     </div>
//                   </div>

//                   <input
//                     name="companyName"
//                     placeholder="Company Name (optional)"
//                     onChange={handleChange}
//                     value={values.companyName}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                   <input
//                     name="country"
//                     placeholder="Country / Region"
//                     onChange={handleChange}
//                     value={values.country}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                   <input
//                     name="streetAddress"
//                     placeholder="Street address"
//                     onChange={handleChange}
//                     value={values.streetAddress}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                   <input
//                     name="city"
//                     placeholder="Town / City"
//                     onChange={handleChange}
//                     value={values.city}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                   <select
//                     name="province"
//                     value={values.province}
//                     onChange={handleChange}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   >
//                     <option value="">Select Province</option>
//                     <option value="koshi">Koshi</option>
//                     <option value="baghmati">Baghmati</option>
//                     <option value="madesh">Madesh</option>
//                     <option value="lumbini">Lumbini</option>
//                     <option value="sudurpachhim">Sudurpachhim</option>
//                     <option value="gandaki">Gandaki</option>
//                     <option value="karnali">Karnali</option>
//                   </select>
//                   <input
//                     name="zipCode"
//                     placeholder="ZIP Code"
//                     onChange={handleChange}
//                     value={values.zipCode}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                   <input
//                     name="phone"
//                     placeholder="Phone"
//                     onChange={handleChange}
//                     value={values.phone}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                   <input
//                     name="email"
//                     placeholder="Email address"
//                     onChange={handleChange}
//                     value={values.email}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                   <textarea
//                     name="comment"
//                     placeholder="Additional information"
//                     onChange={handleChange}
//                     value={values.comment}
//                     className="border p-4 w-full rounded mt-4 text-base text-black"
//                   />
//                 </div>

//                 {/* RIGHT - ORDER SUMMARY */}
//                 <div>
//                   <h2 className="text-3xl font-medium mb-6 text-black">
//                     Your Order
//                   </h2>

//                   <div className="border-b pb-4">
//                     {carts.map((item) => (
//                       <div
//                         key={`${item.id}-${item.color}-${item.size}`}
//                         className="flex justify-between text-base mb-2 text-black"
//                       >
//                         <span>
//                           {item.title} × {item.qty} ({item.color}, {item.size})
//                         </span>
//                         <span>Rs. {item.price * item.qty}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex justify-between mt-4 text-base text-black">
//                     <span>Subtotal</span>
//                     <span>Rs. {totalAmount}</span>
//                   </div>

//                   <div className="flex justify-between mt-2 font-semibold text-lg text-yellow-600">
//                     <span>Total</span>
//                     <span>Rs. {totalAmount}</span>
//                   </div>

//                   {/* Payment method */}
//                   <div className="mt-6 space-y-3 text-base text-black">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="Direct Bank Transfer"
//                         checked={values.paymentMethod === "Direct Bank Transfer"}
//                         onChange={handleChange}
//                       />
//                       Direct Bank Transfer
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="Cash on Delivery"
//                         checked={values.paymentMethod === "Cash on Delivery"}
//                         onChange={handleChange}
//                       />
//                       Cash On Delivery
//                     </label>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="mt-8 w-full border border-black py-3 rounded hover:bg-black hover:text-white transition disabled:opacity-50 text-base font-semibold"
//                   >
//                     {isLoading ? "Placing Order..." : "Place order"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           )}
//         </Formik>
//       </div>

//       {/* ================= FEATURES SECTION ================= */}
//       <div className="bg-[#F9F1E7] py-20">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
//           <div>
//             <h3 className="text-black text-3xl font-medium mb-4">Free Delivery</h3>
//             <p className="text-neutral-400 text-xl">For all orders over $50.</p>
//           </div>
//           <div>
//             <h3 className="text-black text-3xl font-medium mb-4">90 Days Return</h3>
//             <p className="text-neutral-400 text-xl">If goods have problems.</p>
//           </div>
//           <div>
//             <h3 className="text-black text-3xl font-medium mb-4">Secure Payment</h3>
//             <p className="text-neutral-400 text-xl">100% secure payment.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }