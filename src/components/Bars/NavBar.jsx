import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../images/logo.png"
import { AuthContext } from "../../context/auth.context";

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div class="flex h-12 items-center justify-between p-4 bg-gray-dark text-white shadow-md">
            <div class="flex items-center">
                <NavLink to="/" class="flex items-center space-x-2">
                    <img src={logo} alt="OutInPortugalLogo" class="h-8 w-auto" />
                </NavLink>

                <NavLink to="/" class="flex items-center space-x-2">
                    <h3 class="text-lg font-semibold">OutInPortugal</h3>
                </NavLink>
            </div>

            <div class="flex space-x-6">
                <NavLink to="/about-page" class="nav-link">
                    About
                </NavLink>
                <NavLink to="/api/activities" class="nav-link">
                    Activities
                </NavLink>
                <NavLink to="/api/events" class="nav-link">
                    Events
                </NavLink>
                <NavLink to="/api/events/create" class="nav-link">
                    Create Event
                </NavLink>
            </div>

            <div className="flex items-center space-x-4">
                {!isLoggedIn && (
                    <>
                        <NavLink to="/auth/login" class="nav-link">
                            Log In
                        </NavLink>
                        <NavLink to="/auth/signup" class="nav-link">
                            Sign Up
                        </NavLink>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link to="/api/events">
                            <button class="bg-blue-600 hover:bg-blue-500 p-2 rounded">
                                {user.name}
                            </button>
                        </Link>

                        <button
                            onClick={logOutUser}
                            class="bg-blue-600 hover:bg-blue-500 p-2 rounded"
                        >
                            Log Out
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}


export default NavBar;