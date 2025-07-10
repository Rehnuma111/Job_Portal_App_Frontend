import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import useGetallJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSLice";

// const randomJobs = [1, 2, 3];

const Browse = () => {
  useGetallJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-8 px-2 sm:px-4">
        <h1 className="font-bold text-lg sm:text-xl my-6 sm:my-10">
          Search Results {allJobs?.length}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <Job key={job?._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
