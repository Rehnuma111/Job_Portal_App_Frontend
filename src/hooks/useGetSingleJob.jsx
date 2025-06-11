import { setAllJobs, setSingleJobs } from "@/redux/jobSLice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJobs = (jobId) => {
    const dispatch = useDispatch();
   
};

export default useGetSingleJobs;