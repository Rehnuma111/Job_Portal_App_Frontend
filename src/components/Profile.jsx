import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_SAVED_JOBS_API_ENDPOINT } from "@/utils/constant";
import { setSavedJobs } from "@/redux/authSlice";
import Navbar from "./shared/Navbar";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;    

const Profile = () => {
  useGetAppliedJobs();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user, savedJobs } = useSelector((store) => store.auth);
  const skills = user?.profile?.skills;

  React.useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(USER_SAVED_JOBS_API_ENDPOINT, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        // Optionally handle error
      }
    };
    fetchSavedJobs();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-8">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage
                src={user.profile?.profilePhoto || "https://www.gravatar.com/avatar"}
                alt="profile"
              />
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="font-medium text-lg sm:text-xl">{user?.fullName}</h1>
              <p className="text-gray-600 text-sm sm:text-base">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="self-center sm:self-auto"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        {/* Contact info */}
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-2 sm:gap-0">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Contact className="w-4 h-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        {/* Skills */}
        <div className="my-4">
          <h1 className="font-semibold text-base mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {skills?.length !== 0 ? (
              skills?.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        {/* Resume */}
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer break-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
        {/* Applied Jobs Table */}
        <div className="w-full bg-white rounded-2xl mt-8">
          <h1 className="font-bold text-base sm:text-lg my-5">Applied Jobs</h1>
          <AppliedJobTable />
          <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
        {/* Saved Jobs Table */}
        <div className="w-full bg-white rounded-2xl mt-8">
          <h1 className="font-bold text-base sm:text-lg my-5">Saved Jobs</h1>
          {savedJobs?.length === 0 ? (
            <p className="text-gray-500">No saved jobs yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {savedJobs.map((job) => (
                <li key={job._id} className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-medium">{job.title}</span> at <span className="text-gray-600">{job.company?.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">{job.location} | {job.jobType}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
