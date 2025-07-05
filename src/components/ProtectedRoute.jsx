import React, { Children, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ childern }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  console.log("user in protected route", user);
  useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate("/");
        }
    },[]);

  return <>{childern}</>;
};

export default ProtectedRoute;
