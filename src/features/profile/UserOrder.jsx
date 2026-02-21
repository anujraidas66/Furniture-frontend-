import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetOrderQuery, useCancelOrderMutation } from "../orders/OrderApi";

export default function UserOrder() {

  const { user } = useSelector((state) => state.userSlice);
  const { data, isLoading } = useGetOrderQuery(user?.token);
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder({ orderId, token: user?.token }).unwrap();
      toast.success("Order canceled");
    } catch (err) {
      toast.error(err?.data?.message || "Cancel failed ");
    }
  };

  if (isLoading) return <p className="text-center py-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-16 px-6 py-16">

      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {/* Orders Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Total Amount</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {data?.orders?.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border font-medium">{order._id}</td>
                <td className="p-3 border">Rs. {order.totalAmount}</td>
                <td className="p-3 border">{order.paymentMethod}</td>
                <td className="p-3 border capitalize">{order.status}</td>
                <td className="p-3 border">
                  {["pending", "confirmed"].includes(order.status) ? (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Cancel Order
                    </button>
                  ) : order.status === "canceled" ? (
                    <span className="text-gray-500 font-semibold text-sm">Canceled</span>
                  ) : (
                    <span className="text-gray-500 font-semibold text-sm">N/A</span>
                  )}
                </td>
              </tr>
            ))}

            {data?.orders?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}