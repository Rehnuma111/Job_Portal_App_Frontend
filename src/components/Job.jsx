import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
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
      <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col gap-2 min-h-[260px]">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-gray-500">
            {job?.createdAt === 0 ? "Today" : ` ${daysAgoFunction(job?.createdAt)}`} Days Ago
          </p>
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>

        <div className="flex items-center gap-2 my-2">
          <Button className="p-2 sm:p-4" variant="outline" size="icon">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-base sm:text-lg">{job?.company?.name}</h1>
            <p className="text-xs sm:text-sm text-gray-500">India</p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-base sm:text-lg my-2 line-clamp-1">{job?.title}</h1>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{job?.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge className={"text-blue-700 font-bold text-xs sm:text-sm"} variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className={"text-[#F83002] font-bold text-xs sm:text-sm"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-[#7209b7] font-bold text-xs sm:text-sm"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-4">
          <Button
            onClick={() => navigate(`/description/${job._id}`)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Details
          </Button>
          <Button className="bg-[#7209b7] w-full sm:w-auto">Save For Later</Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
