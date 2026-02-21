import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "./authApi";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 3) return toast.error("Password must be 3+ chars");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    try {
      await resetPassword({ token, data: { password } }).unwrap();
      toast.success("Password reset successful");

      // ✅ Redirect to login page after password change
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={isLoading}
          className="bg-indigo-600 text-white w-full py-2 rounded"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}


// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useResetPasswordMutation } from "./authApi";

// export default function ResetPassword() {
//   const { token } = useParams();
//   console.log(token)
//   const nav = useNavigate();
//   const [resetPassword, { isLoading }] = useResetPasswordMutation();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!password || password.length < 3) return toast.error("Password must be 3+ chars");
//     if (password !== confirmPassword) return toast.error("Passwords do not match");

//     try {
//       await resetPassword({ token, data: { password } }).unwrap();
//       toast.success("Password reset successful");
//       nav("/login"); // redirect to login
//     } catch (err) {
//       toast.error(err?.data?.message || "Invalid or expired token");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
//         <input
//           type="password"
//           placeholder="New password"
//           className="border p-2 w-full mb-3 rounded"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm password"
//           className="border p-2 w-full mb-4 rounded"
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button
//           disabled={isLoading}
//           className="bg-indigo-600 text-white w-full py-2 rounded"
//         >
//           {isLoading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// }
