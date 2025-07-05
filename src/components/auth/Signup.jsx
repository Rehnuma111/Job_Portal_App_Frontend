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
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";

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
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-4">
            <Label className="my-3">Full Name</Label>
            <Input
              type="text"
              value={values.fullName}
              name="fullName"
              placeholder="patel"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.fullName && errors.fullName && (
              <div className="text-red-500 text-xs">{errors.fullName}</div>
            )}
          </div>
          <div className="my-2">
            <Label className="my-3">Email</Label>
            <Input
              type="email"
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="patel@gmail.com"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
          </div>
          <div className="my-2">
            <Label className="my-3">Phone Number</Label>
            <Input
              type="text"
              value={values.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="8080808080"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <div className="text-red-500 text-xs">{errors.phoneNumber}</div>
            )}
          </div>
          <div className="my-2">
            <Label className="my-3">Password</Label>
            <Input
              type="password"
              name="password"
              value={values.password}
              placeholder="patel@gmail.com"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-xs">{errors.password}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
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
            <div className="flex items-center gap-x-5 ">
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
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              SignUp
            </Button>
          )}

          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
         
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                toast.success("Signed up with Google!");
                navigate("/");
              }}
              onError={() => {
                toast.error("Google Sign Up Failed");
              }}
              width="100%"
              text="signup_with"
              shape="rectangular"
              size="large"
            />
        
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
