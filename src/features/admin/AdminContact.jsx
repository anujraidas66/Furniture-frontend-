import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  useGetContactsQuery,
  useReplyContactMutation,
  useDeleteContactMutation
} from "../features/contact/ContactApi";
import { useState } from "react";

export default function AdminContact() {
  const { user } = useSelector(state => state.userSlice);

  const { data, isLoading } = useGetContactsQuery(user?.token);
  const [replyContact] = useReplyContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const [replyText, setReplyText] = useState({});

  const handleReply = async (id) => {
    try {
      await replyContact({
        id,
        reply: replyText[id],
        token: user?.token
      }).unwrap();

      toast.success("Reply sent ✅");

      setReplyText({ ...replyText, [id]: "" });

    } catch (err) {
      toast.error(err?.data?.message || "Reply failed ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact({ id, token: user?.token }).unwrap();
      toast.success("Deleted successfully ✅");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed ❌");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

      {data?.contacts?.map(contact => (
        <div key={contact._id} className="border p-4 mb-4 rounded">
          <p><strong>User:</strong> {contact.user?.username}</p>
          <p><strong>Email:</strong> {contact.user?.email}</p>
          <p><strong>Subject:</strong> {contact.subject}</p>
          <p><strong>Message:</strong> {contact.message}</p>

          {contact.reply ? (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <strong>Reply:</strong> {contact.reply}
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <textarea
                placeholder="Write reply..."
                className="w-full border p-2 rounded"
                value={replyText[contact._id] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [contact._id]: e.target.value
                  })
                }
              />

              <button
                onClick={() => handleReply(contact._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Send Reply
              </button>
            </div>
          )}

          <button
            onClick={() => handleDelete(contact._id)}
            className="bg-red-500 text-white px-3 py-1 rounded mt-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
