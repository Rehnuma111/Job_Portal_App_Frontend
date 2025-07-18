import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJobs } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const JobDescription = () => {
  // const isApplied = true;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  // console.log('Debug values:', {
  //   singleJob,
  //   applications: singleJob?.applications,
  //   userId: user?._id,
  //   user
  // });
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  console.log("isApplied", isApplied);

  const params = useParams();
  const dispatch = useDispatch();

  console.log("params", params);
  const jobId = params.id;

  //   useGetSingleJobs(jobId);
  // console.log("singleJob", singleJob);

  const applyJobHandler = async () => {
    // alert("jbyvg");
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log("res.data", res.data);

      if (res.data.success) {
        setIsApplied(true); 
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJobs(updateSingleJob)); 
        toast.success(res.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("res", res.data.job);

        if (res.data.success) {
          dispatch(setSingleJobs(res.data.job));
          setIsApplied(res.data.job.application.some(application => application.applicant === user?._id))//Ensure the stater is in s
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <section className="max-w-7xl mx-auto my-8 px-2 sm:px-4 bg-card text-theme rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-bold text-lg sm:text-xl text-heading-primary">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge className={"text-heading-primary font-bold text-xs sm:text-sm"} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-heading-secondary font-bold text-xs sm:text-sm"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-theme font-bold text-xs sm:text-sm"} variant="ghost">
              {singleJob?.location}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg w-full md:w-auto btn-theme ${isApplied ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-4 text-base sm:text-lg text-heading-primary">
        Job Description
      </h1>
      <div className="my-4 space-y-2">
        <h1 className="font-bold my-1 text-sm sm:text-base">
          Role:
          <span className="pl-2 font-normal text-theme">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-sm sm:text-base">
          Location:
          <span className="pl-2 font-normal text-theme">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1 text-sm sm:text-base">
          Description:
          <span className="pl-2 font-normal text-theme">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-sm sm:text-base">
          Experience:
          <span className="pl-2 font-normal text-theme">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1 text-sm sm:text-base">
          Salary:
          <span className="pl-2 font-normal text-theme">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 text-sm sm:text-base">
          Total Applicants:
          <span className="pl-2 font-normal text-theme">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-sm sm:text-base">
          Posted Date:
          <span className="pl-2 font-normal text-theme">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default JobDescription;
