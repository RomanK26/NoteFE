import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setPassword,
  setUsername,
  login,
  setAuthenticated,
  showPassword,
} from "../slices/authSlice";
import { useEffect } from "react";
import { Eye, EyeOff, Lock, StickyNote, User } from "lucide-react";

const Login = () => {
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const pass = useSelector((state) => state.auth.pass);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));

    if (login.fulfilled.match(result)) {
      dispatch(setAuthenticated(true));
      toast.success("Logged in!");

      navigate("/", { replace: true });
    } else {
      toast.error(result.payload || "Login failed");
    }
  };
  return (
    <div className="relative flex h-svh items-center justify-between overflow-hidden">
      <div className="absolute -top-10 -left-5 h-[208px] w-[200px] rounded-full bg-amber-500"></div>
      <div className="absolute -top-10 -right-10 h-[120px] w-[100px] -rotate-45 rounded-full border border-amber-500 lg:h-57 lg:w-40"></div>
      <div className="mt-3 mb-4 hidden w-full flex-col items-center justify-center md:flex">
        <div>
          <StickyNote className="mx-3 inline h-10 w-10 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 p-2 text-white shadow-lg" />
          <h1 className="mb-2 inline w-full text-center text-sm font-bold text-gray-800">
            Memorizz
          </h1>
        </div>
        <h1 className="text-4xl/loose tracking-wider">Capture Every Thought</h1>
      </div>
      <div className="w-full">
        <div className="mb-8 text-center">
          <h2 className="text-center text-xl font-medium tracking-wider text-amber-500">
            Login to access your notes!
          </h2>
        </div>
        <form
          className="mx-auto w-full max-w-sm rounded-2xl border p-5 drop-shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Username
            </label>
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
          <div className="mb-5">
            <div className="flex items-center justify-between">
              {/* Left: Remember me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded-sm border border-gray-300 bg-gray-200 focus:ring-blue-300 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Remember me
                </label>
              </div>

              {/* Right: Forgot Password */}
              <NavLink
                to="/forgot"
                className="text-sm text-gray-400 underline hover:cursor-pointer"
              >
                Forgot Password?
              </NavLink>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="hover:cursor w-full rounded-lg bg-amber-400 px-5 py-2.5 text-center text-sm font-medium tracking-wider hover:border-black focus:ring-1 focus:ring-blue-300 focus:outline-none sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
        <Link
          className="mt-5 block self-center justify-self-center text-gray-400 sm:text-xs lg:text-sm"
          to={"/register"}
        >
          Don't have an account?{" "}
          <span className="text-orange-300 underline">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
