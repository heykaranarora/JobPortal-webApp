import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${USER_API_END_POINT}/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(null)); // Clear user from state
        toast.success(data.message);
        navigate("/");
      } else {
        throw new Error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const truncateBio = (bio, length) => {
    if (!bio) return "";
    return bio.length > length ? `${bio.substring(0, length)}...` : bio;
  };

  return (
    <nav className="bg-white shadow-md py-5">
      <div className="flex justify-between items-center mx-auto max-w-7xl px-4">
        <div>
          <h1 className="text-3xl font-bold text-[#6A38C2]">
            Jobbers
            {/* <span className="text-[#F83002]">Portal</span> */}
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-lg text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#6A38C2] transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#6A38C2] transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2] transition">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#6A38C2] transition"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#6A38C2] text-[#6A38C2]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] text-white">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* <Button
                variant="outline"
                className="border-[#6A38C2] text-[#6A38C2]"
              >
                Dashboard
              </Button>
              <Button className="bg-[#6A38C2] text-white">Post Job</Button> */}
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="p-4 bg-white border border-gray-200 shadow-lg z-50 rounded-xl mt-2 w-64">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>
                        {user?.fullname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-lg">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {truncateBio(user?.profile?.bio, 30)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    {user && user.role == "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 text-sm text-[#6A38C2] hover:underline"
                      >
                        <User2 className="h-4 w-4" />
                        View Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 text-sm text-red-600 hover:underline mt-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
