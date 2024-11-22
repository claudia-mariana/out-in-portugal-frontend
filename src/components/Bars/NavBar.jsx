import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png"

function NavBar() {
    return (
        <>
            <div>
                <img src={logo} className="logo" alt="OutinPortugal Logo" />
                <h3>OutInPortugal</h3>
            </div>
            <div>
                <NavLink to="/">
                    <a>Home</a>
                </NavLink>

                <NavLink to="/about-page">
                    <a>About</a>
                </NavLink>

                <NavLink to="/api/activities">
                    <a>Activities</a>
                </NavLink>

                <NavLink to="/api/events">
                    <a>Events</a>
                </NavLink>
            </div>
            <div>
                <NavLink to="/api/events/create">
                    <a>Create Event</a>
                </NavLink>

                <NavLink to="/auth/login">
                    <a>Login</a>
                </NavLink>

                <NavLink to="/auth/signup">
                    <a>Sign Up</a>
                </NavLink>
            </div>
        </>
    )
}


export default NavBar;