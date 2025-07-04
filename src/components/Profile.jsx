import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const skills = ["HTml", "CSS", "Javascript", "React js"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              alt="profile"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user?.fullName}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              omnis culpa deserunt ducimus, qui neque nostrum voluptas officia
              corrupti ex quisquam vel voluptatum, nulla quidem expedita ut
              saepe rem adipisci.
            </p>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="text-right"
          variant="outline"
        >
          <Pen />
        </Button>
      </div>
      <div className="flex items-center justify-between my-5">
        <div>
          <Mail />
          <span>{user?.email}</span>
        </div>
        <div>
          <Contact />
          <span>{user?.phoneNumber}</span>
        </div>
      </div>
      <div>
        <h1>Skills</h1>
        {skills.length !== 0 ? (
          skills.map((item, index) => <Badge key={index}>{item}</Badge>)
        ) : (
          <span>NA</span>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label className="text-md font-bold">Resume</Label>
        {isResume ? (
          <a
            target="blank"
            href=""
            className="text-blue-500 w-full hover:underline cursor-pointer"
          >
            Resume
          </a>
        ) : (
          <span>NA</span>
        )}
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Applied Job Table   */}
        <AppliedJobTable />
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
      </div>
    </div>
  );
};

export default Profile;
