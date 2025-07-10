import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import useGetallCompanies from "@/hooks/useGetAllCompany";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  useGetallCompanies();
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: 0,
      companyId: "",
    },
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      try {
        const response = await axios.post(`${JOB_API_ENDPOINT}/post`, values, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.data.success) {
          navigate("/admin/jobs");
          toast.success("✅ Job posted successfully!");
        } else {
          toast.error("⚠️ Job posting failed.");
        }
      } catch (error) {
        console.error("Error posting job:", error);
        toast.error("❌ Something went wrong while posting the job.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e3e0ff] flex flex-col font-sans">
      <Navbar />
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center p-2 md:p-8">
        <div className="bg-white/95 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-100 mt-10 mb-8">
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#4B2996] drop-shadow-lg mb-6 text-center font-sans">
            Post a New Job
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                  placeholder="Job description"
                />
              </div>
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={values.requirements}
                  onChange={handleChange}
                  placeholder="Comma separated e.g. React,Node,SQL"
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                />
              </div>
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Salary</Label>
                <Input
                  type="number"
                  name="salary"
                  value={values.salary}
                  onChange={handleChange}
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                  placeholder="e.g. 50000"
                />
              </div>
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                  placeholder="e.g. Remote, New York"
                />
              </div>
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={values.jobType}
                  onChange={handleChange}
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                  placeholder="e.g. Full-time"
                />
              </div>
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Experience Level</Label>
                <Input
                  type="text"
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                  placeholder="e.g. 2+ years"
                />
              </div>
              <div>
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Number of Positions</Label>
                <Input
                  type="number"
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  className="my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                  placeholder="e.g. 3"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Select a Company</Label>
                <Select
                  value={values.companyId}
                  onValueChange={(value) => setFieldValue("companyId", value)}
                >
                  <SelectTrigger className="w-full my-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 bg-[#f6f4fd] text-[#2d1a4d] font-sans">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white rounded-xl shadow-md hover:from-[#4B2996] hover:to-[#c72a00] font-semibold px-6 py-2 border-0 font-sans">
              Post New Job
            </Button>
            {companies.length === 0 && (
              <p className="text-xs text-red-600 font-bold text-center my-3 font-sans">
                ⚠️ Please register a company before posting a job.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
