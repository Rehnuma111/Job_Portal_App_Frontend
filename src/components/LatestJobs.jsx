import React from "react";
import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto my-10 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        <span className="text-heading-primary">Latest & Top </span> <span className="text-theme">Job Openings</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allJobs?.length <= 0 ? (
          <span className="col-span-full text-center text-theme">No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobsCards key={job._id} job={job} />)
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
