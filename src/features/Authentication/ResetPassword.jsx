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

    if (!password || password.length < 3)
      return toast.error("Password must be 3+ chars");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await resetPassword({ token, data: { password } }).unwrap();
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New password"
          className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="border p-3 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          disabled={isLoading}
          className="bg-indigo-600 text-white w-full py-3 rounded transition hover:bg-indigo-700"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}