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
        <div className="relative flex h-16 items-center justify-between">
          {/* Centered Title */}
          <p className="text-white text-center flex-1">Your Daily News</p>

          {/* Sign In or User Section */}
          <div className="flex items-center space-x-4">
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
    </nav>
  );
};

export default NavBar;
