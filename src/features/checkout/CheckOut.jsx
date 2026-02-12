import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateOrderMutation } from "../orders/OrderApi";
import { removeCart } from "../cart/CartSlice"; // to clear cart after order

export default function CheckOut() {
  const dispatch = useDispatch();
  const { carts } = useSelector(state => state.cartSlice); // cart items
  const { user } = useSelector(state => state.userSlice); // logged-in user

  const [createOrder] = useCreateOrderMutation();

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    phone: "",
    province: "baghmati",
    zipCode: "",
    email: user?.email || "",
    comment: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // calculate total amount
  const totalAmount = carts.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePlaceOrder = async () => {
    if (carts.length === 0) return toast.error("Cart is empty!");
    if (!user?.token) return toast.error("You must be logged in!");

    try {
      await createOrder({
        token: user.token, // ✅ use token from Redux
        body: {
          totalAmount,
          products: carts.map(item => ({
            productId: item.id,
            quantity: item.qty
          })),
          billingDetails,
          paymentMethod
        }
      }).unwrap();

      toast.success("Order placed successfully!");

      // clear cart in Redux & localStorage
      carts.forEach(item => dispatch(removeCart(item.id)));

    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Order failed!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="font-semibold mb-2">Billing Details</h2>
      <form className="space-y-2">
        <input
          placeholder="First Name"
          value={billingDetails.firstName}
          onChange={e => setBillingDetails({ ...billingDetails, firstName: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Last Name"
          value={billingDetails.lastName}
          onChange={e => setBillingDetails({ ...billingDetails, lastName: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Company Name (optional)"
          value={billingDetails.companyName}
          onChange={e => setBillingDetails({ ...billingDetails, companyName: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Street Address"
          value={billingDetails.streetAddress}
          onChange={e => setBillingDetails({ ...billingDetails, streetAddress: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="City"
          value={billingDetails.city}
          onChange={e => setBillingDetails({ ...billingDetails, city: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Phone"
          value={billingDetails.phone}
          onChange={e => setBillingDetails({ ...billingDetails, phone: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Email"
          value={billingDetails.email}
          onChange={e => setBillingDetails({ ...billingDetails, email: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Country"
          value={billingDetails.country}
          onChange={e => setBillingDetails({ ...billingDetails, country: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="ZIP Code"
          value={billingDetails.zipCode}
          onChange={e => setBillingDetails({ ...billingDetails, zipCode: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <select
          value={billingDetails.province}
          onChange={e => setBillingDetails({ ...billingDetails, province: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="koshi">Koshi</option>
          <option value="baghmati">Baghmati</option>
          <option value="madesh">Madesh</option>
          <option value="lumbini">Lumbini</option>
          <option value="sudurpachhim">Sudurpachhim</option>
          <option value="gandaki">Gandaki</option>
          <option value="karnali">Karnali</option>
        </select>

        <textarea
          placeholder="Comment"
          value={billingDetails.comment}
          onChange={e => setBillingDetails({ ...billingDetails, comment: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Direct Bank">Direct Bank</option>
        </select>

        <button
          type="button"
          onClick={handlePlaceOrder}
          className="w-full bg-black text-white p-3 rounded mt-4"
        >
          Place Order (Rs. {totalAmount})
        </button>
      </form>
    </div>
  );
}
