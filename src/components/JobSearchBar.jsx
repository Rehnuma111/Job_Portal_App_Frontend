import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";


const JobSearchBar = ({filters, setFilters, onSearch}) => {

  return (
    <div>
      <div className="flex flex-1/2 gap-7 mb-12">
        <Input
          type="text"
          value={filters?.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          placeholder="Search by Job Title"
        />
        <Input
          type="text"
          value={filters?.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          placeholder="Search by Location"
        />
        <Button onClick={onSearch}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>{" "}
      </div>
    </div>
  );
};

export default JobSearchBar;
