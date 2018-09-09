import React from "react";
import { NavLink } from "react-router-dom";
import "../css/index.css";

const NavBar = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink className="nav-link" to="/cats">
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/dogs">
            Dogs
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/computers">
            Computers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
