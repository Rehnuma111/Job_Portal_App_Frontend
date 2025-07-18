import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/context/ThemeContext";
import { logout, setAuthUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, LogOutIcon, User2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useSelector((store) => store.auth);
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
      dispatch(logout());
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-card text-theme shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            <Link to="/" className="flex items-center gap-1 text-heading-primary">
              Job <span className="text-heading-secondary">Portal</span>
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
              className={`block h-0.5 w-6 mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""} bg-theme`}
            ></span>
            <span
              className={`block h-0.5 w-6 mb-1 transition-all ${menuOpen ? "opacity-0" : ""} bg-theme`}
            ></span>
            <span
              className={`block h-0.5 w-6 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""} bg-theme`}
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
                    className="hover:text-heading-secondary transition-colors text-theme"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-heading-secondary transition-colors text-theme"
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
                    className="hover:text-heading-secondary transition-colors text-theme"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-heading-secondary transition-colors text-theme"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-heading-secondary transition-colors text-theme"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saved-jobs"
                    className="hover:text-heading-secondary transition-colors text-theme"
                  >
                    Saved Jobs
                  </Link>
                </li>
                <button onClick={toggleTheme} className="btn-theme rounded px-3 py-1 font-medium">
          {theme === "dark" ? "🌙" : "☀️ "}
        </button>
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
                <PopoverContent className="w-70 bg-card text-theme">
                  <div className="flex gap-4 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-heading-primary">
                        {user?.name || "User Name"}
                      </h4>
                      <p className="text-sm text-theme">
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
                    {isAuthenticated ? (
                      <Button onClick={handleLogout}>Logout</Button>
                    ) : (
                      <Link to="/login">Logout</Link>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </ul>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-card text-theme shadow-md border-b z-40 lg:hidden animate-fade-in">
            <ul className="flex flex-col font-semibold items-start gap-2 px-6 py-4">
              {user && user?.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      className="block py-2 hover:text-heading-secondary transition-colors text-theme"
                      onClick={() => setMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      className="block py-2 hover:text-heading-secondary transition-colors text-theme"
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
                      className="block py-2 hover:text-heading-secondary transition-colors text-theme"
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="block py-2 hover:text-heading-secondary transition-colors text-theme"
                      onClick={() => setMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className="block py-2 hover:text-heading-secondary transition-colors text-theme"
                      onClick={() => setMenuOpen(false)}
                    >
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/saved-jobs"
                      className="block py-2 hover:text-heading-secondary transition-colors text-theme"
                      onClick={() => setMenuOpen(false)}
                    >
                      Saved Jobs
                    </Link>
                  </li>
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
