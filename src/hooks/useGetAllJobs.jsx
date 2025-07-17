import { setLoading } from "@/redux/authSlice";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetallJobs = () => {
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store=>store.job);
    useEffect(()=>{
       let debounceTimeout = null;
        const fetchJobs = async ()=>{
            try {
                // dispatch(setLoading(true));
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, {withCredentials:true})
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        debounceTimeout = setTimeout(fetchJobs, 400); // 400ms debounce
        return () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
        };
    }, [searchQuery, dispatch]);
};

export default useGetallJobs;