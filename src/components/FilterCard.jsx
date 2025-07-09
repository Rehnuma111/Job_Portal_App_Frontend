import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "./ui/label";
import { motion } from "framer-motion";

const FilterCard = ({ filterData, filters, setFilters }) => {
  return (
    <div>
      <div className="w-full bg-white p-3 rounded-md">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <hr className="mt-3" />

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          {filterData.map((filter, index) => (
            <div key={index} className="my-4">
              <Label className="font-semibold text-gray-700">
                {filter.filterType}
              </Label>

              <RadioGroup
                className="flex flex-col gap-2 mt-2"
                value={filters[filter.filterType] || ""}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    [filter.filterType]: value,
                  }))
                }
              >
                {filter.array.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.toString()}
                      id={`${filter.filterType}-${idx}`}
                    />
                    <Label htmlFor={`${filter.filterType}-${idx}`}>
                      {typeof option === "number"
                        ? `₹ ${option.toLocaleString()}`
                        : option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FilterCard;
