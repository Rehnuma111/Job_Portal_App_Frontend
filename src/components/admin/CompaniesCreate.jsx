import React, { useState } from "react";
import { Label } from "../ui/label";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const CompaniesCreate = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState();

  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        console.log(res?.data?.success);
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.success);

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create company. Please try again."
      );
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e3e0ff] flex flex-col font-sans">
      <Navbar />
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center p-2 md:p-8">
        <div className="bg-white/95 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-100 mt-10 mb-8">
          <div className="mb-8 text-center">
            <h1 className="font-extrabold text-3xl md:text-4xl text-[#4B2996] drop-shadow-lg mb-2 font-sans">
              Create a New Company
            </h1>
            <p className="text-gray-600 text-base md:text-lg font-sans">
              What would you like to name your company? You can change this later.
            </p>
          </div>
          <div className="mb-6">
            <Label className="font-semibold text-base mb-2 block text-[#4B2996] font-sans">
              Company Name
            </Label>
            <Input
              type="text"
              className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
              placeholder="JobHunt, Microsoft, etc."
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-8">
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-xl border-gray-300 text-[#4B2996] hover:bg-[#ede9fe] hover:text-[#2d1a4d] font-sans"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white rounded-xl shadow-md hover:from-[#4B2996] hover:to-[#c72a00] font-semibold px-6 py-2 border-0 font-sans"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCreate;
