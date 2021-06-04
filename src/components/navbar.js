import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const navbar = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h4 className="logo">BookYourTicket</h4>
        <div className="navbar-main">
          <ul>
            <li>
              <a class="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#news">News</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </div>
        <Link to={"/"} onClick={() => localStorage.clear()}>
          Logout
        </Link>
      </div>
    </>
  );
};

export default navbar;
