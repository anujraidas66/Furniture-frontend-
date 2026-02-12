import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useCreateContactMutation } from "../features/contact/ContactApi";

export default function Contact() {
  const { user } = useSelector(state => state.userSlice);
  const [createContact] = useCreateContactMutation();

  const [form, setForm] = useState({
    subject: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createContact({
        token: user?.token,
        body: form
      }).unwrap();

      toast.success("Message sent successfully ✅");

      setForm({ subject: "", message: "" });

    } catch (err) {
      toast.error(err?.data?.message || "Failed ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Subject"
          className="w-full border p-2 rounded"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <textarea
          placeholder="Your message..."
          className="w-full border p-2 rounded"
          rows="5"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
