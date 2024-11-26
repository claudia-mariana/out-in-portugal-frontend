import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../images/logo.png"
import { AuthContext } from "../../context/auth.context";

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="left">
                <NavLink to="/">
                    <img src={logo} className="logo" alt="OutInPortugalLogo" />
                </NavLink>                
                
                <NavLink to="/">
                    <h3>OutInPortugal</h3>
                </NavLink>
            </div>

            <div className="center">
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

            <div className="right">
                <NavLink to="/auth/login">
                    Log In
                </NavLink>

                <NavLink to="/auth/signup">
                    Sign Up
                </NavLink>

                {isLoggedIn && (
                    <>
                    {/* no futuro é suposto ser um link para os eventos que são criados pelo do user, ou para o user profile*/}
                        <Link to="/api/events">
                            <button>{user.name}</button>
                        </Link>

                        <button onClick={logOutUser}>Log Out</button>
                    </>
                )}
            </div>
        </div>
    )
}


export default NavBar;