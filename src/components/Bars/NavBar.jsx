import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { AuthContext } from "../../context/auth.context";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-blue text-white shadow-md">
      <div className="flex items-center justify-between p-2 md:text-xl">
        {/* Logo and App Name */}
        <div className="flex items-center hover:text-yellow">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="OutInPortugalLogo" className="h-12 w-auto" />
            <h3 className="text-lg font-semibold">OutInPortugal</h3>
          </NavLink>
        </div>

        {/* Burger Button (visible on small screens) */}
        <div className="md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>

        {/* Nav Links and User Actions combined for small screens */}
        <div className={`md:flex md:justify-center md:items-center md:space-x-6 ${menuOpen ? "absolute top-16 inset-x-0 bg-blue flex flex-col items-center" : "hidden"} md:static md:flex-row`}>
          <NavLink className="hover:text-yellow px-3" to="/api/activities">
            Activities
          </NavLink>
          <NavLink className="hover:text-yellow px-3" to="/api/events">
            Events
          </NavLink>
          <NavLink className="hover:text-yellow px-3" to="/api/events/create">
            Create Event
          </NavLink>
          <NavLink className="hover:text-yellow px-3" to="/about-page">
            About
          </NavLink>

          {/* User Actions inside collapsible menu for small screens */}
          <div className="flex flex-col items-center space-y-2 mt-4 md:mt-0 md:flex-row md:space-x-4 md:space-y-0">
            {!isLoggedIn ? (
              <>
                <NavLink className="hover:text-yellow" to="/auth/login">
                  Log In
                </NavLink>
                <NavLink
                  className="bg-blue-medium text-white px-4 py-2 rounded-md hover:text-yellow transition-colors"
                  to="/auth/signup"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <Link to="/api/events">
                  <button className="hover:text-yellow p-2 rounded">
                    {user.name}
                  </button>
                </Link>
                <button
                  onClick={logOutUser}
                  className="bg-blue-medium text-white px-4 py-2 rounded-md hover:text-yellow transition-colors"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;