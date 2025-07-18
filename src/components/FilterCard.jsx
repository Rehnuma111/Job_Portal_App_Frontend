// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import React from "react";
// import { Label } from "./ui/label";
// import { motion } from "framer-motion";

// const FilterCard = ({ filterData, setFilters }) => {
  
//   console.log("FilterCard filters:", filterData);

//   return (
//     <div>
//       <div className="w-full bg-white p-3 rounded-md">
//         <h1 className="font-bold text-lg">Filter Jobs</h1>
//         <hr className="mt-3" />

//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -100 }}
//           transition={{ duration: 0.3 }}
//         >
//           {filterData.map((filter, index) => {
//             console.log(`Rendering filter: ${filter.filterType}`);

//             return (
//               <div key={index} className="my-4">
//                 <Label className="font-semibold text-gray-700">
//                   {filter.label}
//                 </Label>

//                 <RadioGroup
//                   className="flex flex-col gap-2 mt-2"
//                   value={filterData?.[filter.filterType] || ""}
//                   onValueChange={(value) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       [filter.filterType]: value,
//                     }))
//                   }
//                 >
//                   {filter.array.map((option, idx) => (
//                     <div key={idx} className="flex items-center space-x-2">
//                       <RadioGroupItem
//                         value={option.toString()}
//                         id={`${filter.filterType}-${idx}`}
//                       />
//                       <Label htmlFor={`${filter.filterType}-${idx}`}>
//                         {typeof option === "number"
//                           ? ` ${option.toLocaleString()}`
//                           : option}
//                       </Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default FilterCard;
import React from "react";
import { Label } from "./ui/label";
import { motion } from "framer-motion";

const FilterCard = ({ filterData, setFilters, filters }) => {
  return (
    <div>
      <div className="w-full bg-card p-3 rounded-md shadow text-theme">
        <h1 className="font-bold text-lg text-heading-primary">Filter Jobs</h1>
        <hr className="mt-3 border-gray-300" />

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          {filterData.map((filter, index) => (
            <div key={index} className="my-4">
              <Label className="font-semibold text-theme block mb-2">
                {filter.label}
              </Label>

              <select
                className="w-full border border-gray-300 p-2 rounded-md bg-card text-theme"
                value={filters?.[filter.filterType] || ""}
                onChange={(e) => {
                  let value = e.target.value;

                  // Clean value if experienceLevel (e.g., "2+ years" -> "2")
                  if (filter.filterType === "experienceLevel") {
                    value = value.replace("+ years", "");
                  }

                  setFilters((prev) => ({
                    ...prev,
                    [filter.filterType]: value,
                  }));
                }}
              >
                <option value="">Select {filter.label}</option>
                {filter.array.map((option, idx) => (
                  <option key={idx} value={option} className="text-theme bg-card">
                    {typeof option === "number"
                      ? `₹ ${option.toLocaleString()}`
                      : option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FilterCard;
