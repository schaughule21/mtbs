import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [signedIn, setSignedIn] = useState(false);

  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      {isDesktop ? (
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
                <a href="#view-history">View History</a>
              </li>
              <li>
                <a href="/my-profile">Edit Profile</a>
              </li>
            </ul>
          </div>
          <Link
            to={"/"}
            className="logout"
            onClick={() => localStorage.clear()}
          >
            Logout
          </Link>
        </div>
      ) : (
        <>
          <div
            class="sidenav"
            style={openNav ? { width: "30%" } : { width: 0 }}
          >
            <a
              href="javascript:void(0)"
              class="closebtn"
              onClick={() => setOpenNav(false)}
            >
              &times;
            </a>
            <div style={{ height: "80%", backgroundColor: "transparent" }}>
              <a class="active" href="#home">
                Home
              </a>
              <a href="#view-history">View History</a>
              <Link to={"/my-profile"}>View Profile</Link>
            </div>
            <Link
              to={"/"}
              className="logout"
              onClick={() => localStorage.clear()}
            >
              Logout
            </Link>
          </div>

          <div style={{ width: "100%", display: "flex" }}>
            <h4
              className="logo"
              style={{ width: "100%", justifyContent: "center" }}
            >
              BookYourTicket
            </h4>
            <div style={{ marginLeft: "auto" }}>
              <span
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  float: "right",
                  marginRight: "15px",
                }}
                onClick={() => setOpenNav(true)}
              >
                &#9776;
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
