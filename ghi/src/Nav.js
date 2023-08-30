import React from "react";
import { NavLink } from "react-router-dom";
import './App.css'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand link" to="/">SCRUMDIDDLY</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                className="nav-link link dropdown-toggle"
                to="#"
                id="pantryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pantry
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="pantryDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/pantry">
                    Pantry Item
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                className="nav-link link dropdown-toggle"
                to="#"
                id="recipesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recipes
              </NavLink>
              <ul
                className="dropdown-menu" aria-labelledby="recipesDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/recipes">
                    List Recipes
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <button className="button" type="button">Sign In</button> &nbsp;&nbsp;
          <button className="button" type="button">Sign Out</button> &nbsp;&nbsp;
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search"></input>
          </form>
          <button className="button" type="submit">Search Recipe!</button>
        </div>
      </div>
     </nav>
  );
}

export default Nav;
