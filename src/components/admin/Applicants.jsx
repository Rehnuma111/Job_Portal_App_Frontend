import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { setApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Applicants = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { applicants } = useSelector((store) => store.application);
  console.log("Applicants Data:", applicants);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        dispatch(setApplicants(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e3e0ff] flex flex-col font-sans">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col p-2 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 mt-4">
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#4B2996] drop-shadow-lg tracking-tight font-sans">
            Applicants{' '}
            <span className="text-[#F83002] font-sans">
              {applicants?.applications?.length || 0}
            </span>
          </h1>
        </div>
        <div className="bg-white/95 rounded-2xl shadow-2xl p-2 md:p-8 border border-gray-100 overflow-x-auto transition-all duration-300 font-sans">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
