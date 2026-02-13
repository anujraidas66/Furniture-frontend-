import { useSelector } from "react-redux";
import { useCreateContactMutation } from "./contactApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Contact() {
  const { user } = useSelector(state => state.userSlice);
  const [createContact, { isLoading }] = useCreateContactMutation();
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      subject: "",
      message: ""
    },
    validationSchema: Yup.object({
      subject: Yup.string()
        .trim()
        .min(5, "Subject must be at least 5 characters")
        .max(100, "Subject too long")
        .required("Subject is required"),
      message: Yup.string()
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message too long")
        .required("Message is required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createContact({
          token: user?.token,
          body: {
            subject: values.subject,
            message: values.message
          }
        }).unwrap();

        toast.success("Message sent successfully ✅");
        resetForm();
        nav('/');
      } catch (err) {
        toast.error(err?.data?.message || "Failed ❌");
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Contact Us
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.subject && formik.errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl border border-black transition ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-black hover:text-white"
            }`}
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
}
