import Navbar from "../shared/Navbar";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { USER_API_ENDPOINT } from "@/utils/constant";

import { Loader2 } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["student", "recruiter"], "Invalid role")
      .required("Role is required"),
  });
  const { loading } = useSelector((store) => store.auth);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "student", // Default role
      file: null, // File input
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("password", values.password);
      formData.append("role", values.role);
      if (values.file) {
        formData.append("file", values.file);
      }

      try {
        dispatch(setLoading(true));
        const res = await axios.post(
          `${USER_API_ENDPOINT}/register`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          navigate("/login");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
  console.log(errors);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff]">
      <Navbar />
      <div className="flex flex-1 items-center justify-center py-8 px-2">
        <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-lg border border-gray-200">
          {/* Left: Illustration & Welcome */}
          <div className="hidden md:flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-[#F83002] to-[#6A38C2] p-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F83002]/80 to-[#6A38C2]/80 opacity-80 z-0" />
            <div className="relative z-10 text-white text-center">
              <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Join the Future of Work</h2>
              <p className="text-lg mb-8 font-medium">Sign up and unlock the best job opportunities tailored for you.</p>
              <img src="/src/assets/8041916.jpg" alt="Job Portal" className="w-80 mx-auto rounded-2xl shadow-xl border-4 border-white/30" />
            </div>
          </div>
          {/* Right: Signup Form */}
          <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white/90">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mx-auto"
            >
              <h1 className="font-extrabold text-3xl mb-2 text-[#F83002] text-center">Create Account</h1>
              <p className="mb-8 text-gray-500 text-center text-base">Start your dream career today. It's free!</p>
              <div className="my-4">
                <Label className="my-3">Full Name</Label>
                <Input
                  type="text"
                  value={values.fullName}
                  name="fullName"
                  placeholder="Your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="rounded-xl"
                />
                {touched.fullName && errors.fullName && (
                  <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>
                )}
              </div>
              <div className="my-4">
                <Label className="my-3">Email</Label>
                <Input
                  type="email"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="patel@gmail.com"
                  className="rounded-xl"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                )}
              </div>
              <div className="my-4">
                <Label className="my-3">Phone Number</Label>
                <Input
                  type="text"
                  value={values.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="8080808080"
                  className="rounded-xl"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>
                )}
              </div>
              <div className="my-4">
                <Label className="my-3">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="rounded-xl"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <RadioGroup className="flex items-center gap-4 my-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      className="cursor-pointer"
                      checked={values.role === "student"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Label htmlFor="r1">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      className="cursor-pointer"
                      checked={values.role === "recruiter"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Label htmlFor="r2">Recruiter</Label>
                  </div>
                </RadioGroup>
                <div className="flex items-center gap-x-2 w-full sm:w-auto">
                  <Input
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    type="file"
                    className="cursor-pointer"
                    onChange={(e) =>
                      setFieldValue("file", e.currentTarget.files[0])
                    }
                  />
                </div>
              </div>
              {loading ? (
                <Button className="w-full my-4 bg-[#F83002] text-white rounded-xl" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#F83002] text-white hover:bg-[#c72a00] rounded-xl shadow-md shadow-[#F83002]/20">
                  Sign Up
                </Button>
              )}
              <div className="flex items-center my-2">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>
              {/* <GoogleLogin ... /> */}
              <span className="text-sm block text-center mt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-[#6A38C2] font-semibold hover:underline">
                  Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
