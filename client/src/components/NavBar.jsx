import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    }
    return (
        <nav>
            <div className="nav-wrapper cyan darken-3">
                <a href="/" className="brand-logo right">MY MERN</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><NavLink to="/create">создать</NavLink></li>
                    <li><NavLink to="/links">ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}