import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle Signin button click
  const handleSignIn = () => {
    navigate("/signin");
  };

  // Handle Signout button click
  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/signout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(logout());
        setDropdownOpen(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4">
        <div className="relative flex h-16 items-center justify-between">
          {/* Centered Title */}
          <p className="text-white text-center flex-1">Your Daily News</p>

          {/* Sign In or User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative text-white flex items-center space-x-4">
                {/* User Icon with Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full focus:outline-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        "https://as1.ftcdn.net/jpg/05/17/79/88/1000_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
                      }
                      alt="User"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm text-gray-700">
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <hr className="border-t" />
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View Profile
                        </Link>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleSignOut}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
