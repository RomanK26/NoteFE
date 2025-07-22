import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setPassword, setUsername, login } from "../slices/authSlice";
import { setAuthor } from "../slices/NoteSlices";
// import {login } from "../slices/authSlice"

const Login = () => {
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));

    if (login.fulfilled.match(result)) {
      toast.success("Logged in!");
      dispatch(setAuthor(username));
      navigate("/",{replace:true});
    } else {
      toast.error(result.payload || "Login failed");
    }
  };
  return (
    <div className="flex h-svh items-center justify-center">
      <div className="w-full">
        <form
          className="mx-auto w-full max-w-sm rounded-2xl border p-5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-3xl font-bold">Login</h2>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="John Doe"
              required
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
            <div className="justify-self-end text-gray-400 underline hover:cursor-pointer">
              Forgot Password?
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
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <Link
          className="block self-center justify-self-center text-gray-400 sm:text-xs lg:text-sm"
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
