import React from "react";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
        <Link className="navbar-brand js-scroll-trigger" to="/">
          <img alt="logo" className="logo" src={logo} />
        </Link>

        <ul className="navbar-nav text-uppercase ml-auto">
          <li className="nav-item">
            <Link className="nav-link js-scroll-trigger" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
