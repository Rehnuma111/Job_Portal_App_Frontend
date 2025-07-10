import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${COMPANY_API_ENDPOINT}/delete/${id}`);
      setFilterCompany((prev) => prev.filter((company) => company._id !== id));
      toast.success("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto font-sans">
      <div className="bg-white/95 rounded-2xl shadow-2xl border border-gray-100 p-2 md:p-8">
        <Table className="min-w-full font-sans">
          <TableCaption className="text-[#4B2996] font-semibold mb-2 font-sans">
            A list of your recent companies.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-[#ede9fe] to-[#f6f4fd]">
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 pl-4 font-sans">
                Logo
              </TableHead>
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">
                Name
              </TableHead>
              <TableHead className="text-[#4B2996] font-bold text-base tracking-wide py-4 font-sans">
                Date
              </TableHead>
              <TableHead className="text-right text-[#4B2996] font-bold text-base tracking-wide py-4 pr-4 font-sans">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany?.map((company) => (
              <tr
                key={company?._id}
                className="group border-b last:border-b-0 border-gray-100 hover:bg-[#f6f4fd] transition-colors text-[#2d1a4d] font-medium align-middle font-sans"
              >
                <TableCell className="py-3 pl-4">
                  <Avatar style={{ width: 48, height: 48 }}>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-[#2d1a4d] font-semibold text-base font-sans">
                  {company.name}
                </TableCell>
                <TableCell className="text-[#6A38C2] text-base font-sans">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-[#4B2996] group-hover:text-[#6A38C2] transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-44 bg-white border border-gray-200 rounded-xl shadow-lg font-sans">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`, {
                            state: company,
                          })
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer hover:text-[#6A38C2] text-base font-sans"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => handleDelete(company._id)}
                        className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800 mt-2 text-base font-sans"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesTable;
