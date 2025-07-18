import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { addSavedJob, removeSavedJob } from "@/redux/authSlice";
import { toast } from "sonner";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedJobs, user } = useSelector((state) => state.auth);
  const userId = user?._id;
  console.log("savedJObs" , savedJobs ,userId);
  
  const isSaved = savedJobs?.some((savedJob) => savedJob._id === job._id);

  const handleSaveJob = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/save-job/${job._id}`, {}, { withCredentials: true });
      console.log("res" , res);
      if (res.data.success) {
        dispatch(addSavedJob(job));
        toast.success("Job saved for later");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save job");
    }
  };

  const handleUnsaveJob = async () => {
    try {
      const res = await axios.delete(`${USER_API_ENDPOINT}/save-job/${job._id}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(removeSavedJob(job._id));
        toast.success("Job removed from saved");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to unsave job");
    }
  };

  // console.log("job", job);

  const daysAgoFunction = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const currenTime = new Date();
    const timeDifference = currenTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  // const jobId = "ugtftvb";
  return (
    <div className="w-full">
      <div className="p-4 sm:p-5 rounded-xl shadow-xl bg-card border border-gray-200 flex flex-col gap-2 min-h-[260px] transition-colors">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-theme">
            {job?.createdAt === 0 ? "Today" : ` ${daysAgoFunction(job?.createdAt)}`} Days Ago
          </p>
          <Button variant="outline" className="rounded-full" size="icon" onClick={isSaved ? handleUnsaveJob : handleSaveJob}>
            <Bookmark fill={isSaved ? "var(--heading-primary)" : "none"} />
          </Button>
        </div>

        <div className="flex items-center gap-2 my-2">
          <Button className="p-2 sm:p-4 bg-card" variant="outline" size="icon">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-base sm:text-lg text-heading-primary">{job?.company?.name}</h1>
            <p className="text-xs sm:text-sm text-theme">India</p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-base sm:text-lg my-2 line-clamp-1 text-heading-primary">{job?.title}</h1>
          <p className="text-xs sm:text-sm text-theme line-clamp-2">{job?.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge className={"text-heading-primary font-bold text-xs sm:text-sm"} variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className={"text-heading-secondary font-bold text-xs sm:text-sm"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-theme font-bold text-xs sm:text-sm"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-4">
          <Button
            onClick={() => navigate(`/description/${job._id}`)}
            variant="outline"
            className="w-full sm:w-auto btn-theme"
          >
            Details
          </Button>
          <Button
            className={`w-full sm:w-auto btn-theme ${isSaved ? "opacity-70" : ""}`}
            onClick={isSaved ? handleUnsaveJob : handleSaveJob}
            variant={isSaved ? "outline" : "default"}
          >
            {isSaved ? "Unsave" : "Save For Later"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
