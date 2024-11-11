import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const onChangeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        navigate("/");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
        >
          <h1 className="font-bold text-2xl mb-6 text-gray-800 text-center">Login</h1>

          <div className="my-4">
            <Label className="text-sm font-medium text-gray-600">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={onChangeEventHandler}
              value={input.email}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative my-4">
            <Label className="text-sm font-medium text-gray-600">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={input.password}
              onChange={onChangeEventHandler}
              name="password"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 mt-7 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className="my-6">
            <RadioGroup className="flex item-enter gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={onChangeEventHandler}
                  id="r1"
                />
                <Label htmlFor="r1" className="text-sm font-medium text-gray-600">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={onChangeEventHandler}
                  id="r2"
                />
                <Label htmlFor="r2" className="text-sm font-medium text-gray-600">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full py-3 my-4 bg-blue-500 text-white rounded-md flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-3 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </Button>
          )}

          <span className="text-center block mt-4 text-gray-600">
            Don't Have an Account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </span>
          <span className="text-center block mt-4 text-gray-600">
            Login as Admin <Link to="/owner/login" className="text-blue-500 hover:underline">Sign In</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
