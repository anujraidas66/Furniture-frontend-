import React from "react";
import { useGetSubscribersQuery } from "../footer/footerApi";

export default function AdminSubscribers() {
  const { data, isLoading, error } = useGetSubscribersQuery();

  if (isLoading) return <p>Loading subscribers...</p>;
  if (error) return <p className="text-red-500">Failed to fetch subscribers</p>;

  return (
    <div className="max-w-7xl mx-auto mt-16 px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Subscribers List</h1>

      {data.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed At
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((sub, idx) => (
                <tr key={sub._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sub.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
