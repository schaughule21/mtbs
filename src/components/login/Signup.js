import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./login.scss";
import { addUser } from "./loginCrud";

const Signup = () => {
  let history = useHistory();
  const [userName, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail(email);
    validate();
    const data = {
      userName,
      email,
      contact,
      password,
      type: "user",
    };
    if (error === "") {
      console.log(`data`, data);
      await addUser(data);
      var status = JSON.parse(localStorage.getItem("loginStatus"));
      if (status?.signedIn) {
        history.push("/Home");
      }
    }
  };
  const validate = () => {
    if (password === confirmPass) {
      setError("");
    } else {
      setError("Password do not match");
    }
    if (contact.length != 10) {
      setError("Please enter valid contact");
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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
                SIGN UP
              </h1>
              <form onSubmit={handleSubmit}>
                <div class="floating-label-group">
                  <input
                    type="text"
                    id="userName"
                    class="form-control"
                    autocomplete="off"
                    autofocus
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label class="floating-label">Name</label>
                </div>

                <div class="floating-label-group">
                  <input
                    type="text"
                    id="email"
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

                <div class="floating-label-group">
                  <input
                    type="password"
                    id="confirmpassword"
                    class="form-control"
                    autocomplete="off"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                  />
                  <label class="floating-label">Confirm Password</label>
                </div>
                <div class="floating-label-group">
                  <input
                    type="number"
                    id="contact"
                    class="form-control"
                    autocomplete="off"
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  <label class="floating-label">Contact</label>
                </div>
                <div>
                  <label>{error}</label>
                </div>

                <button>SIGN UP</button>
              </form>
            </div>
            <div
              style={{
                display: "inline-flex",
                marginTop: "15px",
                justifyContent: "right",
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
