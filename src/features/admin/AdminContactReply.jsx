import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
  useReplyContactMutation,
} from "../contact/contactApi";

export default function AdminContactReply() {
  const { user } = useSelector((state) => state.userSlice);

  const { data, isLoading } = useGetContactsQuery(user?.token);
  const [replyContact] = useReplyContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id) => {
    try {
      await deleteContact({ id, token: user?.token }).unwrap();
      toast.success("Message deleted successfully ✅");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete ❌");
    }
  };

  if (isLoading) return <p className="text-center py-10 text-lg">Loading messages...</p>;

  return (
    <div className="p-6 mt-24 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Customer Messages</h1>

      {data?.contacts?.map((contact) => (
        <div key={contact._id} className="border p-6 mb-6 rounded-lg shadow-sm">
          <p className="text-base"><strong>User:</strong> {contact.user?.username}</p>
          <p className="text-base"><strong>Email:</strong> {contact.user?.email}</p>
          <p className="text-base"><strong>Topic:</strong> {contact.subject}</p>
          <p className="text-base"><strong>Message:</strong> {contact.message}</p>

          {contact.reply ? (
            <div className="mt-4 p-4 bg-gray-100 rounded text-base">
              <strong>Reply:</strong> {contact.reply}
            </div>
          ) : (
            <div className="mt-4">
              <Formik
                initialValues={{ reply: "" }}
                validationSchema={Yup.object({
                  reply: Yup.string()
                    .trim()
                    .min(3, "Reply must be at least 3 characters")
                    .max(500, "Reply too long")
                    .required("Reply is required"),
                })}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await replyContact({
                      id: contact._id,
                      reply: values.reply,
                      token: user?.token,
                    }).unwrap();
                    toast.success("Reply sent successfully ✅");
                    resetForm();
                  } catch (err) {
                    toast.error(err?.data?.message || "Failed to send reply ❌");
                  }
                }}
              >
                <Form className="space-y-3">
                  <Field
                    as="textarea"
                    name="reply"
                    placeholder="Type your reply here..."
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base"
                  />
                  <ErrorMessage
                    name="reply"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-base"
                  >
                    Submit Reply
                  </button>
                </Form>
              </Formik>
            </div>
          )}

          <button
            onClick={() => handleDelete(contact._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700 transition text-base"
          >
            Delete Message
          </button>
        </div>
      ))}
    </div>
  );
}