import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";


const JobSearchBar = ({filters, setFilters, onSearch}) => {

  return (
    <div className="bg-card p-4 rounded-xl shadow mb-6">
      <div className="flex flex-1/2 gap-7 mb-4">
        <Input
          type="text"
          value={filters?.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          placeholder="Search by Job Title"
          className="text-theme"
        />
        <Input
          type="text"
          value={filters?.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          placeholder="Search by Location"
          className="text-theme"
        />
        <Button onClick={onSearch} className="btn-theme">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>{" "}
      </div>
    </div>
  );
};

export default JobSearchBar;
