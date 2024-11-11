import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }

  return (
    <div className="text-center py-16 ">
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {/* <span className="mx-auto px-4 py-2 rounded-full bg-[#FFF1F0] text-[#F83002] font-medium">
          Your No. 1 Job Hunting Platform
        </span> */}

        <h1 className="text-4xl font-bold leading-tight mt-10">
          Find, Apply & Land Your <br />{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p className="text-lg text-gray-600">
          Discover thousands of job opportunities that match your skills and
          ambitions. Take the next step in your career with ease.
        </p>

        <div className="flex w-full max-w-lg shadow-lg border border-gray-200 rounded-full items-center mx-auto">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jobs"
            className="outline-none border-none w-full pl-4 py-2 rounded-l-full text-gray-700"
          />
          <Button className="rounded-r-full bg-[#6A38C2] text-white px-6 py-2 flex items-center">
            <Search className="h-5 w-5 mr-2"  onClick={searchJobHandler}/>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
