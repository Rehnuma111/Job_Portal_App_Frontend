import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
const shortListingStatus = ["Accepted", "Rejected", "Pending"];
const ApplicantsTable = () => {
  
  const applicants = useSelector((store) => store.application);
  const data = applicants.applicants;

  const applications = data?.job?.applications || [];
  console.log("applications:", applications);

  const statusHandler = async (status, applicationId) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(`Application status updated to ${status}`);
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="overflow-x-auto font-sans">
      <div className="bg-white/95 rounded-2xl shadow-2xl border border-gray-100 p-2 md:p-8">
        <Table className="min-w-full font-sans">
          <TableCaption className="text-[#4B2996] font-semibold mb-2 font-sans">A list of your recently applied users</TableCaption>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-[#ede9fe] to-[#f6f4fd]">
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 pl-4 font-sans">Full Name</TableHead>
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">Email</TableHead>
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">Contact</TableHead>
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">Resume</TableHead>
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">Date</TableHead>
              <TableHead className="text-right text-[#4B2996] font-bold text-base tracking-wide py-4 pr-4 font-sans">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-[#2d1a4d] font-semibold font-sans">
                  No applicants found.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application, index) => {
                const applicant = application.applicant;
                return (
                  <TableRow key={index} className="group border-b last:border-b-0 border-gray-100 hover:bg-[#f6f4fd] transition-colors text-[#2d1a4d] font-medium align-middle font-sans">
                    <TableCell className="py-3 pl-4 font-sans">{applicant.fullName}</TableCell>
                    <TableCell className="font-sans">{applicant.email}</TableCell>
                    <TableCell className="font-sans">{applicant.phoneNumber}</TableCell>
                    <TableCell className="font-sans">
                      <a
                        href={applicant.resume || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6A38C2] underline hover:text-[#4B2996] font-sans"
                      >
                        {applicant.resume ? "View" : "N/A"}
                      </a>
                    </TableCell>
                    <TableCell className="font-sans">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right pr-4 font-sans">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal className="text-[#4B2996] group-hover:text-[#6A38C2] transition-colors" />
                        </PopoverTrigger>
                        <PopoverContent className="w-44 bg-white border border-gray-200 rounded-xl shadow-lg font-sans">
                          {shortListingStatus.map((status, idx) => (
                            <div
                              key={idx}
                              className="cursor-pointer hover:bg-[#ede9fe] p-2 rounded text-base text-[#2d1a4d] hover:text-[#4B2996] font-sans"
                              onClick={() => {
                                statusHandler(status, application._id);
                              }}
                            >
                              {status}
                            </div>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
