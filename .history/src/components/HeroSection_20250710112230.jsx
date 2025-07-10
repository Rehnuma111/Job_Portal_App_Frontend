import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchJobhandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <section className="text-center px-2 sm:px-4">
      <div className="flex flex-col gap-5 my-8 sm:my-12 md:my-16">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br className="hidden sm:block" /> Get Your
          <span className="text-[#6A38C2]"> Dream Jobs</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">Find your dream job now</p>
        <div className="flex w-full max-w-md sm:max-w-lg md:max-w-2xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full py-2 px-2 text-sm sm:text-base bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobhandler}
            className="rounded-r-full bg-[#6A38C2] px-4 py-2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
