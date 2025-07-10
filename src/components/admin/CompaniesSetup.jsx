import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { Avatar, AvatarImage } from "../ui/avatar";
import { setLoading } from "@/redux/authSlice";

const CompaniesSetup = () => {
  const params = useParams();
  const location = useLocation();

  console.log("fewfew", location.state);

  const { companies } = useSelector((store) => store.company);
  console.log("companies", companies);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(location.state?.logo || "");

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    if (file) {
    setPreview(URL.createObjectURL(file));
  }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    setInput({
      name: singleCompany?.name || location?.state?.name || "",
      description:
        singleCompany?.description || location?.state?.description || "",
      website: singleCompany?.website || location?.state?.website || "",
      location: singleCompany?.location || location?.state?.location || "",
      file: singleCompany?.file || location?.state?.file || null,
    });
  }, [singleCompany]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e3e0ff] flex flex-col font-sans">
      <Navbar />
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center p-2 md:p-8">
        <form onSubmit={submitHandler} className="bg-white/95 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-100 mt-10 mb-8 font-sans">
          <div className="flex items-center gap-5 mb-8">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-[#4B2996] font-semibold rounded-xl border-gray-300 hover:bg-[#ede9fe] hover:text-[#2d1a4d] font-sans"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-extrabold text-2xl md:text-3xl text-[#4B2996] drop-shadow-lg font-sans">Company Setup</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
              />
            </div>
            <div>
              <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
              />
            </div>
            <div>
              <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
              />
            </div>
            <div>
              <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-6 mt-4">
              <div className="flex-1">
                <Label className="font-semibold mb-1 block text-[#4B2996] font-sans">Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4B2996]/30 shadow-sm bg-[#f6f4fd] text-[#2d1a4d] placeholder:text-[#b3a6d9] font-sans"
                />
              </div>
              <Avatar style={{ width: "80px", height: "80px" }}>
                <AvatarImage src={preview} />
              </Avatar>
            </div>
          </div>
          <Button type="submit" className="w-full my-8 bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white rounded-xl shadow-md hover:from-[#4B2996] hover:to-[#c72a00] font-semibold px-6 py-2 border-0 font-sans">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompaniesSetup;
