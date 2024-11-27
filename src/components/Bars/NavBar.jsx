import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../images/logo.png"
import { AuthContext } from "../../context/auth.context";

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div className="flex h-12 items-center justify-between p-4 bg-blue text-white shadow-md">
            <div className="flex items-center hover:text-yellow ">
                <NavLink to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="OutInPortugalLogo" className="h-12 w-auto" />
                </NavLink>

                <NavLink to="/" className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">OutInPortugal</h3>
                </NavLink>
            </div>

            <div className="flex space-x-6">
                <NavLink className=" hover:text-yellow" to="/">
                    Home
                </NavLink>
                <NavLink className=" hover:text-yellow" to="/about-page">
                    About
                </NavLink>
                <NavLink className=" hover:text-yellow" to="/api/activities">
                    Activities
                </NavLink>
                <NavLink className=" hover:text-yellow" to="/api/events">
                    Events
                </NavLink>
                <NavLink className=" hover:text-yellow" to="/api/events/create">
                    Create Event
                </NavLink>
            </div>

            <div className="flex items-center space-x-4">
                {!isLoggedIn && (
                    <>
                        <NavLink className=" hover:text-yellow" to="/auth/login">
                            Log In
                        </NavLink>
                        <NavLink className=" hover:text-yellow" to="/auth/signup">
                            Sign Up
                        </NavLink>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link to="/api/events">
                            <button className="hover:bg-blue-medium p-2 rounded">
                                {user.name}
                            </button>
                        </Link>

                        <button
                            onClick={logOutUser}
                            className="hover:bg-blue-medium p-2 rounded"
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