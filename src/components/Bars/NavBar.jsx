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
                    Home
                </NavLink>

                <NavLink to="/about-page">
                    About
                </NavLink>

                <NavLink to="/api/activities">
                    Activities
                </NavLink>

                <NavLink to="/api/events">
                    Events
                </NavLink>
            </div>
            <div>
                <NavLink to="/api/events/create">
                    Create Event
                </NavLink>

                <NavLink to="/auth/login">
                    Login
                </NavLink>

                <NavLink to="/auth/signup">
                    Sign Up
                </NavLink>
            </div>
        </>
    )
}


export default NavBar;