import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CompaniesTable from "./CompaniesTable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useGetallAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobsTable from "./AdminJobsTable";
import useGetallCompanies from "@/hooks/useGetAllCompany";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetallAdminJobs();
  useGetallCompanies();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e3e0ff] flex flex-col font-sans">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col p-2 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4B2996] drop-shadow-lg tracking-tight font-sans">
            Admin: Manage Jobs
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search jobs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded-xl shadow-sm w-full sm:w-64 border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
            />
            <Button
              className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white rounded-xl shadow-md hover:from-[#4B2996] hover:to-[#c72a00] w-full sm:w-auto font-semibold px-6 py-2 border-0 font-sans"
              onClick={() => navigate("/admin/jobs/create")}
            >
              + Post New Job
            </Button>
          </div>
        </div>
        {/* Table Card */}
        <div className="bg-white/95 rounded-2xl shadow-2xl p-2 md:p-8 border border-gray-100 overflow-x-auto transition-all duration-300">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
