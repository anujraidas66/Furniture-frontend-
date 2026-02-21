// import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useGetOrderQuery, useUpdateOrderStatusMutation } from "../orders/OrderApi";

// export default function AdminOrders() {
//   const { user } = useSelector(state => state.userSlice);
//   const { data, isLoading } = useGetOrderQuery(user?.token);
//   const [updateStatus] = useUpdateOrderStatusMutation();

//   const handleChange = async (orderId, status) => {
//     try {
//       await updateStatus({
//         orderId,
//         status,
//         token: user?.token
//       }).unwrap();

//       toast.success("Order status updated ✅");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update ❌");
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

//       <table className="w-full border border-collapse">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border p-2">Order ID</th>
//             <th className="border p-2">Total Amount</th>
//             <th className="border p-2">Payment</th>
//             <th className="border p-2">Delivery Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data?.orders?.map(order => (
//             <tr key={order._id}>
//               <td className="border p-2">{order._id}</td>
//               <td className="border p-2">Rs. {order.totalAmount}</td>

//               {/* Payment method */}
//               <td className="border p-2">{order.paymentMethod}</td>

//               {/* Delivery status */}
//               <td className="border p-2">
//                 <select
//                   value={order.status}
//                   onChange={(e) => handleChange(order._id, e.target.value)}
//                   className="border p-1 rounded"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} from "../orders/OrderApi";

export default function AdminOrders() {
  const { user } = useSelector((state) => state.userSlice);

  // Fetch all orders
  const { data, isLoading } = useGetOrderQuery(user?.token);

  // RTK Query mutations
  const [updateStatus] = useUpdateOrderStatusMutation();
  const [cancelOrder] = useCancelOrderMutation();

  // Handle status change via dropdown
  const handleChange = async (orderId, status) => {
    try {
      await updateStatus({ orderId, status, token: user?.token }).unwrap();
      toast.success("Order status updated ✅");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update ❌");
    }
  };

  // Handle cancel order button
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
    <div className="p-6 mt-30 ">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

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

              {/* Status Dropdown */}
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={(e) => handleChange(order._id, e.target.value)}
                  disabled={order.status === "canceled"} // Disabled if canceled
                  className="border p-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>

              {/* Actions */}
              <td className="border p-2">
                {["pending", "confirmed"].includes(order.status) && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Cancel Order
                  </button>
                )}
                {order.status === "canceled" && (
                  <span className="text-gray-500 font-semibold">Canceled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
