import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/user/forgot-password", { email });
      if (response.data.success) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(response.data.message || "Failed to send reset link.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff]">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#F83002] mb-4">Forgot Password</h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-xl"
            />
          </div>
          {loading ? (
            <Button className="w-full bg-[#F83002] text-white rounded-xl" disabled>
              Sending...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-[#F83002] text-white hover:bg-[#c72a00] rounded-xl">
              Send Reset Link
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
