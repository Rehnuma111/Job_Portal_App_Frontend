import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  USER_API_ENDPOINT,
  USER_SAVED_JOBS_API_ENDPOINT,
} from "@/utils/constant";
import { setSavedJobs } from "@/redux/authSlice";
import Navbar from "./shared/Navbar";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs , user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  console.log("Saved Jobs:", user._id);
  

  useEffect(() => {
    dispatch(setSavedJobs([]));
    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/saved-jobs`, {
          withCredentials: true,
        });
        console.log(res.data.success);
        
        if (res.data.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
    
   
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-8">
        <h1 className="font-bold text-2xl mb-6">Saved Jobs</h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : savedJobs?.length === 0 ? (
          <p className="text-gray-500">No saved jobs yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {savedJobs.map((job) => (
              <li
                key={job._id}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="font-medium text-lg">{job.title}</span> at{" "}
                  <span className="text-gray-600">{job.company?.name}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {job.location} | {job.jobType}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
