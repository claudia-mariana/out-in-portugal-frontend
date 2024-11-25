import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../images/logo.png"
import { AuthContext } from "../../context/auth.context";

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div className="navbar">
                <img src={logo} className="logo" alt="OutinPortugal Logo" />
                <h3>OutInPortugal</h3>
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
                <NavLink to="/api/events/create">
                    Create Event
                </NavLink>

                <NavLink to="/auth/login">
                    Login
                </NavLink>

                <NavLink to="/auth/signup">
                    Sign Up
                </NavLink>

                {isLoggedIn && (
                    <>
                    {/* no futuro é suposto ser um link para os eventos que são criados pelo do user, ou para o user profile*/}
                        <Link to="/api/events">
                            <button>{user.name}'s Events</button>
                        </Link>

                        <button onClick={logOutUser}>Logout</button>
                    </>
                )}

        </div>
    )
}


export default NavBar;