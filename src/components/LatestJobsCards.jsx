import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();
  // console.log("Job Card:", job);

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-xl shadow-xl bg-card border border-gray-200 cursor-pointer transition-transform hover:scale-[1.02] min-h-[220px] flex flex-col justify-between text-theme"
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-base sm:text-lg text-theme">India</p>
        <div>
          <h1 className="font-medium text-xs sm:text-sm text-heading-primary">{job?.company?.name}</h1>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Button variant="outline" className="p-1 bg-card">
            <Avatar className="w-7 h-7">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <h1 className="font-bold text-base sm:text-lg text-heading-primary">{job?.title}</h1>
        </div>
        <p className="text-xs sm:text-sm text-theme line-clamp-2">{job?.description}</p>
        <div className="flex flex-wrap items-center gap-2 mt-4">
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
      </motion.div>
    </div>
  );
};

export default LatestJobsCards;
