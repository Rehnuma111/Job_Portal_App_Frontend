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
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center w-full my-5">
        <form
          onSubmit={handleSubmit}
          className="p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                className="my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={values.requirements}
                onChange={handleChange}
                placeholder="Comma separated e.g. React,Node,SQL"
                className="my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={values.salary}
                onChange={handleChange}
                className="my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={values.location}
                onChange={handleChange}
                className="my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={values.jobType}
                onChange={handleChange}
                className="my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                className="my-1"
              />
            </div>
            <div>
              <Label>Number of Positions</Label>
              <Input
                type="number"
                name="position"
                value={values.position}
                onChange={handleChange}
                className="my-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Select a Company</Label>
              <Select
                value={values.companyId}
                onValueChange={(value) => setFieldValue("companyId", value)}
              >
                <SelectTrigger className="w-full my-1">
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

          <Button type="submit" className="w-full mt-6">
            Post New Job
          </Button>

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              ⚠️ Please register a company before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
