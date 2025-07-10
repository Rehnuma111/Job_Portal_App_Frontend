import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetallJobs from "@/hooks/useGetAllJobs";
import useGetallAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
  useGetallJobs();
  useGetallAdminJobs();

  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.length >= 0 &&
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    console.log("filteredJobs", filteredJobs);

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto font-sans">
      <Table className="min-w-full font-sans">
        <TableCaption className="text-[#4B2996] font-semibold mb-2 font-sans">A list of your posted Jobs.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-[#ede9fe] to-[#f6f4fd]">
            <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 pl-4 font-sans">Company Name</TableHead>
            <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">Role</TableHead>
            <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">Date</TableHead>
            <TableHead className="text-right text-[#4B2996] font-bold text-base tracking-wide py-4 pr-4 font-sans">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job?._id} className="group border-b last:border-b-0 border-gray-100 hover:bg-[#f6f4fd] transition-colors text-[#2d1a4d] font-medium align-middle font-sans">
              <TableCell className="py-3 pl-4 font-sans">{job?.company?.name}</TableCell>
              <TableCell className="font-sans">{job?.title}</TableCell>
              <TableCell className="font-sans">{job.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right pr-4 font-sans cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-[#4B2996] group-hover:text-[#6A38C2] transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="w-44 bg-white border border-gray-200 rounded-xl shadow-lg font-sans">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer hover:text-[#6A38C2] text-base font-sans"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2 hover:text-[#4B2996] text-base font-sans"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
