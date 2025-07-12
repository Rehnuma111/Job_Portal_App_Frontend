import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter a new password.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3000/api/user/reset-password/${token}`, { password });
      if (response.data.success) {
        toast.success("Password reset successful. You can now log in.");
      } else {
        toast.error(response.data.message || "Failed to reset password.");
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
        <h1 className="text-2xl font-bold text-center text-[#F83002] mb-4">Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <Label>New Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="rounded-xl"
            />
          </div>
          {loading ? (
            <Button className="w-full bg-[#F83002] text-white rounded-xl" disabled>
              Resetting...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-[#F83002] text-white hover:bg-[#c72a00] rounded-xl">
              Reset Password
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
