import { setAllJobs } from "@/redux/jobSLice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetallJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchJobs = async ()=>{
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {withCredentials:true})
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchJobs();
    } , [])
};

export default useGetallJobs