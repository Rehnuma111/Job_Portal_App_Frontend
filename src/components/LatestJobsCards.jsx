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
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        {/* <h1 className="text-2xl font-bold">Company Name</h1> */}
        <p className="text-xl text-gray-500">India</p>
        <div>
          <h1 className="font-medium text-sm">{job?.company?.name}</h1>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <Button variant="outline">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {job?.position}
            Positions
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
            {job?.salary}
            LPA
          </Badge>
        </div>
      </motion.div>
    </div>
  );
};

export default LatestJobsCards;
