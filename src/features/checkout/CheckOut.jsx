import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCart, toggleCart } from "../cart/CartSlice";
import { useCreateOrderMutation } from "../orders/OrderApi";

export default function CheckOut() {
  const { carts } = useSelector(state => state.cartSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    comment: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const totalAmount = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (carts.length === 0) return alert("Cart is empty!");

    try {
      await createOrder({
        token: localStorage.getItem("token"),
        body: {
          totalAmount,
          products: carts.map(item => ({ productId: item.id, quantity: item.qty })),
          billingDetails,
          paymentMethod,
        },
      }).unwrap();

      // Clear cart
      carts.forEach(item => dispatch(removeCart(item.id)));
      dispatch(toggleCart(false));

      alert("Order placed successfully!");
      nav("/"); // redirect to home or confirmation page
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Billing Form */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={billingDetails.firstName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={billingDetails.lastName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <input
          name="companyName"
          placeholder="Company Name (Optional)"
          value={billingDetails.companyName}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="country"
          placeholder="Country / Region"
          value={billingDetails.country}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="streetAddress"
          placeholder="Street Address"
          value={billingDetails.streetAddress}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="city"
          placeholder="Town / City"
          value={billingDetails.city}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="province"
          placeholder="Province"
          value={billingDetails.province}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="zipCode"
          placeholder="ZIP Code"
          value={billingDetails.zipCode}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={billingDetails.phone}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="email"
          placeholder="Email Address"
          value={billingDetails.email}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <textarea
          name="comment"
          placeholder="Additional Information"
          value={billingDetails.comment}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        {/* Payment Method */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Payment Method</h3>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Direct Bank"
              checked={paymentMethod === "Direct Bank"}
              onChange={() => setPaymentMethod("Direct Bank")}
            />
            Direct Bank Transfer
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={() => setPaymentMethod("Cash on Delivery")}
            />
            Cash on Delivery
          </label>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded font-semibold"
        >
          Place Order
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 p-6 rounded-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>

        {carts.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.title} x {item.qty}</span>
            <span>Rs. {item.price * item.qty}</span>
          </div>
        ))}

        <hr className="my-2" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rs. {totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
