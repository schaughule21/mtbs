import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./login.scss";
import { getUserToken } from "./loginCrud";

const UserLogin = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    await getUserToken(data);
    var status = JSON.parse(localStorage.getItem("loginStatus"));
    if (status.signedIn) {
      history.push("/Home");
    }
  };

  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      <div style={isDesktop ? { display: "flex" } : {}}>
        {isDesktop ? (
          <img
            src="https://www.3an.org/wp-content/uploads/Learn-To-Make-An-Online-Movie-Ticket-Booking-Online.jpg"
            alt="Movie theatre image"
            width="50%"
          />
        ) : null}
        <div className="login-main" style={isDesktop ? { width: "50%" } : {}}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="box">
              <h1 style={{ color: "#FFDF6C", backgroundColor: "transparent" }}>
                LOGIN
              </h1>
              <form onSubmit={handleSubmit}>
                <div class="floating-label-group">
                  <input
                    type="text"
                    id="username"
                    class="form-control"
                    autocomplete="off"
                    autofocus
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label class="floating-label">Email</label>
                </div>

                <div class="floating-label-group">
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    autocomplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label class="floating-label">Password</label>
                </div>
                <button>LOGIN</button>
              </form>
            </div>
            <div
              style={{
                display: "inline-flex",
                marginTop: "15px",
                justifyContent: "right",
                maxWidth: "100%",
              }}
            >
              <span style={{ marginRight: "10px" }}>
                Don't have an account?
              </span>
              <a href="#">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
