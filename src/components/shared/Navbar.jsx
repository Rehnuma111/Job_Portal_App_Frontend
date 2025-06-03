import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, LogOutIcon, User2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const user = true;
  const { user } = useSelector(store=>store.auth);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-3xl font-bold text-center">
            Job <span>Portal</span>
          </h1>
        </div>
        <div>
          <ul className="flex font-semibold items-center gap-4">
            <li>
              {" "}
              <Link to="/home">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              {" "}
              <Link to="/browse">Browse</Link>
            </li>

            {!user ? (
              <div className="flex gap-2 ml-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-70">
                  <div className="flex gap-4 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Rehnuma Bano MernStack</h4>
                      <p className="text-sm text-muted-background">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                  <div className="flex w-fit items-center gap-2 curson-pointer">
                    <User2 />
                    <Button variant="link"><Link to ="/profile">View Profile</Link></Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 curson-pointer">
                    <LogOutIcon />
                    <Button variant="link">Logout</Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
