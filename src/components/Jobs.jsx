import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import JobSearchBar from "./JobSearchBar";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: "",
  });

  const [filterData, setFilterData] = useState([]);

  // Search job API call
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${JOB_API_ENDPOINT}/get/filter`, {
        params: filters,
      });
      setFilterJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timeout);
  }, [filters]);

  // Populate dropdown filter data (e.g. Location, Job Type)
  useEffect(() => {
    const getFilteredOptions = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/filtersValue`);
        setFilterData(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch filter options", error);
      }
    };
    getFilteredOptions();
  }, []);

  return (
    <div className="min-h-screen bg-theme">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-2 sm:px-4">
        <JobSearchBar
          filter={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />

        <div className="flex flex-col lg:flex-row gap-5 mt-4">
          {/* Sidebar filter - responsive: full width on mobile, 1/4 on desktop */}
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <FilterCard
              filterData={filterData}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* Job grid - responsive */}
          <div className="flex-1 h-[60vh] md:h-[75vh] lg:h-[88vh] overflow-y-auto pb-5">
            {filterJobs.length === 0 ? (
              <div className="text-center mt-10 text-theme text-lg">
                ❌ No jobs found. Try changing your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
