import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserLoginMutation } from "./authApi";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../user/userSlice";

const valSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={valSchema}
            onSubmit={async (val) => {
              try {
               const res = await loginUser(val).unwrap();
                console.log(res);
                toast.success("Login Successfully");
                dispatch(setUser(res.data));
                nav('/');
              } catch (err) {
                toast.error(err?.data?.data || "Login failed");
              }
            }}
          >
            {({ handleSubmit, handleChange, errors, touched }) => (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email */}
                <div className="grid gap-2">
                  <Label className="text-gray-700">Email</Label>
                  <Input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="example@email.com"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
               <div className="grid gap-2">
  <Label className="text-gray-700">Password</Label>

  {/* Input wrapper */}
  <div className="relative">
    <Input
      name="password"
      onChange={handleChange}
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pr-12"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {errors.password && touched.password && (
    <p className="text-red-500 text-sm">{errors.password}</p>
  )}
</div>


                {/* Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                {/* Signup link */}
                <p className="text-center text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <NavLink
                    to="/signup"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Create account
                  </NavLink>
                </p>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
