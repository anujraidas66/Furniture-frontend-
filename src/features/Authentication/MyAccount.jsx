import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserLoginMutation } from "./authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../user/userSlice";
import { Eye, EyeOff } from "lucide-react";

const valSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(3, "Minimum 3 characters").required("Password is required"),
});

export default function MyAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="font-['Poppins']">

      {/* ================= BANNER ================= */}
      <div className="relative w-full mt-16 h-80 overflow-hidden">
        <img
          src="/image/checkout.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="/image/meubalhouse.png" alt="Logo" className="w-20 h-20 mb-4" />
          <h1 className="text-5xl font-medium">My Account</h1>

          <div className="flex items-center gap-3 mt-4 text-base">
            <Link to="/" className="font-medium hover:underline">Home</Link>
            <span>›</span>
            <span className="font-light">My Account</span>
          </div>
        </div>
      </div>

      {/* ================= ACCOUNT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* ================= LEFT: LOGIN FORM ================= */}
        <div className="md:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-lg shadow border border-gray-200">
            <h2 className="text-3xl font-semibold mb-8">Log In</h2>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={valSchema}
              onSubmit={async (val) => {
                try {
                  const res = await loginUser(val).unwrap();
                  dispatch(setUser(res.data));
                  toast.success("Login successful");
                  navigate("/");
                } catch (err) {
                  toast.error(err?.data?.message || "Login failed");
                }
              }}
            >
              {({ handleSubmit, handleChange, errors, touched }) => (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      className="w-full p-3 border rounded"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium">Password</label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      className="w-full p-3 border rounded pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[45px] text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <NavLink to="/forgot-password" className="underline text-gray-600">Lost Your Password?</NavLink>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-10 py-3 border rounded hover:bg-black hover:text-white transition"
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>

        {/* ================= RIGHT: REGISTER INFO ================= */}
        <div className="md:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-lg shadow border border-gray-200">
            <h2 className="text-3xl font-semibold mb-8">Register</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Email address</label>
                <input type="email" className="w-full p-3 border rounded" />
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                A link to set a new password will be sent to your email address.
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-semibold underline cursor-pointer">privacy policy</span>.
              </p>

              <button className="px-10 py-3 border rounded hover:bg-black hover:text-white transition">
                Register
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ================= FEATURES ================= */}
      <div className="bg-[#F9F1E7] py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          <div>
            <h3 className="text-3xl font-medium mb-4">Free Delivery</h3>
            <p className="text-neutral-400 text-xl">For all orders over $50.</p>
          </div>

          <div>
            <h3 className="text-3xl font-medium mb-4">90 Days Return</h3>
            <p className="text-neutral-400 text-xl">If goods have problems.</p>
          </div>

          <div>
            <h3 className="text-3xl font-medium mb-4">Secure Payment</h3>
            <p className="text-neutral-400 text-xl">100% secure payment.</p>
          </div>

        </div>
      </div>

    </div>
  );
}


