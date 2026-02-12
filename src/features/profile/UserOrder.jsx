import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useGetOrderQuery,
  useCancelOrderMutation,
} from "../orders/OrderApi";

export default function UserOrder() {
  const { user } = useSelector((state) => state.userSlice);

  const { data, isLoading } = useGetOrderQuery(user?.token);
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder({ orderId, token: user?.token }).unwrap();
      toast.success("Order canceled ✅");
    } catch (err) {
      toast.error(err?.data?.message || "Cancel failed ❌");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.orders?.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">Rs. {order.totalAmount}</td>
              <td className="border p-2">{order.paymentMethod}</td>

              {/* Status */}
              <td className="border p-2">{order.status}</td>

              {/* Cancel Button */}
              <td className="border p-2">
                {["pending", "confirmed"].includes(order.status) ? (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Cancel Order
                  </button>
                ) : order.status === "canceled" ? (
                  <span className="text-gray-500 font-semibold">Canceled</span>
                ) : (
                  <span className="text-gray-500 font-semibold">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
