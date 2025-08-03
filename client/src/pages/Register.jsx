import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { showPassword } from "../slices/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pass = useSelector((state) => state.auth.pass);

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        },
      );

      localStorage.setItem("authToken", res.data.token);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/api/register/", { username, password });

      if (res.status === 201) {
        toast("User registered successfully", {
          position: "bottom-right",
          duration: 2500,
          style: {
            color: "#006400",
          },
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.status === 400) {
        toast("User with username already exists", {
          duration: 2500,
          position: "center",
          style: {
            height: "2rem",
            color: "#ef476f",
            padding: "1rem",
          },
        });
      }
    }
  };

  return (
    <div className="relative flex h-svh items-center justify-center overflow-hidden">
      <div className="absolute -top-10 -left-5 h-28 w-28 rounded-full bg-amber-500 lg:h-[208px] lg:w-[200px]"></div>
      <div className="absolute -top-10 -right-10 h-[120px] w-[100px] -rotate-45 rounded-full border border-amber-500 lg:h-57 lg:w-40"></div>

      <div className="w-full">
        <h2 className="mb-2 text-center text-3xl font-bold">Register</h2>
        <form
          className="mx-auto w-full max-w-sm rounded-2xl border p-5"
          onSubmit={handleSubmit}
        >
          {/* <div className="my-3 flex w-full flex-col items-center justify-between">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              className="mt-4 mb-8"
            />
            <p className="text-gray-400">or</p>
          </div> */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            {/* <input
              type="test"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="John Doe"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-amber-400" />
              </div>
              <input
                type="text"
                id="username"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="John Doe"
                required
                value={username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-amber-400" />
              </div>
              <input
                type={pass ? "text" : "password"}
                id="password"
                placeholder="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
              <button
                type="button"
                onClick={() => dispatch(showPassword(!pass))}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-400 transition-colors hover:text-amber-600"
              >
                {pass ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-5 flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded-sm border border-gray-300 bg-gray-200 focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
            >
              Remember me
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="focus:ring-white-300 w-full self-center rounded-lg bg-amber-500 px-5 py-2.5 text-center text-sm font-normal text-black drop-shadow-amber-600 hover:cursor-pointer focus:ring-1 focus:outline-none sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
        <Link
          className="mt-2 block self-center justify-self-center text-gray-400"
          to={"/login"}
        >
          Already have an account?{" "}
          <span className="text-orange-300 underline">Login</span>
        </Link>
      </div>
    </div>
  );
};
export default Register;
