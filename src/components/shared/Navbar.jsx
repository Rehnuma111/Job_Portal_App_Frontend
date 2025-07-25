import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setAuthUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, LogOutIcon, User2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  // const user = true;
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            <Link to="/" className="flex items-center gap-1">
              Job <span className="text-blue-600">Portal</span>
            </Link>
          </h1>
        </div>
        {/* Hamburger for mobile */}
        <div className="lg:hidden">
          <button
            className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black mb-1 transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black mb-1 transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
        {/* Desktop menu */}
        <div className="hidden lg:flex">
          <ul className="flex font-semibold items-center gap-4">
            {user && user?.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className="hover:text-blue-600 transition-colors"
                  >
                    All Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saved-jobs"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Saved Jobs
                  </Link>
                </li>
              </>
            )}

            {!user ? (
              <div className="flex gap-2 ml-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-70">
                  <div className="flex gap-4 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {user?.name || "User Name"}
                      </h4>
                      <p className="text-sm text-muted-background">
                        {user?.email || "user@email.com"}
                      </p>
                    </div>
                  </div>

                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer ">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOutIcon />
                    <Button onClick={handleLogout} variant="link">
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </ul>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md border-b z-40 lg:hidden animate-fade-in">
            <ul className="flex flex-col font-semibold items-start gap-2 px-6 py-4">
              {user && user?.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      className="block py-2 hover:text-blue-600 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      className="block py-2 hover:text-blue-600 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="block py-2 hover:text-blue-600 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="block py-2 hover:text-blue-600 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className="block py-2 hover:text-blue-600 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Browse
                    </Link>
                  </li>
                  {user && user?.role === "student" && (
                    <li>
                      <Link
                        to="/saved-jobs"
                        className="block py-2 hover:text-blue-600 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        Saved Jobs
                      </Link>
                    </li>
                  )}
                </>
              )}

              {!user ? (
                <div className="flex flex-col gap-2 w-full mt-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full mt-2">
                  {user && user.role === "student" && (
                    <Button
                      variant="link"
                      className="justify-start"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      <Link to="/profile" className="flex items-center gap-2">
                        <User2 /> View Profile
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="link"
                    className="justify-start text-red-600"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <LogOut /> Logout
                    </span>
                  </Button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;