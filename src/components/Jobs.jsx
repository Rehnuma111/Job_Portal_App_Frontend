import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import JobSearchBar from "./JobSearchBar";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";

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

  const [filterData, setFilterData] = useState([]); // From API

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
      }
    };
    getFilteredOptions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <JobSearchBar
          filter={filters}
          setFilters={setFilters}  
          onSearch={handleSearch}
        />

        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard
              filterData={filterData}   // ✅ pass filter data (static)
              filters={filters}         // ✅ pass selected values
              setFilters={setFilters}
            />
          </div>

          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-3 gap-4">
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
