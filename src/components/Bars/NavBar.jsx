import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../images/logo.png"
import { AuthContext } from "../../context/auth.context";

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div class="flex h-12 items-center justify-between p-4 bg-blue text-white shadow-md">
            <div class="flex items-center">
                <NavLink to="/" class="flex items-center space-x-2">
                    <img src={logo} alt="OutInPortugalLogo" class="h-12 w-auto" />
                </NavLink>

                <NavLink to="/" class="flex items-center space-x-2">
                    <h3 class="text-lg font-semibold">OutInPortugal</h3>
                </NavLink>
            </div>

            <div class="flex space-x-6">
                <NavLink to="/about-page">
                    About
                </NavLink>
                <NavLink to="/api/activities">
                    Activities
                </NavLink>
                <NavLink to="/api/events">
                    Events
                </NavLink>
                <NavLink to="/api/events/create">
                    Create Event
                </NavLink>
            </div>

            <div className="flex items-center space-x-4">
                {!isLoggedIn && (
                    <>
                        <NavLink to="/auth/login">
                            Log In
                        </NavLink>
                        <NavLink to="/auth/signup">
                            Sign Up
                        </NavLink>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link to="/api/events">
                            <button class="hover:bg-blue-hover p-2 rounded">
                                {user.name}
                            </button>
                        </Link>

                        <button
                            onClick={logOutUser}
                            class="hover:bg-blue-hover p-2 rounded"
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