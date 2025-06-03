import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";

const skills = ["HTml", "CSS", "Javascript", "React js"];
const isResume = true;

const Profile = () => {
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
            <h1 className="font-medium text-xl">Full Name</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              omnis culpa deserunt ducimus, qui neque nostrum voluptas officia
              corrupti ex quisquam vel voluptatum, nulla quidem expedita ut
              saepe rem adipisci.
            </p>
          </div>
        </div>
        <Button className="text-right" variant="outline">
          <Pen />
        </Button>
      </div>
      <div>
        <div>
          <Mail />
          <span>patel@gmail.com</span>
        </div>
        <div>
          <Contact />
          <span>7665565445434</span>
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
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
    </div>
  );
};

export default Profile;
