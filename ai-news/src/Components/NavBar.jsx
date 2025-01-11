import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);
  // Handle Signin button click
  const handleSignIn = () => {
    navigate("/signin");
  };
  const handleSignOut = async () => {
    try {
      // Send API request to backend for authentication
      const response = await fetch("http://localhost:3000/signout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(logout());
      } else {
        // Handle error response
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full">
      <div className="w-full px-4">
        <div className="relative flex h-16 items-center">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              {/* Conditionally render user info or Signin button */}
              {user ? (
                <div className="text-white flex items-center space-x-4">
                  <span className="text-sm">Welcome, {user.name}</span>
                  <button
                    className="border border-blue-700 text-white p-1 rounded-md"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="border border-blue-700 text-white p-1 rounded-md"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
