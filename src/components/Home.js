import React, { useEffect } from "react";
import "./home.scss";
import { getUser } from "./login/loginCrud";

const Home = () => {
  useEffect(() => {
    var status = JSON.parse(localStorage.getItem("loginStatus"));
    let userData = getUser();
    console.log(`userData`, userData);
  }, []);
  return (
    <>
      <div className="main">Navbar</div>
    </>
  );
};

export default Home;
