import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

  const { loading, user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
    role: "student",
  };
  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().oneOf(["student", "recruiter"], "Invalid role"),
  });

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAuthUser(res.data.user));
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message || "Something went wrong, please try again."
        )
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] flex flex-col">
      <div className="flex flex-1 items-center justify-center py-8 px-2">
        <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-lg border border-gray-200">
          {/* Left: Illustration & Welcome */}
          <div className="hidden md:flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-[#6A38C2] to-[#F83002] p-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A38C2]/80 to-[#F83002]/80 opacity-80 z-0" />
            <div className="relative z-10 text-white text-center">
              <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Welcome Back!</h2>
              <p className="text-lg mb-8 font-medium">Login to explore the best jobs and opportunities for your career growth.</p>
              <img src="/src/assets/8041916.jpg" alt="Job Portal" className="w-80 mx-auto rounded-2xl shadow-xl border-4 border-white/30" />
            </div>
          </div>
          {/* Right: Login Form */}
          <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white/90">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mx-auto"
            >
              <h1 className="font-extrabold text-3xl mb-2 text-[#6A38C2] text-center">Sign In</h1>
              <p className="mb-8 text-gray-500 text-center text-base">Access your account and start your job search journey.</p>

              <div className="my-4">
                <Label className="my-3">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="patel@gmail.com"
                  onChange={handleChange}
                  className="rounded-xl"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                )}
              </div>

              <div className="my-4">
                <Label className="my-3">Password</Label>
                <Input
                  type="password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Your password"
                  className="rounded-xl"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <RadioGroup className="flex items-center gap-4 my-5">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={values.role === "student"}
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="r1">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={values.role === "recruiter"}
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="r2">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              {loading ? (
                <Button className="w-full my-4 bg-[#6A38C2] text-white rounded-xl" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#6A38C2] text-white hover:bg-[#5f32ad] rounded-xl shadow-md shadow-[#6A38C2]/20">
                  Login
                </Button>
              )}
              <div className="flex items-center my-2">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>
              {/* <GoogleLogin ... /> */}
              <span className="text-sm block text-center mt-2">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#F83002] font-semibold hover:underline">
                  Sign Up
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
