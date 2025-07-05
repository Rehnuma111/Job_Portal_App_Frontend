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
  console.log("Applicants Data:", applicants  );

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);

        dispatch(setApplicants(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
          <ApplicantsTable />
        </h1>
      </div>
    </div>
  );
};

export default Applicants;
