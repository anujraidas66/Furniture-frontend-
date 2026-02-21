import { useState } from "react";
import { useForgotPasswordMutation } from "./authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email required");

    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);

      // ✅ Redirect immediately to reset password page with token
      navigate(`/reset-password/${res.resetToken}`);
    } catch (err) {
      toast.error(err?.data?.message || "Email not registered");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="border p-2 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={isLoading}
          className="bg-indigo-600 text-white w-full py-2 rounded"
        >
          {isLoading ? "Processing..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}


// import { useState } from "react";
// import { useForgotPasswordMutation } from "./authApi";
// import toast from "react-hot-toast";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return toast.error("Email required");

//     try {
//       const res = await forgotPassword({ email }).unwrap();
//       toast.success(res.message);
//     } catch (err) {
//       toast.error(err?.data?.message || "Email not registered");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
//         <input
//           type="email"
//           placeholder="Enter your registered email"
//           className="border p-2 w-full mb-4 rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button
//           disabled={isLoading}
//           className="bg-indigo-600 text-white w-full py-2 rounded"
//         >
//           {isLoading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   );
// }
