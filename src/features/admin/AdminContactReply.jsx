import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDeleteContactMutation, useGetContactsQuery, useReplyContactMutation } from "../contact/contactApi";

export default function AdminContactReply() {
  const { user } = useSelector(state => state.userSlice);

  const { data, isLoading } = useGetContactsQuery(user?.token);
  const [replyContact] = useReplyContactMutation();
  const [deleteContact] = useDeleteContactMutation();

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
      <h1 className="text-2xl font-bold mb-4">There is no any contact message</h1>

      {data?.contacts?.map((contact) => (
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
            <div className="mt-3">
              <Formik
                initialValues={{ reply: "" }}
                validationSchema={Yup.object({
                  reply: Yup.string()
                    .trim()
                    .min(3, "Reply must be at least 3 characters")
                    .max(500, "Reply too long")
                    .required("Reply is required")
                })}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await replyContact({
                      id: contact._id,
                      reply: values.reply,
                      token: user?.token
                    }).unwrap();
                    toast.success("Reply sent ✅");
                    resetForm();
                  } catch (err) {
                    toast.error(err?.data?.message || "Reply failed ❌");
                  }
                }}
              >
                <Form className="space-y-2">
                  <Field
                    as="textarea"
                    name="reply"
                    placeholder="Write reply..."
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <ErrorMessage
                    name="reply"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Send Reply
                  </button>
                </Form>
              </Formik>
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
