import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Noida", "Mumbai", "Pune", "Goa"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div>
      <div className="w-full bg-white p-3 rounded-md">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <hr className="mt-3" />
        {filterData.map((item, index) => {
          return (
            <RadioGroup defaultValue={item.array[0]}>
              <div>
                <h1 className="text-xl font-bold mb-2">{item.filterType}</h1>
                {item.array.map((item, idx) => {
                  return (
                    <div>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value={item} id={idx} />
                        <Label>{item}</Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCard;
