import { Spinner } from "@/components/ui/spinner";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCreateContactMutation } from "./contactApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { MapPin, Phone, Clock } from "lucide-react";

const contactSchema = Yup.object({
  subject: Yup.string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject too long")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message too long")
    .required("Message is required"),
});

export default function ContactPage() {
  const { user } = useSelector((state) => state.userSlice);
  const [createContact, { isLoading }] = useCreateContactMutation();
  const nav = useNavigate();

  return (
    <div className="w-full font-['Poppins']">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full mt-16 h-80 overflow-hidden">
        <img
          src="./image/checkout.jpg"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="./image/meubalhouse.png" alt="Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-5xl font-semibold text-black">Contact Us</h1>
          <div className="flex items-center gap-2 mt-4 text-base">
            <span
              onClick={() => nav("/")}
              className="font-medium text-black cursor-pointer hover:underline"
            >
              Home
            </span>
            <span>›</span>
            <span className="font-light text-black">Contact</span>
          </div>
        </div>
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Center Heading */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-semibold text-black mb-4">
              Get In Touch With Us
            </h2>
            <p className="text-base font-normal text-black leading-7">
              For more information about our product & services, please feel free to drop us an email.
              Our staff always be there to help you out. Do not hesitate!
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* LEFT SIDE - CONTACT INFO */}
            <div className="space-y-10">

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-black mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-black">Address</h3>
                  <p className="text-base font-normal text-black mt-2">
                    236 5th SE Avenue, New York NY10000, United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-black mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-black">Phone</h3>
                  <p className="text-base font-normal text-black mt-2">
                    Mobile: +(84) 546-6789 <br />
                    Hotline: +(84) 456-6789
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-black mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-black">Working Time</h3>
                  <p className="text-base font-normal text-black mt-2">
                    Monday–Friday: 9:00 – 22:00 <br />
                    Saturday–Sunday: 9:00 – 21:00
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <div>
              <Formik
                initialValues={{ subject: "", message: "" }}
                validationSchema={contactSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await createContact({
                      token: user?.token,
                      body: { subject: values.subject, message: values.message },
                    }).unwrap();

                    toast.success("Message sent successfully ✅");
                    resetForm();
                    nav("/");
                  } catch (err) {
                    toast.error(err?.data?.message || "Failed ❌");
                  }
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white p-10 rounded-xl shadow-md flex flex-col gap-6"
                  >
                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label className="text-base font-medium text-black">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        value={values.subject}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-4 text-base font-normal focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      {touched.subject && errors.subject && (
                        <p className="text-red-500 text-sm">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-base font-medium text-black">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Hi! I'd like to ask about..."
                        value={values.message}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-4 text-base font-normal focus:outline-none focus:ring-1 focus:ring-black resize-none"
                      />
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    {isLoading ? (
                      <button
                        disabled
                        className="border rounded-lg py-4 font-medium flex justify-center items-center gap-2 text-base"
                      >
                        <Spinner />
                        Sending...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="border border-black rounded-lg py-4 font-medium text-base hover:bg-black hover:text-white transition"
                      >
                        Submit
                      </button>
                    )}

                  </form>
                )}
              </Formik>
            </div>

          </div>
        </div>
      </div>

      {/* ================= FEATURE SECTION ================= */}
      <div className="bg-[#F9F1E7] py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-black">Free Delivery</h3>
            <p className="text-base font-normal text-black">For all orders over $50.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-black">90 Days Return</h3>
            <p className="text-base font-normal text-black">If goods have problems.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-black">Secure Payment</h3>
            <p className="text-base font-normal text-black">100% secure payment.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

// import { Spinner } from "@/components/ui/spinner";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useCreateContactMutation } from "./contactApi";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";

// const contactSchema = Yup.object({
//   subject: Yup.string()
//     .min(5, "Subject must be at least 5 characters")
//     .max(100, "Subject too long")
//     .required("Subject is required"),

//   message: Yup.string()
//     .min(10, "Message must be at least 10 characters")
//     .max(1000, "Message too long")
//     .required("Message is required"),
// });

// export default function ContactPage() {
//   const { user } = useSelector((state) => state.userSlice);
//   const [createContact, { isLoading }] = useCreateContactMutation();
//   const nav = useNavigate();

//   return (
//     <div className="w-full">

//       {/* ================= BANNER ================= */}
//       <div className="relative w-full mt-16 h-80 overflow-hidden">
//         <img
//           src="./image/checkout.jpg"
//           alt="Contact Banner"
//           className="absolute inset-0 w-full h-full object-cover blur-[3px]"
//         />
//         <div className="absolute inset-0 bg-white/40"></div>

//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
//           <img
//             src="./image/meubalhouse.png"
//             alt="Logo"
//             className="w-16 h-16 mb-4"
//           />
//           <h1 className="text-5xl font-semibold text-black">Contact Us</h1>
//           <div className="flex items-center gap-2 mt-4 text-base">
//             <span
//               onClick={() => nav("/")}
//               className="font-medium text-black cursor-pointer hover:underline"
//             >
//               Home
//             </span>
//             <span>›</span>
//             <span className="font-light text-black">Contact</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= CONTACT FORM ================= */}
//       <div className="bg-gray-100 py-20">
//         <div className="max-w-xl mx-auto px-6">
//           <Formik
//             initialValues={{
//               subject: "",
//               message: "",
//             }}
//             validationSchema={contactSchema}
//             onSubmit={async (values, { resetForm }) => {
//               try {
//                 await createContact({
//                   token: user?.token,
//                   body: {
//                     subject: values.subject,
//                     message: values.message,
//                   },
//                 }).unwrap();

//                 toast.success("Message sent successfully ✅");
//                 resetForm();
//                 nav("/");
//               } catch (err) {
//                 toast.error(err?.data?.message || "Failed ❌");
//               }
//             }}
//           >
//             {({ handleSubmit, handleChange, values, touched, errors }) => (
//               <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-10 rounded-xl shadow-md flex flex-col gap-6"
//               >
//                 {/* Subject */}
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-medium text-gray-700">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     placeholder="Enter subject"
//                     value={values.subject}
//                     onChange={handleChange}
//                     className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
//                   />
//                   {touched.subject && errors.subject && (
//                     <p className="text-red-500 text-sm">{errors.subject}</p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-medium text-gray-700">Message</label>
//                   <textarea
//                     name="message"
//                     rows="5"
//                     placeholder="Hi! I'd like to ask about..."
//                     value={values.message}
//                     onChange={handleChange}
//                     className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
//                   />
//                   {touched.message && errors.message && (
//                     <p className="text-red-500 text-sm">{errors.message}</p>
//                   )}
//                 </div>

//                 {/* Submit */}
//                 {isLoading ? (
//                   <button
//                     disabled
//                     className="border rounded-lg py-3 font-medium flex justify-center items-center gap-2 text-sm"
//                   >
//                     <Spinner />
//                     Sending...
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="border border-black rounded-lg py-3 font-medium text-sm hover:bg-black hover:text-white transition"
//                   >
//                     Submit
//                   </button>
//                 )}
//               </form>
//             )}
//           </Formik>
//         </div>
//       </div>

//       {/* ================= FEATURE SECTION ================= */}
//       <div className="bg-[#F9F1E7] py-16">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
//           <div>
//             <h3 className="text-xl font-semibold mb-3">Free Delivery</h3>
//             <p className="text-gray-500 text-sm">
//               For all orders over $50.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">90 Days Return</h3>
//             <p className="text-gray-500 text-sm">
//               If goods have problems.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
//             <p className="text-gray-500 text-sm">
//               100% secure payment.
//             </p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }