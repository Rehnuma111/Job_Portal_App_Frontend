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
    <div>
      <Table>
        <TableCaption>A list of your recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants found.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application, index) => {
              const applicant = application.applicant;
              return (
                <TableRow key={index}>
                  <TableCell>{applicant.fullName}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.phoneNumber}</TableCell>
                  <TableCell>
                    <a
                      href={applicant.resume || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {applicant.resume ? "View" : "N/A"}
                    </a>
                  </TableCell>
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListingStatus.map((status, idx) => (
                          <div
                            key={idx}
                            className="cursor-pointer hover:bg-gray-100 p-2"
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
  );
};

export default ApplicantsTable;
