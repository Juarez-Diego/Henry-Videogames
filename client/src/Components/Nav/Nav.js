import React from "react";
import { Link } from "react-router-dom";
import "../Nav/Nav.css";

export function Nav(){
    return (
        <div>
            <nav className="nav">
                <Link to="/home" className="navLink">Home</Link>
                <Link to="/videogame" className="navLink">Create Videogame</Link>
            </nav>
        </div>
    )
};

export default Nav;