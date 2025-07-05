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
  // const [input, setInput] = useState({
  //   email: "",
  //   password: "",
  //   role: "",
  // });
  // const changeEventHandler = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };
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
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label className="my-3">Email</Label>
            <Input
              type="email"
              name="email"
              value={values.email}
              placeholder="patel@gmail.com"
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
          </div>

          <div className="my-2">
            <Label className="my-3">Password</Label>
            <Input
              type="password"
              value={values.password}
              name="password"
              onChange={handleChange}
              placeholder="patel@gmail.com"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
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
              <div className="flex items-center space-4">
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
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
